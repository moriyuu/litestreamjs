import * as gcs from "./api/gcs";
import { config } from "./config";
import { parseUrl } from "./utils";

export const restore = async (): Promise<void> => {
  if (config == null) {
    throw new Error("config is not set");
  }
  const { dbPath, replicaUrl, replicaNamePrefix } = config;

  console.log("restore ...");

  const { hostname: bucketName, pathname } = parseUrl(replicaUrl);
  const prefix = `${pathname}/${replicaNamePrefix}`;
  const files = await gcs.download(bucketName, prefix);
  if (files.length === 0) {
    console.log("no files to restore");
    return;
  }

  const createdAts = files
    .map((file) => parseInt(file.name.split(prefix).pop() || "", 10))
    .filter((n) => !isNaN(n));
  const latest = Math.max(...createdAts);
  const file = files.find((file) => file.name === `${prefix}${latest}`);
  if (file == null) {
    throw new Error("file not found");
  }
  await file.download({ destination: dbPath });

  console.log("restore ok.");
};
