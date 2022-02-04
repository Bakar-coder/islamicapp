const { User } = require("../models/User");
const { Cause } = require("../models/Cause");
const { countries } = require("../utils/countries");

exports.globalMiddleware = async function (req, res, next) {
  const user = await User.findOne({ _id: req.session.userId });
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  res.locals.msg = req.flash("msg");
  res.locals.causes = await Cause.find();
  res.locals.user = user ? user : null;
  res.locals.countries = countries;
  res.locals.values = null;
  res.locals.pageName = null;
  res.locals.errors = null;
  next();
};
