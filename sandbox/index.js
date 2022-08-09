const litestreamjs = require("../dist");

const config = {
  replicaUrl: "gs://litestreamjs-sandbox/sb0809",
  dbPath: "/Users/moriyuu/works/moriyuu/litestreamjs/sandbox/foo2.db",
  retention: 5000,
  retentionCheckInterval: 10000, // 10s
  snapshotInterval: 3000,
};

const main = async () => {
  litestreamjs.setup(config);

  await litestreamjs.replicate();
  await litestreamjs.restore();
};

// main()
//   .then(() => {
//     process.exit(0);
//   })
//   .catch((err) => {
//     console.log(err);
//     process.exit(1);
//   });

litestreamjs.setup(config);
litestreamjs.start();
