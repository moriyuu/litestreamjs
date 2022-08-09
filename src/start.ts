import { replicate } from "./replicate";
import { config } from "./config";

export const start = async () => {
  if (config == null) {
    throw new Error("config is not set");
  }
  const { snapshotInterval } = config;

  setInterval(async () => {
    await replicate();
  }, snapshotInterval);

  const onExit = async () => {
    console.log("onExit ...");
    await replicate();
    console.log("onExit ok.");
    process.exit(0);
  };
  process.on("SIGTERM", onExit);
  process.on("SIGINT", onExit);
};
