const litestreamjs = require("../dist");

const replicaUrl = "gs://litestreamjs-sandbox/sb0809";

const main = async () => {
  litestreamjs.setup({
    replicaUrl,
    snapshotInterval: 2000,
  });

  // await litestreamjs.replicate();
  const file = await litestreamjs.restore();
  console.log("file :>> ", file, file.name);
};

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
