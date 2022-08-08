import { replicate } from "./replicate";
import { config } from "./config";

export const start = async () => {
  const { replicaUrl, snapshotInterval } = config;
  if (replicaUrl == null) {
    throw new Error("replicaUrl is not set");
  }

  setInterval(async () => {
    await replicate();
  }, snapshotInterval);

  const onExit = async () => {
    console.log("onExit");
    await replicate();
    process.exit(0);
  };
  process.on("SIGTERM", onExit);
  process.on("SIGINT", onExit);
};
