import * as gcs from "./api/gcs";

export const restore = async () => {
  console.log("restore ...");
  const dbName = "mydb";
  const data = await gcs.download(dbName);
};
