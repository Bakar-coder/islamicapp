exports.useAuth = async (req, res, next) => {
  if (!req.session.userId && !req.user) {
    return res.status(403).json({
      error: { authentication: "Unauthenticated request, Login and retry." },
    });
  }
  return next();
};

exports.useVendor = async (req, res, next) => {
  if (!req.session.userId && !req.user) {
    req.flash("error", "Unauthenticated request, Login and retry.");
    return res.status(403).redirect("back");
  }
  const user = req.user;
  if (user) {
    if (!user.vendor) {
      req.flash(
        "error",
        "Unauthorized request. Upgrade to a premium account to continue."
      );
      return res.status(403).redirect("back");
    }
  }
  return next();
};

exports.useAdmin = async (req, res, next) => {
  if (!req.session.userId && !req.user) {
    req.flash("error", "Unauthenticated request, Login and retry.");
    return res.status(403).redirect("back");
  }
  const user = req.user;
  if (!user.admin) {
    req.flash("error", "Unauthorized, Admin access only.");
    return res.status(403).redirect("back");
  }
  return next();
};
