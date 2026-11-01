interface Env {
  ASSETS: Fetcher;
  ROOM: DurableObjectNamespace<import("./src/room").VibeRoom>;
}
