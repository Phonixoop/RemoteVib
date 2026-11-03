interface Env {
  ASSETS: Fetcher;
  ROOM: DurableObjectNamespace<import("./src/room").VibeRoom>;
  /** Set to "true" / "1" / "yes" / "on" to enable WebRTC video. Default off. */
  ENABLE_VIDEO?: string;
}
