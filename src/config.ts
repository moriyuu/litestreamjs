import { parseUrl } from "./utils";

type Config = {
  replicaUrl: string | null;
  /** default: 'db-' */
  replicaNamePrefix: string;
  /** default: 86400000 (24 hours) */
  snapshotInterval: number;
};

export let config: Config = {
  replicaUrl: null,
  replicaNamePrefix: "db-",
  snapshotInterval: 86400000,
};

export const setup = (c: Partial<Config>) => {
  if (c.replicaUrl == null) {
    throw new Error("replicaUrl is required");
  }
  parseUrl(c.replicaUrl); // validate URL
  config = { ...config, ...c };
};
