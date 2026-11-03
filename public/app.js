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
    "react.title": "Quick reactions",
    "react.add": "Add",
    "react.save": "Save",
    "react.cancel": "Cancel",
    "react.customPlaceholder": "Custom message",
    "react.fromHost": "Host",
    "react.fromClient": "Client",
    "react.fromYou": "You",
    "react.love": "Love it",
    "react.hot": "Hot",
    "react.wow": "Wow",
    "react.lol": "Lol",
    "react.wait": "Wait",
    "react.ok": "OK",
    "react.more": "More",
    "react.soft": "Softer",
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
    "video.placeholder": "Video appears here when you start a call",
    "video.start": "Start video",
    "video.end": "End",
    "video.mute": "Mute",
    "video.unmute": "Unmute",
    "video.camOff": "Camera off",
    "video.camOn": "Camera on",
    "video.needPeer": "Wait for the other phone to connect",
    "video.connecting": "Connecting video…",
    "video.live": "Video live",
    "video.ended": "Call ended",
    "video.permDenied": "Camera/mic permission denied",
    "video.failed": "Video call failed — try again on the same Wi‑Fi or with a VPN",
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
    "react.title": "واکنش سریع",
    "react.add": "افزودن",
    "react.save": "ذخیره",
    "react.cancel": "لغو",
    "react.customPlaceholder": "پیام سفارشی",
    "react.fromHost": "میزبان",
    "react.fromClient": "مهمان",
    "react.fromYou": "شما",
    "react.love": "عاشقتم",
    "react.hot": "داغ",
    "react.wow": "وای",
    "react.lol": "خنده‌دار",
    "react.wait": "صبر کن",
    "react.ok": "باشه",
    "react.more": "بیشتر",
    "react.soft": "ملایم‌تر",
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
    "video.placeholder": "با شروع تماس، تصویر اینجا دیده می‌شود",
    "video.start": "شروع ویدیو",
    "video.end": "پایان",
    "video.mute": "قطع صدا",
    "video.unmute": "وصل صدا",
    "video.camOff": "خاموش کردن دوربین",
    "video.camOn": "روشن کردن دوربین",
    "video.needPeer": "صبر کنید تا گوشی دیگر وصل شود",
    "video.connecting": "در حال اتصال ویدیو…",
    "video.live": "ویدیو فعال",
    "video.ended": "تماس پایان یافت",
    "video.permDenied": "دسترسی به دوربین/میکروفون رد شد",
    "video.failed": "تماس ویدیویی ناموفق — دوباره روی یک وای‌فای یا با VPN امتحان کنید",
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
    "react.title": "Быстрые реакции",
    "react.add": "Добавить",
    "react.save": "Сохранить",
    "react.cancel": "Отмена",
    "react.customPlaceholder": "Своё сообщение",
    "react.fromHost": "Ведущий",
    "react.fromClient": "Гость",
    "react.fromYou": "Вы",
    "react.love": "Люблю",
    "react.hot": "Горячо",
    "react.wow": "Вау",
    "react.lol": "Лол",
    "react.wait": "Подожди",
    "react.ok": "Ок",
    "react.more": "Ещё",
    "react.soft": "Мягче",
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
    "video.placeholder": "Видео появится здесь, когда вы начнёте звонок",
    "video.start": "Начать видео",
    "video.end": "Завершить",
    "video.mute": "Без звука",
    "video.unmute": "Включить звук",
    "video.camOff": "Камера выкл.",
    "video.camOn": "Камера вкл.",
    "video.needPeer": "Дождитесь подключения второго телефона",
    "video.connecting": "Подключение видео…",
    "video.live": "Видео активно",
    "video.ended": "Звонок завершён",
    "video.permDenied": "Нет доступа к камере/микрофону",
    "video.failed": "Видеозвонок не удался — попробуйте ту же Wi‑Fi или VPN",
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
  reactionsList: document.getElementById("reactions-list"),
  btnAddReaction: document.getElementById("btn-add-reaction"),
  reactionForm: document.getElementById("reaction-custom-form"),
  reactionEmoji: document.getElementById("reaction-emoji"),
  reactionText: document.getElementById("reaction-text"),
  btnCancelReaction: document.getElementById("btn-cancel-reaction"),
  reactionToasts: document.getElementById("reaction-toasts"),
  videoStage: document.getElementById("video-stage"),
  videoRemote: document.getElementById("video-remote"),
  videoLocal: document.getElementById("video-local"),
  videoPlaceholder: document.getElementById("video-placeholder"),
  videoStatus: document.getElementById("video-status"),
  btnVideoCall: document.getElementById("btn-video-call"),
  btnVideoMute: document.getElementById("btn-video-mute"),
  btnVideoCam: document.getElementById("btn-video-cam"),
  btnVideoHangup: document.getElementById("btn-video-hangup"),
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
  vibeSyncTimer: null,
  sendTimer: null,
  dragging: false,
  language: "en",
  languageManual: false,
  themePreference: null,
  connectionKey: "status.connecting",
  connectionKind: "warn",
  copyResetTimer: null,
  customReactions: [],
  pc: null,
  localStream: null,
  makingOffer: false,
  ignoreOffer: false,
  callActive: false,
  micMuted: false,
  camOff: false,
  videoStatusKey: "",
};

