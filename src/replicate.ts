import * as gcs from "./api/gcs";
import { config } from "./config";
import { parseUrl } from "./utils";

export const replicate = async (): Promise<void> => {
  if (config == null) {
    throw new Error("config is not set");
  }
  const { replicaUrl, dbPath, replicaNamePrefix } = config;

  console.log("replicate ...");

  const { hostname: bucketName, pathname } = parseUrl(replicaUrl);
  const destination = `${pathname}/${replicaNamePrefix + Date.now()}`;
  await gcs.upload(bucketName, dbPath, destination);

  console.log("replicate ok.");
};
