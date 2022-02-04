const __prod__ = process.env.NODE_ENV === "production";
exports.__prod__ = __prod__;
exports.DOMAIN = process.env.DOMAIN ? process.env.DOMAIN : undefined;
exports.PORT = process.env.PORT;
exports.PRIVATE_KEY = process.env.PRIVATE_KEY;
exports.CORS_ORIGIN = process.env.CORS_ORIGIN;
exports.SECRET_KEY = process.env.SECRET_KEY;
exports.REDIS_URL = process.env.REDIS_URL;
exports.MONGO_URI = process.env.MONGO_URI;
// : "mongodb://localhost:27017/aico";
// : "mongodb://127.0.0.1:27017/aico";
exports.RESET_PASSWORD_PREFIX = process.env.RESET_PASSWORD_PREFIX;

// braintree
exports.BRAINTREE_MERCHANT_ID = process.env.BRAINTREE_MERCHANT_ID;
exports.BRAINTREE_PUBLIC_KEY = process.env.BRAINTREE_PUBLIC_KEY;
exports.BRAINTREE_PRIVATE_KEY = process.env.BRAINTREE_PRIVATE_KEY;

// mtn momo env
exports.MTN_CALLBACK_HOST = process.env.MTN_CALLBACK_HOST;

exports.MTN_DISBURSEMENTS_USER_SECRET =
  process.env.MTN_DISBURSEMENTS_USER_SECRET;
exports.MTN_DISBURSEMENTS_USER_ID = process.env.MTN_DISBURSEMENTS_USER_ID;
exports.MTN_DISBURSEMENTS_PRIMARY_KEY =
  process.env.MTN_DISBURSEMENTS_PRIMARY_KEY;

exports.MTN_COLLECTIONS_USER_SECRET = process.env.MTN_COLLECTIONS_USER_SECRET;
exports.MTN_COLLECTIONS_USER_ID = process.env.MTN_COLLECTIONS_USER_ID;
exports.MTN_COLLECTIONS_PRIMARY_KEY = process.env.MTN_COLLECTIONS_PRIMARY_KEY;

// passport
exports.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
exports.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
exports.GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

exports.FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
exports.FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;
exports.FACEBOOK_CALLBACK_URL = process.env.FACEBOOK_CALLBACK_URL;

exports.TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
exports.TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;
exports.TWITTER_CALLBACK_URL = process.env.TWITTER_CALLBACK_URL;

exports.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
exports.APP_EMAIL = process.env.APP_EMAIL;
