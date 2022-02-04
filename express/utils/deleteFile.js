const { readFile, unlink } = require("fs");
const { resolve } = require("path");

exports.deleteFile = (filePath) =>
  readFile(
    resolve(filePath),
    (_, file) =>
      file &&
      unlink(resolve(filePath), (ex) => {
        if (ex) throw ex;
      })
  );
