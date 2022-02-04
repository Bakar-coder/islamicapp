const { randomBytes } = require("crypto");
exports.randStr = randomBytes(6).toString("hex");
