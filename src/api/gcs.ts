import { Storage, File } from "@google-cloud/storage";

const storage = new Storage();

/**
 * @param bucketName
 * @param filePath local file path + name
 * @param destination remote file path + name
 */
export const upload = async (
  bucketName: string,
  filePath: string,
  destination: string
) => {
  await storage.bucket(bucketName).upload(filePath, {
    destination,
  });
};

export const download = async (
  bucketName: string,
  prefix: string
): Promise<File[]> => {
  const files = (
    await storage.bucket(bucketName).getFiles({
      autoPaginate: false,
      prefix,
    })
  )[0];
  return files;
};

export const deleteFile = async (bucketName: string, fileName: string) => {
  await storage.bucket(bucketName).file(fileName).delete();
};