const BUILTIN_REACTIONS = [
  { id: "love", emoji: "❤️", labelKey: "react.love" },
  { id: "hot", emoji: "🔥", labelKey: "react.hot" },
  { id: "wow", emoji: "😮", labelKey: "react.wow" },
  { id: "lol", emoji: "😂", labelKey: "react.lol" },
  { id: "wait", emoji: "✋", labelKey: "react.wait" },
  { id: "ok", emoji: "✅", labelKey: "react.ok" },
  { id: "more", emoji: "😈", labelKey: "react.more" },
  { id: "soft", emoji: "💤", labelKey: "react.soft" },
];

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
  renderReactions();
  updateVideoUi();
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

function peerConnected() {
  if (state.role === "host") return Boolean(state.peers?.client);
  if (state.role === "client") return Boolean(state.peers?.host);
  return false;
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
  updateVideoUi();
  if (!peerConnected() && (state.callActive || state.pc)) {
    endCall({ notifyRemote: false, statusKey: "video.ended" });
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
  resetSessionReactions();
  hideReactionForm();
  setVideoStatus("");
  updateVideoUi();

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
  endCall({ notifyRemote: false, statusKey: "" });
  if (state.vibeSyncTimer) {
    clearTimeout(state.vibeSyncTimer);
    state.vibeSyncTimer = null;
  }
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
  resetSessionReactions();
  clearReactionToasts();
  hideReactionForm();
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
  if (msg.type === "reaction") {
    const display = resolveReactionDisplay(msg);
    showReactionToast({
      emoji: display.emoji,
      text: display.text,
      from: msg.from,
      outgoing: false,
    });
    return;
  }
  if (msg.type === "webrtc") {
    handleWebrtcSignal(msg);
    return;
  }
  if (msg.type === "error") {
    setConnectionStatus(msg.message, "warn", false);
  }
}

function resetSessionReactions() {
  state.customReactions = [];
  renderReactions();
}

function reactionEntries() {
  const builtins = BUILTIN_REACTIONS.map((item) => ({
    id: item.id,
    emoji: item.emoji,
    text: t(item.labelKey),
    custom: false,
  }));
  const customs = state.customReactions.map((item, index) => ({
    id: `custom-${index}`,
    emoji: item.emoji,
    text: item.text,
    custom: true,
  }));
  return [...builtins, ...customs];
}

function renderReactions() {
  if (!els.reactionsList) return;
  const entries = reactionEntries();
  els.reactionsList.replaceChildren(
    ...entries.map((item) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "reaction-chip";
      btn.setAttribute("role", "listitem");

      const emoji = document.createElement("span");
      emoji.className = "reaction-emoji";
      emoji.textContent = item.emoji;

      const label = document.createElement("span");
      label.textContent = item.text;

      btn.append(emoji, label);
      btn.addEventListener("click", () => sendReaction(item));
      return btn;
    }),
  );
}

function hideReactionForm() {
  els.reactionForm.classList.add("hidden");
  els.reactionEmoji.value = "";
  els.reactionText.value = "";
}

function showReactionForm() {
  els.reactionForm.classList.remove("hidden");
  els.reactionEmoji.focus();
}

