const MODES = ["continuous", "pulse", "wave", "heartbeat", "staccato"];
const LANGS = ["en", "fa", "ru"];
const LANG_KEY = "remotevib-lang";
const THEME_KEY = "remotevib-theme";
const HOST_SELF_VIBE_KEY = "remotevib-host-self-vibe";

const STRINGS = {
  en: {
    "meta.title": "RemoteVib",
    "meta.description": "Connect two phones. Control vibration remotely.",
    "prefs.themeDark": "Dark",
    "prefs.themeLight": "Light",
    "home.title": "Two phones.<br />One pulse.",
    "home.lede":
      "Host a room on one phone, join on the other, then drag the handle to control vibration live.",
    "home.host": "Host a room",
    "home.join": "Join a room",
    "join.back": "← Back",
    "join.title": "Enter room code",
    "join.lede": "Ask the host for their 6-character code.",
    "join.placeholder": "AB12CD",
    "join.connect": "Connect",
    "session.leave": "Leave",
    "session.roleHost": "Host",
    "session.roleClient": "Client",
    "status.connecting": "Connecting…",
    "status.connected": "Connected",
    "status.disconnected": "Disconnected",
    "status.connectionError": "Connection error",
    "status.waitingPeer": "Waiting for peer",
    "status.waitingClient": "Waiting for client",
    "status.clientConnected": "Client connected",
    "status.waitingHost": "Waiting for host",
    "status.hostConnected": "Host connected",
    "host.intensity": "intensity",
    "host.sliderAria": "Vibration intensity",
    "host.modesAria": "Vibration mode",
    "host.start": "Start",
    "host.pause": "Pause",
    "host.stop": "Stop",
    "host.copy": "Copy link",
    "host.copied": "Copied",
    "host.selfVibe": "Feel on this phone",
    "host.selfVibeEnabled": "Mirroring what the client feels.",
    "mode.continuous": "Continuous",
    "mode.pulse": "Pulse",
    "mode.wave": "Wave",
    "mode.heartbeat": "Heartbeat",
    "mode.staccato": "Staccato",
    "client.title": "Ready to receive",
    "client.copyIdle": "Keep this screen open. Vibration follows the host’s handle.",
    "client.copyLive": "{mode} · {intensity}",
    "client.enable": "Enable vibration",
    "client.noApi":
      "This browser doesn’t expose the Vibration API (common on iPhone). Use Android Chrome for motor feedback — the visual pulse still works.",
    "client.enabled": "Vibration enabled. Waiting for the host.",
    "alert.hostFail": "Failed to host",
    "alert.createFail": "Could not create room",
    "alert.invalidCode": "Enter a valid room code",
    "alert.copyPrompt": "Copy this join link",
  },
  fa: {
    "meta.title": "RemoteVib",
    "meta.description": "دو گوشی را وصل کنید. لرزش را از راه دور کنترل کنید.",
    "prefs.themeDark": "تیره",
    "prefs.themeLight": "روشن",
    "home.title": "دو گوشی.<br />یک نبض.",
    "home.lede":
      "روی یک گوشی اتاق بسازید، با گوشی دیگر وارد شوید، سپس دستگیره را بکشید تا لرزش را زنده کنترل کنید.",
    "home.host": "ساخت اتاق",
    "home.join": "پیوستن به اتاق",
    "join.back": "→ بازگشت",
    "join.title": "کد اتاق را وارد کنید",
    "join.lede": "کد ۶ حرفی را از میزبان بگیرید.",
    "join.placeholder": "AB12CD",
    "join.connect": "اتصال",
    "session.leave": "خروج",
    "session.roleHost": "میزبان",
    "session.roleClient": "مهمان",
    "status.connecting": "در حال اتصال…",
    "status.connected": "متصل",
    "status.disconnected": "قطع شد",
    "status.connectionError": "خطای اتصال",
    "status.waitingPeer": "در انتظار طرف مقابل",
    "status.waitingClient": "در انتظار مهمان",
    "status.clientConnected": "مهمان متصل شد",
    "status.waitingHost": "در انتظار میزبان",
    "status.hostConnected": "میزبان متصل شد",
    "host.intensity": "شدت",
    "host.sliderAria": "شدت لرزش",
    "host.modesAria": "حالت لرزش",
    "host.start": "شروع",
    "host.pause": "مکث",
    "host.stop": "توقف",
    "host.copy": "کپی لینک",
    "host.copied": "کپی شد",
    "host.selfVibe": "لرزش روی این گوشی",
    "host.selfVibeEnabled": "همان حسّی که مهمان دریافت می‌کند.",
    "mode.continuous": "پیوسته",
    "mode.pulse": "پالس",
    "mode.wave": "موج",
    "mode.heartbeat": "ضربان",
    "mode.staccato": "استکاتو",
    "client.title": "آماده دریافت",
    "client.copyIdle": "این صفحه را باز نگه دارید. لرزش از دستگیره میزبان پیروی می‌کند.",
    "client.copyLive": "{mode} · {intensity}",
    "client.enable": "فعال‌سازی لرزش",
    "client.noApi":
      "این مرورگر API لرزش را در دسترس نمی‌گذارد (معمولاً در آیفون). برای بازخورد موتور از کروم اندروید استفاده کنید — پالس تصویری همچنان کار می‌کند.",
    "client.enabled": "لرزش فعال شد. در انتظار میزبان.",
    "alert.hostFail": "میزبانی ناموفق بود",
    "alert.createFail": "ساخت اتاق ممکن نشد",
    "alert.invalidCode": "یک کد اتاق معتبر وارد کنید",
    "alert.copyPrompt": "این لینک ورود را کپی کنید",
  },
  ru: {
    "meta.title": "RemoteVib",
    "meta.description": "Соедините два телефона. Управляйте вибрацией удалённо.",
    "prefs.themeDark": "Тёмная",
    "prefs.themeLight": "Светлая",
    "home.title": "Два телефона.<br />Один пульс.",
    "home.lede":
      "Создайте комнату на одном телефоне, войдите с другого и двигайте ручку, чтобы управлять вибрацией в реальном времени.",
    "home.host": "Создать комнату",
    "home.join": "Войти в комнату",
    "join.back": "← Назад",
    "join.title": "Введите код комнаты",
    "join.lede": "Попросите у ведущего их 6-символьный код.",
    "join.placeholder": "AB12CD",
    "join.connect": "Подключиться",
    "session.leave": "Выйти",
    "session.roleHost": "Ведущий",
    "session.roleClient": "Гость",
    "status.connecting": "Подключение…",
    "status.connected": "Подключено",
    "status.disconnected": "Отключено",
    "status.connectionError": "Ошибка соединения",
    "status.waitingPeer": "Ожидание собеседника",
    "status.waitingClient": "Ожидание гостя",
    "status.clientConnected": "Гость подключён",
    "status.waitingHost": "Ожидание ведущего",
    "status.hostConnected": "Ведущий подключён",
    "host.intensity": "интенсивность",
    "host.sliderAria": "Интенсивность вибрации",
    "host.modesAria": "Режим вибрации",
    "host.start": "Старт",
    "host.pause": "Пауза",
    "host.stop": "Стоп",
    "host.copy": "Копировать ссылку",
    "host.copied": "Скопировано",
    "host.selfVibe": "Вибрация на этом телефоне",
    "host.selfVibeEnabled": "Повторяет то, что чувствует гость.",
    "mode.continuous": "Непрерывный",
    "mode.pulse": "Пульс",
    "mode.wave": "Волна",
    "mode.heartbeat": "Сердцебиение",
    "mode.staccato": "Стаккато",
    "client.title": "Готов принимать",
    "client.copyIdle":
      "Оставьте этот экран открытым. Вибрация следует за ручкой ведущего.",
    "client.copyLive": "{mode} · {intensity}",
    "client.enable": "Включить вибрацию",
    "client.noApi":
      "Этот браузер не даёт доступ к Vibration API (часто на iPhone). Для моторной отдачи используйте Chrome на Android — визуальный пульс всё равно работает.",
    "client.enabled": "Вибрация включена. Ожидание ведущего.",
    "alert.hostFail": "Не удалось создать комнату",
    "alert.createFail": "Не удалось создать комнату",
    "alert.invalidCode": "Введите корректный код комнаты",
    "alert.copyPrompt": "Скопируйте эту ссылку для входа",
  },
};

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
  hostSelfVibe: document.getElementById("host-self-vibe"),
  btnHostEnableVibe: document.getElementById("btn-host-enable-vibe"),
  hostVibeHint: document.getElementById("host-vibe-hint"),
  clientOrb: document.getElementById("client-orb"),
  clientCopy: document.getElementById("client-copy"),
  btnTheme: document.getElementById("btn-theme"),
  themeLabel: document.querySelector(".theme-label"),
  modeButtons: [...document.querySelectorAll(".mode")],
  langButtons: [...document.querySelectorAll(".lang-btn")],
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
  hostSelfVibe: true,
  vibeTimer: null,
  sendTimer: null,
  dragging: false,
  language: "en",
  languageManual: false,
  themePreference: null,
  connectionKey: "status.connecting",
  connectionKind: "warn",
  copyResetTimer: null,
};

