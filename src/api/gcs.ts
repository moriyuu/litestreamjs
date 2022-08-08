import { sleep } from "../utils";

export const upload = async (_name: string) => {
  await sleep(1000);
};

export const download = async (name: string) => {
  await sleep(1000);
  return name;
};
