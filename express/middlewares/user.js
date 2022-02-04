const { User } = require("../models/User");

exports.useUser = async (req, res, next) => {
  if (!req.session.userId && !req.user) return next();
  else {
    let user = await User.findById(req.session.userId);
    if (!user) {
      req.session.destroy(() => res.clearCookie("qid"));
      next();
    }
    req.user = user;
    next();
  }
};