function resolveReactionDisplay(msg) {
  if (msg && typeof msg.id === "string") {
    const builtin = BUILTIN_REACTIONS.find((item) => item.id === msg.id);
    if (builtin) {
      return { emoji: builtin.emoji, text: t(builtin.labelKey) };
    }
  }
  return {
    emoji: typeof msg?.emoji === "string" && msg.emoji ? msg.emoji : "💬",
    text: typeof msg?.text === "string" ? msg.text : "",
  };
}

function sendReaction(item) {
  if (!item) return;

  // Predefined: language-agnostic id. Receiver translates locally.
  if (!item.custom && item.id) {
    const display = resolveReactionDisplay({ id: item.id });
    showReactionToast({
      emoji: display.emoji,
      text: display.text,
      from: state.role,
      outgoing: true,
    });
    if (!state.ws || state.ws.readyState !== WebSocket.OPEN) return;
    state.ws.send(
      JSON.stringify({
        type: "reaction",
        id: item.id,
        emoji: item.emoji,
      }),
    );
    return;
  }

  // Custom: send literal text as typed (no translation).
  const cleanEmoji = String(item.emoji || "").trim().slice(0, 8) || "💬";
  const cleanText = String(item.text || "").trim().slice(0, 40);
  if (!cleanText) return;

  showReactionToast({
    emoji: cleanEmoji,
    text: cleanText,
    from: state.role,
    outgoing: true,
  });

  if (!state.ws || state.ws.readyState !== WebSocket.OPEN) return;
  state.ws.send(
    JSON.stringify({
      type: "reaction",
      emoji: cleanEmoji,
      text: cleanText,
    }),
  );
}

function fromLabel(from, outgoing) {
  if (outgoing) return t("react.fromYou");
  if (from === "host") return t("react.fromHost");
  if (from === "client") return t("react.fromClient");
  return t("react.fromYou");
}

function showReactionToast({ emoji, text, from, outgoing }) {
  const toast = document.createElement("div");
  toast.className = `reaction-toast${outgoing ? " outgoing" : ""}`;

  const emojiEl = document.createElement("span");
  emojiEl.className = "toast-emoji";
  emojiEl.textContent = emoji || "💬";

  const body = document.createElement("div");
  body.className = "toast-body";

  const fromEl = document.createElement("span");
  fromEl.className = "toast-from";
  fromEl.textContent = fromLabel(from, outgoing);

  const textEl = document.createElement("span");
  textEl.className = "toast-text";
  textEl.textContent = text || "";

  body.append(fromEl, textEl);
  toast.append(emojiEl, body);
  els.reactionToasts.append(toast);

  while (els.reactionToasts.children.length > 3) {
    els.reactionToasts.firstElementChild?.remove();
  }

  setTimeout(() => {
    toast.classList.add("leaving");
    setTimeout(() => toast.remove(), 280);
  }, 2600);
}

function clearReactionToasts() {
  els.reactionToasts.replaceChildren();
}

const ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun.cloudflare.com:3478" },
  ],
};

function sendWebrtc(payload) {
  if (!state.ws || state.ws.readyState !== WebSocket.OPEN) return;
  state.ws.send(JSON.stringify({ type: "webrtc", ...payload }));
}

function setVideoStatus(key, isKey = true) {
  state.videoStatusKey = isKey ? key : "";
  els.videoStatus.textContent = key ? (isKey ? t(key) : key) : "";
}

function updateVideoUi() {
  const live = state.callActive;
  const canStart = peerConnected() && !live && !state.pc;
  els.btnVideoCall.classList.toggle("hidden", live || Boolean(state.pc));
  els.btnVideoCall.disabled = !peerConnected();
  els.btnVideoHangup.classList.toggle("hidden", !live && !state.pc);
  els.btnVideoMute.classList.toggle("hidden", !live);
  els.btnVideoCam.classList.toggle("hidden", !live);
  els.videoStage.dataset.state = live ? "live" : state.pc ? "connecting" : "idle";
  els.videoPlaceholder.classList.toggle("hidden", live || Boolean(els.videoRemote.srcObject));

  els.btnVideoMute.textContent = state.micMuted ? t("video.unmute") : t("video.mute");
  els.btnVideoMute.setAttribute("aria-pressed", String(state.micMuted));
  els.btnVideoMute.setAttribute(
    "data-i18n",
    state.micMuted ? "video.unmute" : "video.mute",
  );

  els.btnVideoCam.textContent = state.camOff ? t("video.camOn") : t("video.camOff");
  els.btnVideoCam.setAttribute("aria-pressed", String(state.camOff));
  els.btnVideoCam.setAttribute(
    "data-i18n",
    state.camOff ? "video.camOn" : "video.camOff",
  );

  if (state.videoStatusKey) {
    els.videoStatus.textContent = t(state.videoStatusKey);
  }
}