function t(key, vars) {
  const table = STRINGS[state.language] || STRINGS.en;
  let value = table[key] ?? STRINGS.en[key] ?? key;
  if (vars) {
    value = value.replace(/\{(\w+)\}/g, (_, name) =>
      vars[name] != null ? String(vars[name]) : "",
    );
  }
  return value;
}

function modeLabel(mode) {
  return t(`mode.${mode}`);
}

function applyStaticTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (!key) return;
    const attr = node.getAttribute("data-i18n-attr");
    const value = t(key);
    if (attr) node.setAttribute(attr, value);
    else node.textContent = value;
  });

  document.querySelectorAll("[data-i18n-html]").forEach((node) => {
    const key = node.getAttribute("data-i18n-html");
    if (!key) return;
    node.innerHTML = t(key);
  });
}

function refreshDynamicCopy() {
  if (state.role) {
    els.roleLabel.textContent =
      state.role === "host" ? t("session.roleHost") : t("session.roleClient");
  }

  setConnectionStatus(state.connectionKey, state.connectionKind, true);
  setPeerStatus(state.peers, true);
  renderControls();
  syncClientVisual();
  updateThemeButton();

  if (state.vibeEnabled) {
    els.vibeHint.textContent = canVibrate() ? t("client.enabled") : t("client.noApi");
  }
  updateHostVibeUi();
}

