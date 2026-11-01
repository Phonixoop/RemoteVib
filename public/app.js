const MODES = ["continuous", "pulse", "wave", "heartbeat", "staccato"];

const els = {
  home: document.getElementById("view-home"),
  join: document.getElementById("view-join"),
  session: document.getElementById("view-session"),
  btnHost: document.getElementById("btn-host"),
  btnJoin: document.getElementById("btn-join"),
  joinForm: document.getElementById("join-form"),
  joinCode: document.getElementById("join-code"),
  roleLabel: document.getElementById("role-label"),
  roomLabel: document.getElementById("room-label"),
  btnLeave: document.getElementById("btn-leave"),
  statusConnection: document.getElementById("status-connection"),
  statusPeer: document.getElementById("status-peer"),
  hostPanel: document.getElementById("host-panel"),
  clientPanel: document.getElementById("client-panel"),
  intensityValue: document.getElementById("intensity-value"),
  sliderTrack: document.getElementById("slider-track"),
  sliderFill: document.getElementById("slider-fill"),
  sliderHandle: document.getElementById("slider-handle"),
  btnToggle: document.getElementById("btn-toggle"),
  btnStop: document.getElementById("btn-stop"),
  btnCopy: document.getElementById("btn-copy"),
  btnEnableVibe: document.getElementById("btn-enable-vibe"),
  vibeHint: document.getElementById("vibe-hint"),
  clientOrb: document.getElementById("client-orb"),
  clientCopy: document.getElementById("client-copy"),
  modeButtons: [...document.querySelectorAll(".mode")],
};

const state = {
  role: null,
  room: null,
  ws: null,
  intensity: 0,
  mode: "continuous",
  active: false,
  peers: { host: false, client: false },
  vibeEnabled: false,
  vibeTimer: null,
  sendTimer: null,
  dragging: false,
};

function show(view) {
  for (const node of [els.home, els.join, els.session]) {
    node.classList.toggle("hidden", node !== view);
  }
}

function setConnectionStatus(text, kind = "") {
  els.statusConnection.textContent = text;
  els.statusConnection.classList.remove("live", "warn");
  if (kind) els.statusConnection.classList.add(kind);
}

function setPeerStatus(peers) {
  state.peers = peers;
  if (state.role === "host") {
    els.statusPeer.textContent = peers.client
      ? "Client connected"
      : "Waiting for client";
    els.statusPeer.classList.toggle("live", peers.client);
    els.statusPeer.classList.toggle("warn", !peers.client);
  } else {
    els.statusPeer.textContent = peers.host
      ? "Host connected"
      : "Waiting for host";
    els.statusPeer.classList.toggle("live", peers.host);
    els.statusPeer.classList.toggle("warn", !peers.host);
  }
}

function wsUrl(room, role) {
  const proto = location.protocol === "https:" ? "wss:" : "ws:";
  return `${proto}//${location.host}/ws?room=${encodeURIComponent(room)}&role=${role}`;
}

function connect(room, role) {
  disconnect();
  state.role = role;
  state.room = room;
  state.intensity = 0;
  state.mode = "continuous";
  state.active = false;

  els.roleLabel.textContent = role === "host" ? "Host" : "Client";
  els.roomLabel.textContent = room;
  els.hostPanel.classList.toggle("hidden", role !== "host");
  els.clientPanel.classList.toggle("hidden", role !== "client");
  show(els.session);
  setConnectionStatus("Connecting…", "warn");
  setPeerStatus({ host: role === "host", client: role === "client" });
  renderControls();
  updateModeButtons();

  const ws = new WebSocket(wsUrl(room, role));
  state.ws = ws;

  ws.addEventListener("open", () => {
    setConnectionStatus("Connected", "live");
    startHeartbeat(ws);
  });

  ws.addEventListener("message", (event) => {
    if (event.data === "pong") return;
    let msg;
    try {
      msg = JSON.parse(event.data);
    } catch {
      return;
    }
    handleMessage(msg);
  });

  ws.addEventListener("close", () => {
    stopHeartbeat();
    setConnectionStatus("Disconnected", "warn");
    stopVibration();
  });

  ws.addEventListener("error", () => {
    setConnectionStatus("Connection error", "warn");
  });

  history.replaceState({}, "", `/?room=${room}&role=${role}`);
}

let heartbeatId = null;
function startHeartbeat(ws) {
  stopHeartbeat();
  heartbeatId = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) ws.send("ping");
  }, 25000);
}

function stopHeartbeat() {
  if (heartbeatId) clearInterval(heartbeatId);
  heartbeatId = null;
}

function disconnect() {
  stopHeartbeat();
  stopVibration();
  if (state.sendTimer) {
    clearTimeout(state.sendTimer);
    state.sendTimer = null;
  }
  if (state.ws) {
    state.ws.onclose = null;
    state.ws.close();
    state.ws = null;
  }
}

