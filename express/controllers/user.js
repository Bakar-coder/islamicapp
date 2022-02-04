const argon = require("argon2");
const gravatar = require("gravatar");
const { User } = require("../models/User");
const {
  validateRegister,
  validatePassword,
  validateLogin,
} = require("../validations/user");
const { getErrorField } = require("../utils/errorField");
const { errorMap } = require("../utils/error");

exports.users = async (req, res) => {
  let { cursor, limit } = req.query;
  const realLimit = Math.min(50, limit ? parseInt(limit) : 16);
  const realLimitPlus = realLimit + 1;
  let users = await User.find().sort("-_id").limit(realLimitPlus).exec();

  if (cursor) users = users && users.filter((user) => user._id < cursor);

  return res.json({
    users: users.slice(0, realLimit),
    hasMore: users.length == realLimitPlus,
  });
};

exports.register = async (req, res) => {
  const { firstName, lastName, username, email, password, password2 } =
    req.body;

  const { error } = validateRegister(req);
  const ex = validatePassword(password);
  if (password !== password2)
    return res.status(400).render("register", {
      path: "/register",
      values: {
        ...req.body,
        error: errorMap([
          {
            message: "passwords don't match, try again.",
            field: "confirmPassword",
          },
        ]),
      },
    });

  if (error)
    return res.status(400).render("register", {
      path: "/register",
      values: {
        ...req.body,
        error: errorMap([
          { message: error.details[0].message, field: getErrorField(error) },
        ]),
      },
    });
  if (ex.error)
    return res.status(400).render("register", {
      path: "/register",
      values: {
        ...req.body,
        error: errorMap([
          { message: ex.error.details[0].message, field: "password" },
        ]),
      },
    });
  let user = await User.findOne({ username });

  if (user)
    return res.status(400).render("register", {
      path: "/register",
      values: {
        ...req.body,
        error: errorMap([
          { field: "username", message: `username ${username} is taken` },
        ]),
      },
    });

  user = await User.findOne({ email });

  if (user)
    return res.status(400).render("register", {
      path: "/register",
      values: {
        ...req.body,
        error: errorMap([
          { field: "email", message: `email address ${email} is taken` },
        ]),
      },
    });

  const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
  const hash = await argon.hash(password);
  user = new User({
    avatar,
    firstName,
    lastName,
    username,
    email,
    password: hash,
  });

  await user.save();
  req.session.userId = user.id;
  req.flash(
    "success",
    `We've sent a confirmation email to ${user.email}. verify your account.`
  );
  return res.redirect("/");
};

exports.login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  const { error } = validateLogin(req);
  if (error)
    return res.status(400).render("login", {
      path: "/login",
      values: {
        ...req.body,
        error: errorMap([
          { message: error.details[0].message, field: getErrorField(error) },
        ]),
      },
    });
  let user = await User.findOne({ email: usernameOrEmail });
  if (!user) user = await User.findOne({ username: usernameOrEmail });

  if (!user)
    return res.status(400).render("login", {
      path: "/login",
      values: {
        ...req.body,
        error: errorMap([
          {
            field: "usernameOrEmail",
            message: `Invalid username or email ${usernameOrEmail}`,
          },
        ]),
      },
    });

  const pass = await argon.verify(`${user.password}`, password);
  if (!pass)
    return res.status(400).render("login", {
      path: "/login",
      values: {
        ...req.body,
        error: errorMap([{ field: "password", message: "Invalid password" }]),
      },
    });

  req.session.userId = user.id;
  req.flash("success", `Welcome back ${user.firstName}`);
  return res.redirect("/");
};

exports.logout = async (req, res) => {
  if (req.user?.googleID || req.user?.facebookID || req.user?.twitterID) {
    req.logout();
    return res.json({ success: true });
  } else {
    return req.session.destroy(() => {
      res.clearCookie("qid");
      return res.json({ success: true });
    });
  }
};

exports.updateProfile = async (req, res) => {
  const {
    address,
    city,
    country,
    phone,
    state,
    zip,
    address2,
    company,
    bio,
    roles,
  } = req.body;
  const user = await User.findById(req.session.userId)
    .populate("cart.items.product")
    .exec();
  user.profile.address = address;
  user.profile.city = city;
  user.profile.country = country;
  user.profile.phone = phone;
  user.profile.zip = zip;
  if (address2) user.profile.address2 = address2;
  if (company) user.profile.company = company;
  if (bio) user.profile.bio = bio;
  if (roles) user.profile.roles = roles.split(",");
  if (state) user.profile.state = state;
  user.status = UserStatus.ACTIVE;
  await user.save();
  return res.json({ ...(await user.getUser()), cart: user.cart.items });
};
