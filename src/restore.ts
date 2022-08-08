import * as gcs from "./api/gcs";
import { config } from "./config";
import { parseUrl } from "./utils";

export const restore = async () => {
  const { replicaUrl, replicaNamePrefix } = config;
  if (replicaUrl == null) {
    throw new Error("replicaUrl is not set");
  }

  console.log("restore ...");
  const { hostname: bucketName, pathname } = parseUrl(replicaUrl);
  const prefix = `${pathname}/${replicaNamePrefix}`;
  const files = await gcs.download(bucketName, prefix);
  const createdAts = files
    .map((file) => parseInt(file.name.split(prefix).pop() || "", 10))
    .filter((n) => !isNaN(n));
  const latest = Math.max(...createdAts);
  const file = files.find((file) => file.name === `${prefix}${latest}`);
  if (file == null) {
    throw new Error("file not found");
  }
  return file;
};
