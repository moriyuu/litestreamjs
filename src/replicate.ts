import * as gcs from "./api/gcs";
import { config } from "./config";
import { parseUrl } from "./utils";

export const replicate = async () => {
  const { replicaUrl, replicaNamePrefix } = config;
  if (replicaUrl == null) {
    throw new Error("replicaUrl is not set");
  }

  console.log("replicate ...");
  const { hostname: bucketName, pathname } = parseUrl(replicaUrl);
  const filePath = "/Users/moriyuu/works/moriyuu/litestreamjs/sandbox/foo.txt";
  const destination = `${pathname}/${replicaNamePrefix + Date.now()}`;
  await gcs.upload(bucketName, filePath, destination);
};
