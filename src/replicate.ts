import * as gcs from "./api/gcs";

export const replicate = async () => {
  console.log("replicate ...");
  const db = "data,foo,bar";
  await gcs.upload(db);
};