function setLanguage(lang, { persist = false, fromAuto = false } = {}) {
  if (!LANGS.includes(lang)) return;
  state.language = lang;
  if (persist) {
    localStorage.setItem(LANG_KEY, lang);
    state.languageManual = true;
  } else if (fromAuto) {
    state.languageManual = false;
  }

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";

  for (const btn of els.langButtons) {
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
  }

  applyStaticTranslations();
  refreshDynamicCopy();
}

function systemPrefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function effectiveTheme() {
  if (state.themePreference === "light" || state.themePreference === "dark") {
    return state.themePreference;
  }
  return systemPrefersDark() ? "dark" : "light";
}

function applyTheme() {
  const theme = effectiveTheme();
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", theme === "dark" ? "#071412" : "#0b2e2a");
  }
  updateThemeButton();
}

function updateThemeButton() {
  const nextIsDark = effectiveTheme() === "light";
  const key = nextIsDark ? "prefs.themeDark" : "prefs.themeLight";
  const label = t(key);
  els.btnTheme.setAttribute("aria-label", label);
  els.btnTheme.title = label;
  els.btnTheme.setAttribute("aria-pressed", String(effectiveTheme() === "dark"));
  if (els.themeLabel) {
    els.themeLabel.setAttribute("data-i18n", key);
    els.themeLabel.textContent = label;
  }
}

function setThemePreference(pref) {
  state.themePreference = pref;
  if (pref === "light" || pref === "dark") {
    localStorage.setItem(THEME_KEY, pref);
  } else {
    localStorage.removeItem(THEME_KEY);
  }
  applyTheme();
}

function toggleTheme() {
  const next = effectiveTheme() === "dark" ? "light" : "dark";
  setThemePreference(next);
}

function show(view) {
  for (const node of [els.home, els.join, els.session]) {
    node.classList.toggle("hidden", node !== view);
  }
}

