"use strict";
const app = require("./express/server");
const { logger } = require("./express/utils/logger");
const { PORT } = require("./express/_constants");
const database = require("./express/db-config");

app.listen(PORT, () => {
  database().then(() => logger.info(`connected to mongodb database`));
  logger.info(`server running on port:${PORT}`);
});
