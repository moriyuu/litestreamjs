import { parseUrl } from "./utils";

type Config = {
  /** database file path + name */
  dbPath: string;
  /** remote storage URL */
  replicaUrl: string;
  /** default: 'db-' */
  replicaNamePrefix: string;
  /** default: 86400000 (24 hours) */
  snapshotInterval: number;
};

export let config: Config | null = null;

export const setup = (c: Partial<Config>) => {
  if (c.dbPath == null) {
    throw new Error("dbPath is required");
  }
  if (c.replicaUrl == null) {
    throw new Error("replicaUrl is required");
  }
  try {
    // validate URL
    parseUrl(c.replicaUrl);
  } catch (err) {
    throw new Error("invalid replicaUrl");
  }

  config = {
    dbPath: c.dbPath,
    replicaUrl: c.replicaUrl,
    replicaNamePrefix: "db-",
    snapshotInterval: 86400000,
    ...c,
  };
};
