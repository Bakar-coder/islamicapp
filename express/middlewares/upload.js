const upload = require("express-fileupload");
const { resolve } = require("path");
const { __prod__ } = require("../_constants.js");

exports.useUpload = upload({
  safeFileNames: true,
  preserveExtension: true,
  useTempFiles: true,
  tempFileDir: resolve("temp"),
  debug: !__prod__,
  parseNested: true,
});