function handleMessage(msg) {
  if (msg.type === "welcome") {
    applyControl(msg.state, false);
    setPeerStatus(msg.peers);
    return;
  }
  if (msg.type === "peer") {
    setPeerStatus(msg.peers);
    return;
  }
  if (msg.type === "control") {
    applyControl(msg.state, true);
    return;
  }
  if (msg.type === "error") {
    setConnectionStatus(msg.message, "warn");
  }
}

function applyControl(next, fromNetwork) {
  state.intensity = next.intensity ?? 0;
  state.mode = next.mode ?? "continuous";
  state.active = Boolean(next.active);
  renderControls();
  updateModeButtons();

  if (state.role === "client") {
    syncClientVisual();
    if (state.active && state.intensity > 0) {
      startVibrationLoop();
    } else {
      stopVibration();
    }
  }

  if (!fromNetwork && state.role === "host") {
    scheduleSend();
  }
}

function renderControls() {
  const pct = state.intensity;
  els.intensityValue.textContent = String(pct);
  els.sliderFill.style.height = `${pct}%`;
  els.sliderHandle.style.bottom = `${pct}%`;
  els.sliderTrack.setAttribute("aria-valuenow", String(pct));
  els.btnToggle.textContent = state.active ? "Pause" : "Start";
}

function updateModeButtons() {
  for (const btn of els.modeButtons) {
    btn.classList.toggle("active", btn.dataset.mode === state.mode);
  }
}

function scheduleSend() {
  if (state.sendTimer) return;
  state.sendTimer = setTimeout(() => {
    state.sendTimer = null;
    sendControl();
  }, 40);
}

function sendControl() {
  if (!state.ws || state.ws.readyState !== WebSocket.OPEN) return;
  if (state.role !== "host") return;
  state.ws.send(
    JSON.stringify({
      type: "control",
      intensity: state.intensity,
      mode: state.mode,
      active: state.active && state.intensity > 0,
    }),
  );
}

function setIntensityFromPointer(clientY) {
  const rect = els.sliderTrack.getBoundingClientRect();
  const ratio = 1 - (clientY - rect.top) / rect.height;
  const intensity = Math.max(0, Math.min(100, Math.round(ratio * 100)));
  state.intensity = intensity;
  if (intensity > 0 && !state.active) state.active = true;
  if (intensity === 0) state.active = false;
  renderControls();
  scheduleSend();
}

function buildPattern(mode, intensity) {
  const i = Math.max(0, Math.min(100, intensity));
  if (i <= 0) return [];

  const on = Math.max(20, Math.round(18 + i * 0.9));
  const off = Math.max(20, Math.round(220 - i * 1.6));

  switch (mode) {
    case "pulse":
      return [on, off];
    case "wave": {
      const soft = Math.max(15, Math.round(on * 0.45));
      const mid = Math.max(20, Math.round(on * 0.75));
      return [soft, 40, mid, 40, on, off, mid, 40, soft, off];
    }
    case "heartbeat": {
      const beat = Math.max(30, Math.round(on * 0.7));
      return [beat, 80, Math.round(beat * 1.25), Math.max(280, off + 80)];
    }
    case "staccato": {
      const tick = Math.max(15, Math.round(12 + i * 0.25));
      return [tick, 40, tick, 40, tick, Math.max(120, off)];
    }
    case "continuous":
    default: {
      // Duty-cycle continuous buzz: higher intensity = longer on, shorter off.
      const dutyOn = Math.max(40, Math.round(i * 4.5));
      const dutyOff = Math.max(15, Math.round((100 - i) * 2.2));
      return [dutyOn, dutyOff];
    }
  }
}

function canVibrate() {
  return typeof navigator !== "undefined" && typeof navigator.vibrate === "function";
}

function startVibrationLoop() {
  stopVibration(false);
  if (!state.vibeEnabled || !canVibrate()) return;

  const tick = () => {
    if (!state.active || state.intensity <= 0) {
      stopVibration();
      return;
    }
    const pattern = buildPattern(state.mode, state.intensity);
    navigator.vibrate(pattern);
    const duration = pattern.reduce((sum, n) => sum + n, 0) || 300;
    state.vibeTimer = setTimeout(tick, Math.max(120, duration));
  };

  tick();
}

function stopVibration(cancelMotor = true) {
  if (state.vibeTimer) {
    clearTimeout(state.vibeTimer);
    state.vibeTimer = null;
  }
  if (cancelMotor && canVibrate()) navigator.vibrate(0);
  syncClientVisual();
}

