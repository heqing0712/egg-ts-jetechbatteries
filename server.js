// server.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const egg = require('egg');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const workers = Number(process.argv[2] || require('os').cpus().length);
egg.startCluster({
  workers,
  baseDir: __dirname,
});
