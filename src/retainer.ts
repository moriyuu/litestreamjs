import * as gcs from "./api/gcs";
import { config } from "./config";
import { parseUrl } from "./utils";

export const retainer = async (): Promise<void> => {
  if (config == null) {
    throw new Error("config is not set");
  }
  const { replicaUrl, replicaNamePrefix, retention } = config;

  console.log("retainer ...");

  const { hostname: bucketName, pathname } = parseUrl(replicaUrl);
  const prefix = `${pathname}/${replicaNamePrefix}`;
  const files = await gcs.download(bucketName, prefix);
  const createdAts = files
    .map((file) => parseInt(file.name.split(prefix).pop() || "", 10))
    .filter((n) => !isNaN(n));
  const now = Date.now();
  const createdAtsToDelete = createdAts.filter(
    (createdAt) => now - createdAt >= retention
  );
  const fileNamesToDelete = createdAtsToDelete.map(
    (createdAt) => `${prefix}${createdAt}`
  );

  await Promise.all(
    fileNamesToDelete.map(async (fileName) => {
      await gcs.deleteFile(bucketName, fileName);
    })
  );

  console.log("retainer ok.");
};
