import { replicate } from "./replicate";

const onExit = async () => {
  console.log("onExit");
  await replicate();
  process.exit(0);
};

type Config = {
  /**
   * default: 86400000 (24 hours)
   */
  snapshotInterval?: number;
};

export const start = async ({ snapshotInterval = 86400000 }: Config) => {
  setInterval(async () => {
    await replicate();
  }, snapshotInterval);

  process.on("SIGTERM", onExit);
  process.on("SIGINT", onExit);
};