function setConnectionStatus(keyOrText, kind = "", isKey = true) {
  if (isKey) {
    state.connectionKey = keyOrText;
    state.connectionKind = kind;
    els.statusConnection.textContent = t(keyOrText);
  } else {
    state.connectionKey = keyOrText;
    state.connectionKind = kind;
    els.statusConnection.textContent = keyOrText;
  }
  els.statusConnection.classList.remove("live", "warn");
  if (kind) els.statusConnection.classList.add(kind);
}

function setPeerStatus(peers, skipAssign = false) {
  if (!skipAssign) state.peers = peers;
  if (state.role === "host") {
    els.statusPeer.textContent = peers.client
      ? t("status.clientConnected")
      : t("status.waitingClient");
    els.statusPeer.classList.toggle("live", peers.client);
    els.statusPeer.classList.toggle("warn", !peers.client);
  } else if (state.role === "client") {
    els.statusPeer.textContent = peers.host
      ? t("status.hostConnected")
      : t("status.waitingHost");
    els.statusPeer.classList.toggle("live", peers.host);
    els.statusPeer.classList.toggle("warn", !peers.host);
  } else {
    els.statusPeer.textContent = t("status.waitingPeer");
    els.statusPeer.classList.remove("live");
    els.statusPeer.classList.add("warn");
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

  els.roleLabel.textContent =
    role === "host" ? t("session.roleHost") : t("session.roleClient");
  els.roomLabel.textContent = room;
  els.hostPanel.classList.toggle("hidden", role !== "host");
  els.clientPanel.classList.toggle("hidden", role !== "client");
  show(els.session);
  setConnectionStatus("status.connecting", "warn");
  setPeerStatus({ host: role === "host", client: role === "client" });
  renderControls();
  updateModeButtons();
  updateHostVibeUi();
  syncLocalVibration();

  const ws = new WebSocket(wsUrl(room, role));
  state.ws = ws;

  ws.addEventListener("open", () => {
    setConnectionStatus("status.connected", "live");
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
    setConnectionStatus("status.disconnected", "warn");
    stopVibration();
  });

  ws.addEventListener("error", () => {
    setConnectionStatus("status.connectionError", "warn");
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
  if (state.copyResetTimer) {
    clearTimeout(state.copyResetTimer);
    state.copyResetTimer = null;
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
    setConnectionStatus(msg.message, "warn", false);
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
  }

  syncLocalVibration();

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
  els.btnToggle.textContent = state.active ? t("host.pause") : t("host.start");
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
  syncLocalVibration();
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
      const dutyOn = Math.max(40, Math.round(i * 4.5));
      const dutyOff = Math.max(15, Math.round((100 - i) * 2.2));
      return [dutyOn, dutyOff];
    }
  }
}

function canVibrate() {
  return typeof navigator !== "undefined" && typeof navigator.vibrate === "function";
}

function shouldVibrateLocally() {
  if (!state.active || state.intensity <= 0) return false;
  if (!state.vibeEnabled || !canVibrate()) return false;
  if (state.role === "client") return true;
  if (state.role === "host") return state.hostSelfVibe;
  return false;
}

function syncLocalVibration() {
  if (shouldVibrateLocally()) startVibrationLoop();
  else stopVibration();
}

function startVibrationLoop() {
  stopVibration(false);
  if (!shouldVibrateLocally()) return;

  const tick = () => {
    if (!shouldVibrateLocally()) {
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
  if (state.role === "client") syncClientVisual();
}

function enableVibration(targetHint) {
  state.vibeEnabled = true;
  if (!canVibrate()) {
    targetHint.textContent = t("client.noApi");
  } else {
    navigator.vibrate([40, 40, 40]);
    targetHint.textContent =
      state.role === "host" ? t("host.selfVibeEnabled") : t("client.enabled");
  }
  updateHostVibeUi();
  syncLocalVibration();
}

function updateHostVibeUi() {
  if (!els.hostSelfVibe) return;
  els.hostSelfVibe.checked = state.hostSelfVibe;
  const needsEnable = state.hostSelfVibe && !state.vibeEnabled;
  els.btnHostEnableVibe.classList.toggle("hidden", !needsEnable);

  if (!state.hostSelfVibe) {
    els.hostVibeHint.textContent = "";
  } else if (state.vibeEnabled) {
    els.hostVibeHint.textContent = canVibrate()
      ? t("host.selfVibeEnabled")
      : t("client.noApi");
  } else {
    els.hostVibeHint.textContent = "";
  }
}

function setHostSelfVibe(on) {
  state.hostSelfVibe = Boolean(on);
  localStorage.setItem(HOST_SELF_VIBE_KEY, state.hostSelfVibe ? "1" : "0");
  updateHostVibeUi();
  syncLocalVibration();
}

function syncClientVisual() {
  const live = state.active && state.intensity > 0;
  const scale = 0.72 + (state.intensity / 100) * 0.55;
  els.clientOrb.classList.toggle("active", live);
  els.clientOrb.style.transform = `scale(${scale})`;
  els.clientOrb.style.opacity = live ? String(0.55 + state.intensity / 180) : "0.55";
  els.clientCopy.textContent = live
    ? t("client.copyLive", {
        mode: modeLabel(state.mode),
        intensity: state.intensity,
      })
    : t("client.copyIdle");
}

async function createRoom() {
  const res = await fetch("/api/create-room", { method: "POST" });
  if (!res.ok) throw new Error(t("alert.createFail"));
  const data = await res.json();
  return data.room;
}

async function detectLocale() {
  try {
    const res = await fetch("/api/locale");
    if (!res.ok) return null;
    const data = await res.json();
    return LANGS.includes(data.language) ? data.language : null;
  } catch {
    return null;
  }
}

function initPrefs() {
  const savedLang = localStorage.getItem(LANG_KEY);
  const savedTheme = localStorage.getItem(THEME_KEY);
  const savedSelfVibe = localStorage.getItem(HOST_SELF_VIBE_KEY);

  state.hostSelfVibe = savedSelfVibe !== "0";
  updateHostVibeUi();

  state.themePreference =
    savedTheme === "light" || savedTheme === "dark" ? savedTheme : null;
  applyTheme();

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onSchemeChange = () => {
    if (state.themePreference == null) applyTheme();
  };
  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", onSchemeChange);
  } else if (typeof media.addListener === "function") {
    media.addListener(onSchemeChange);
  }

  els.btnTheme.addEventListener("click", toggleTheme);

  for (const btn of els.langButtons) {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.lang, { persist: true });
    });
  }

  if (LANGS.includes(savedLang)) {
    setLanguage(savedLang, { persist: false });
    state.languageManual = true;
    return;
  }

  setLanguage("en");
  detectLocale().then((lang) => {
    if (!lang || state.languageManual) return;
    setLanguage(lang, { fromAuto: true });
  });
}