function syncClientVisual() {
  const live = state.active && state.intensity > 0;
  const scale = 0.72 + (state.intensity / 100) * 0.55;
  els.clientOrb.classList.toggle("active", live);
  els.clientOrb.style.transform = `scale(${scale})`;
  els.clientOrb.style.opacity = live ? String(0.55 + state.intensity / 180) : "0.55";
  els.clientCopy.textContent = live
    ? `${state.mode} · ${state.intensity}`
    : "Keep this screen open. Vibration follows the host’s handle.";
}

async function createRoom() {
  const res = await fetch("/api/create-room", { method: "POST" });
  if (!res.ok) throw new Error("Could not create room");
  const data = await res.json();
  return data.room;
}

els.btnHost.addEventListener("click", async () => {
  try {
    const room = await createRoom();
    connect(room, "host");
  } catch (err) {
    alert(err.message || "Failed to host");
  }
});

els.btnJoin.addEventListener("click", () => show(els.join));

for (const back of document.querySelectorAll("[data-back]")) {
  back.addEventListener("click", () => {
    disconnect();
    history.replaceState({}, "", "/");
    show(els.home);
  });
}

els.joinForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const room = els.joinCode.value.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (room.length < 4) {
    alert("Enter a valid room code");
    return;
  }
  connect(room, "client");
});

els.btnLeave.addEventListener("click", () => {
  disconnect();
  history.replaceState({}, "", "/");
  show(els.home);
});

els.modeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (state.role !== "host") return;
    state.mode = btn.dataset.mode;
    if (!MODES.includes(state.mode)) return;
    updateModeButtons();
    if (state.active) scheduleSend();
    else {
      state.active = state.intensity > 0;
      scheduleSend();
    }
  });
});

els.btnToggle.addEventListener("click", () => {
  if (state.role !== "host") return;
  state.active = !state.active;
  if (state.active && state.intensity === 0) state.intensity = 35;
  if (!state.active) {
    /* keep intensity for resume */
  }
  renderControls();
  sendControl();
});

els.btnStop.addEventListener("click", () => {
  if (state.role !== "host") return;
  state.active = false;
  state.intensity = 0;
  renderControls();
  if (state.ws?.readyState === WebSocket.OPEN) {
    state.ws.send(JSON.stringify({ type: "stop" }));
  }
});

els.btnCopy.addEventListener("click", async () => {
  const link = `${location.origin}/?room=${state.room}&role=client`;
  try {
    await navigator.clipboard.writeText(link);
    els.btnCopy.textContent = "Copied";
    setTimeout(() => {
      els.btnCopy.textContent = "Copy link";
    }, 1200);
  } catch {
    prompt("Copy this join link", link);
  }
});

els.btnEnableVibe.addEventListener("click", () => {
  state.vibeEnabled = true;
  if (!canVibrate()) {
    els.vibeHint.textContent =
      "This browser doesn’t expose the Vibration API (common on iPhone). Use Android Chrome for motor feedback — the visual pulse still works.";
  } else {
    navigator.vibrate([40, 40, 40]);
    els.vibeHint.textContent = "Vibration enabled. Waiting for the host.";
  }
  if (state.active && state.intensity > 0) startVibrationLoop();
});

function onPointerDown(event) {
  if (state.role !== "host") return;
  state.dragging = true;
  els.sliderTrack.setPointerCapture?.(event.pointerId);
  setIntensityFromPointer(event.clientY);
}

function onPointerMove(event) {
  if (!state.dragging) return;
  setIntensityFromPointer(event.clientY);
}

function onPointerUp(event) {
  if (!state.dragging) return;
  state.dragging = false;
  try {
    els.sliderTrack.releasePointerCapture?.(event.pointerId);
  } catch {
    // ignore
  }
  sendControl();
}

els.sliderTrack.addEventListener("pointerdown", onPointerDown);
els.sliderTrack.addEventListener("pointermove", onPointerMove);
els.sliderTrack.addEventListener("pointerup", onPointerUp);
els.sliderTrack.addEventListener("pointercancel", onPointerUp);

els.sliderTrack.addEventListener("keydown", (event) => {
  if (state.role !== "host") return;
  let next = state.intensity;
  if (event.key === "ArrowUp" || event.key === "ArrowRight") next += 5;
  if (event.key === "ArrowDown" || event.key === "ArrowLeft") next -= 5;
  if (event.key === "Home") next = 100;
  if (event.key === "End") next = 0;
  if (next === state.intensity) return;
  event.preventDefault();
  state.intensity = Math.max(0, Math.min(100, next));
  state.active = state.intensity > 0;
  renderControls();
  scheduleSend();
});

els.joinCode.addEventListener("input", () => {
  els.joinCode.value = els.joinCode.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
});

function bootFromQuery() {
  const params = new URLSearchParams(location.search);
  const room = (params.get("room") || "").toUpperCase();
  const role = params.get("role");
  if (room && (role === "host" || role === "client")) {
    connect(room, role);
  }
}

bootFromQuery();
