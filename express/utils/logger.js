const { createLogger, format, transports } = require("winston");
// const * as redisTransport = require( 'winston-redis');
const { __prod__ } = require("../_constants.js");
const { combine, timestamp, label, prettyPrint, colorize } = format;

exports.logger = createLogger({
  format: combine(
    label({ label: "logs" }),
    timestamp(),
    prettyPrint(),
    colorize()
  ),
  transports: __prod__
    ? [
        new transports.File({ filename: "errors.log", level: "error" }),
        new transports.File({ filename: "info.log" }),
        new transports.Console({ format: format.simple() }),
        // new redisTransport()
      ]
    : [
        new transports.File({ filename: "errors.log", level: "error" }),
        new transports.File({ filename: "info.log" }),
        new transports.Console({ format: format.simple() }),
      ],
});