els.btnHost.addEventListener("click", async () => {
  try {
    const room = await createRoom();
    connect(room, "host");
  } catch (err) {
    alert(err.message || t("alert.hostFail"));
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
    alert(t("alert.invalidCode"));
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
    syncLocalVibration();
  });
});

els.btnToggle.addEventListener("click", () => {
  if (state.role !== "host") return;
  state.active = !state.active;
  if (state.active && state.intensity === 0) state.intensity = 35;
  renderControls();
  syncLocalVibration();
  sendControl();
});

els.btnStop.addEventListener("click", () => {
  if (state.role !== "host") return;
  state.active = false;
  state.intensity = 0;
  renderControls();
  syncLocalVibration();
  if (state.ws?.readyState === WebSocket.OPEN) {
    state.ws.send(JSON.stringify({ type: "stop" }));
  }
});

els.hostSelfVibe.addEventListener("change", () => {
  setHostSelfVibe(els.hostSelfVibe.checked);
});

els.btnHostEnableVibe.addEventListener("click", () => {
  enableVibration(els.hostVibeHint);
});

els.btnCopy.addEventListener("click", async () => {
  const link = `${location.origin}/?room=${state.room}&role=client`;
  try {
    await navigator.clipboard.writeText(link);
    els.btnCopy.textContent = t("host.copied");
    if (state.copyResetTimer) clearTimeout(state.copyResetTimer);
    state.copyResetTimer = setTimeout(() => {
      els.btnCopy.textContent = t("host.copy");
      state.copyResetTimer = null;
    }, 1200);
  } catch {
    prompt(t("alert.copyPrompt"), link);
  }
});

els.btnEnableVibe.addEventListener("click", () => {
  enableVibration(els.vibeHint);
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
  syncLocalVibration();
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

initPrefs();
bootFromQuery();
