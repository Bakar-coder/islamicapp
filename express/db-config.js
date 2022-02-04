const monoose = require("mongoose");
const { MONGO_URI } = require("./_constants.js");

module.exports = async () =>
  await monoose.connect(MONGO_URI, {
    keepAliveInitialDelay: 3000000,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
  });
