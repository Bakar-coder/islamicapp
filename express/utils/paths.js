const { mkdir, readdir, readFile, rmdir } = require("fs");
const { resolve } = require("path");
const { logger } = require("./logger.js");
const { randStr } = require("./randomStringGenerator.js");

const staticPaths = [
  "static/images",
  "static/videos",
  "static/audios",
  "static/gallery",
  "static/docs",
];

exports.paths = (file) => {
  const { mimetype, name } = file;
  const [fileType] = mimetype.split("/");
  const mediaPath =
    fileType === "image"
      ? `static/images/${randStr}-${name}`
      : fileType === "video"
      ? `static/videos/${randStr}-${name}`
      : fileType === "audio"
      ? `static/audios/${randStr}-${name}`
      : fileType === "application"
      ? `static/${randStr}-${name}`
      : null;

  return mediaPath ? mediaPath.replace(/\s+/g, "-").toLocaleLowerCase() : "";
};

exports.createStaticPaths = () => {
  setInterval(
    () =>
      readdir(
        resolve("temp"),
        (ex) =>
          !ex &&
          rmdir(resolve("temp"), { recursive: true }, (ex) => {
            if (ex) logger.error(ex.message, ex);
          })
      ),
    1800000
  );

  // return staticPaths.map((path) =>
  //   readFile(
  //     resolve(path),
  //     (ex) =>
  //       ex &&
  //       mkdir(resolve(path), { recursive: true }, (ex) => {
  //         if (ex) logger.error(ex.message, ex);
  //       })
  //   )
  // );
};
