import { replicate } from "./replicate";
import { retainer } from "./retainer";
import { config } from "./config";

const startSnapshotTimer = (snapshotInterval: number) => {
  setInterval(async () => {
    await replicate();
  }, snapshotInterval);
};

const startRetentionCheckTimer = (retentionCheckInterval: number) => {
  setInterval(async () => {
    await retainer();
  }, retentionCheckInterval);
};

export const start = async () => {
  if (config == null) {
    throw new Error("config is not set");
  }
  const { snapshotInterval, retentionCheckInterval } = config;

  startSnapshotTimer(snapshotInterval);
  startRetentionCheckTimer(retentionCheckInterval);

  const onExit = async () => {
    console.log("onExit ...");
    await replicate();
    console.log("onExit ok.");
    process.exit(0);
  };
  process.on("SIGTERM", onExit);
  process.on("SIGINT", onExit);
};
