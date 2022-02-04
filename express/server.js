"use strict";
require("dotenv/config");
require("joi-objectid");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const flash = require("connect-flash");
const morgan = require("morgan");
const messages = require("express-messages");
const { join } = require("path");
const { CORS_ORIGIN, PORT } = require("./_constants");
const { useSession } = require("./middlewares/session");
const { useUser } = require("./middlewares/user");
const { useUpload } = require("./middlewares/upload");
const { homeRoutes } = require("./routes");
const { adminRoutes } = require("./routes/admin");
const { authRoutes } = require("./routes/auth");
const { createStaticPaths } = require("./utils/paths");
const { logger } = require("./utils/logger");
const { database } = require("./db-config");
const { createWriteStream } = require("fs");
const { renderFile } = require("ejs");
const { globalMiddleware } = require("./middlewares/global");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");

createStaticPaths();

const accessLogStream = createWriteStream(join(__dirname, "access_log.log"), {
  flags: "a",
});

app
  .disable("x-powered-by")
  .set("trust proxy", 1)
  .set("view engine", "html")
  .engine("html", renderFile)
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cors({ origin: CORS_ORIGIN, credentials: true }))
  .use(express.static(__dirname + "/public"))
  .use("/static", express.static(__dirname + "/static"))
  .use(morgan("combined", { stream: accessLogStream }))
  .use(helmet())
  .use(useSession)
  .use(flash())
  .use(function (req, res, next) {
    res.locals.messages = messages(req, res);
    next();
  })
  .use(globalMiddleware)
  .use(useUser)
  .use(useUpload)
  .use("/", homeRoutes)
  .use("/admin", adminRoutes)
  .use("/auth", authRoutes)
  .use((_, res, next) => {
    res.render("404", { title: "404 Page Not Found", pageName: "404 Error" });
    next();
  })
  .use(compression());

module.exports = app;
module.exports.handler = serverless(app);