async function ensureLocalMedia() {
  if (state.localStream) return state.localStream;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        facingMode: "user",
        width: { ideal: 640 },
        height: { ideal: 480 },
      },
    });
    state.localStream = stream;
    els.videoLocal.srcObject = stream;
    for (const track of stream.getAudioTracks()) {
      track.enabled = !state.micMuted;
    }
    for (const track of stream.getVideoTracks()) {
      track.enabled = !state.camOff;
    }
    return stream;
  } catch (err) {
    const denied =
      err && (err.name === "NotAllowedError" || err.name === "PermissionDeniedError");
    setVideoStatus(denied ? "video.permDenied" : "video.failed");
    throw err;
  }
}

function stopLocalMedia() {
  if (state.localStream) {
    for (const track of state.localStream.getTracks()) {
      track.stop();
    }
    state.localStream = null;
  }
  els.videoLocal.srcObject = null;
  els.videoRemote.srcObject = null;
}

async function ensurePeerConnection() {
  if (state.pc) return state.pc;

  const pc = new RTCPeerConnection(ICE_SERVERS);
  state.pc = pc;

  pc.onicecandidate = (event) => {
    sendWebrtc({
      kind: "ice",
      candidate: event.candidate
        ? {
            candidate: event.candidate.candidate,
            sdpMid: event.candidate.sdpMid,
            sdpMLineIndex: event.candidate.sdpMLineIndex,
            usernameFragment: event.candidate.usernameFragment,
          }
        : null,
    });
  };

  pc.ontrack = (event) => {
    const [stream] = event.streams;
    els.videoRemote.srcObject = stream || new MediaStream([event.track]);
    els.videoPlaceholder.classList.add("hidden");
  };

  pc.onconnectionstatechange = () => {
    if (state.pc !== pc) return;
    const cs = pc.connectionState;
    if (cs === "connected") {
      state.callActive = true;
      setVideoStatus("video.live");
      updateVideoUi();
    } else if (cs === "failed") {
      endCall({ notifyRemote: true, statusKey: "video.failed" });
    } else if (cs === "closed") {
      endCall({ notifyRemote: false, statusKey: "video.ended" });
    }
  };

  try {
    const stream = await ensureLocalMedia();
    for (const track of stream.getTracks()) {
      pc.addTrack(track, stream);
    }
  } catch (err) {
    try {
      pc.close();
    } catch {
      // ignore
    }
    if (state.pc === pc) state.pc = null;
    throw err;
  }

  return pc;
}

async function startCall() {
  if (!peerConnected()) {
    setVideoStatus("video.needPeer");
    return;
  }
  if (state.pc || state.callActive) return;

  try {
    setVideoStatus("video.connecting");
    updateVideoUi();
    const pc = await ensurePeerConnection();
    state.makingOffer = true;
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    sendWebrtc({ kind: "offer", sdp: pc.localDescription });
    updateVideoUi();
  } catch {
    endCall({ notifyRemote: false, statusKey: state.videoStatusKey || "video.failed" });
  } finally {
    state.makingOffer = false;
  }
}

function endCall({ notifyRemote = true, statusKey = "video.ended" } = {}) {
  if (notifyRemote && state.ws?.readyState === WebSocket.OPEN && (state.pc || state.callActive)) {
    sendWebrtc({ kind: "hangup" });
  }

  if (state.pc) {
    try {
      state.pc.onicecandidate = null;
      state.pc.ontrack = null;
      state.pc.onconnectionstatechange = null;
      state.pc.close();
    } catch {
      // ignore
    }
    state.pc = null;
  }

  stopLocalMedia();
  state.callActive = false;
  state.makingOffer = false;
  state.ignoreOffer = false;
  state.micMuted = false;
  state.camOff = false;
  setVideoStatus(statusKey);
  updateVideoUi();
}

