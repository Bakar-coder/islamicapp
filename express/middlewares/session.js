const session = require("express-session");
const sesionStore = require("connect-mongodb-session");
const { __prod__, SECRET_KEY, DOMAIN, MONGO_URI } = require("../_constants.js");
const MongoDBStore = sesionStore(session);

exports.useSession = session({
  name: "qid",
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 3600000 * 72,
    secure: !!DOMAIN,
    domain: DOMAIN ? DOMAIN : undefined,
  },
  store: new MongoDBStore({ uri: MONGO_URI, collection: "sessions" }),
});
