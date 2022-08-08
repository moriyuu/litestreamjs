export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const parseUrl = (
  url: string
): {
  protocol: string; // e.g. "http:"
  hostname: string; // e.g. "example.com"
  pathname: string; // e.g. "foo"
} => {
  const u = new URL(url);
  return {
    protocol: u.protocol,
    hostname: u.hostname,
    pathname: u.pathname.slice(1),
  };
};