async function handleWebrtcSignal(msg) {
  if (!msg || msg.from === state.role) return;

  if (msg.kind === "hangup") {
    endCall({ notifyRemote: false, statusKey: "video.ended" });
    return;
  }

  try {
    const polite = state.role === "host";

    if (msg.kind === "offer") {
      const offerCollision = state.makingOffer || state.pc?.signalingState !== "stable";
      state.ignoreOffer = !polite && offerCollision;
      if (state.ignoreOffer) return;

      setVideoStatus("video.connecting");
      const pc = await ensurePeerConnection();
      if (offerCollision) {
        await Promise.all([
          pc.setLocalDescription({ type: "rollback" }),
          pc.setRemoteDescription(msg.sdp),
        ]);
      } else {
        await pc.setRemoteDescription(msg.sdp);
      }
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      sendWebrtc({ kind: "answer", sdp: pc.localDescription });
      updateVideoUi();
      return;
    }

    if (msg.kind === "answer") {
      if (!state.pc) return;
      await state.pc.setRemoteDescription(msg.sdp);
      return;
    }

    if (msg.kind === "ice") {
      if (!state.pc || state.ignoreOffer) return;
      try {
        await state.pc.addIceCandidate(msg.candidate);
      } catch {
        if (!state.ignoreOffer) throw new Error("ice failed");
      }
    }
  } catch {
    setVideoStatus("video.failed");
    endCall({ notifyRemote: true, statusKey: "video.failed" });
  }
}

function toggleMic() {
  state.micMuted = !state.micMuted;
  if (state.localStream) {
    for (const track of state.localStream.getAudioTracks()) {
      track.enabled = !state.micMuted;
    }
  }
  updateVideoUi();
}

function toggleCam() {
  state.camOff = !state.camOff;
  if (state.localStream) {
    for (const track of state.localStream.getVideoTracks()) {
      track.enabled = !state.camOff;
    }
  }
  updateVideoUi();
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
  // Keep drag path light: paint only + throttled WS send.
  // Host/client motor feedback is driven by the vibe loop, not every move.
  renderControls();
  scheduleSend();
  scheduleVibeSync();
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

function scheduleVibeSync() {
  if (state.vibeSyncTimer) return;
  state.vibeSyncTimer = setTimeout(() => {
    state.vibeSyncTimer = null;
    syncLocalVibration();
  }, 120);
}

function syncLocalVibration({ restart = false } = {}) {
  if (!shouldVibrateLocally()) {
    stopVibration();
    return;
  }
  // Intensity changes are picked up by the next loop tick — do not
  // stop/restart navigator.vibrate on every slider update.
  if (restart && state.vibeTimer != null) {
    stopVibration(false);
  }
  if (state.vibeTimer == null) startVibrationLoop();
}

function startVibrationLoop() {
  if (state.vibeTimer != null) return;
  if (!shouldVibrateLocally()) return;

  const tick = () => {
    state.vibeTimer = null;
    if (!shouldVibrateLocally()) {
      stopVibration();
      return;
    }
    const pattern = buildPattern(state.mode, state.intensity);
    if (pattern.length === 0) {
      stopVibration();
      return;
    }
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
    syncLocalVibration({ restart: true });
  });
});

els.btnToggle.addEventListener("click", () => {
  if (state.role !== "host") return;
  state.active = !state.active;
  if (state.active && state.intensity === 0) state.intensity = 35;
  renderControls();
  syncLocalVibration({ restart: true });
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

els.btnVideoCall.addEventListener("click", () => {
  startCall();
});

els.btnVideoHangup.addEventListener("click", () => {
  endCall({ notifyRemote: true, statusKey: "video.ended" });
});

els.btnVideoMute.addEventListener("click", () => {
  toggleMic();
});

els.btnVideoCam.addEventListener("click", () => {
  toggleCam();
});

els.btnAddReaction.addEventListener("click", () => {
  if (els.reactionForm.classList.contains("hidden")) showReactionForm();
  else hideReactionForm();
});

els.btnCancelReaction.addEventListener("click", () => {
  hideReactionForm();
});

els.reactionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const emoji = els.reactionEmoji.value.trim().slice(0, 8) || "💬";
  const text = els.reactionText.value.trim().slice(0, 24);
  if (!text) return;
  if (state.customReactions.length >= 8) {
    state.customReactions.shift();
  }
  state.customReactions.push({ emoji, text });
  hideReactionForm();
  renderReactions();
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
  syncLocalVibration();
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
