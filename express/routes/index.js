const { login, register } = require("../controllers/user.js");
const { contactUs } = require("../controllers/contact.js");
const { Router } = require("express");
const {
  getBraintreeToken,
  payWithBraintree,
} = require("../controllers/payments.js");

const router = Router();
router.route("/braintree-token").get(getBraintreeToken);
router.route("/pay-with-braintree").post(payWithBraintree);

router.route("/").get((_req, res) => res.render("index"));
router
  .route("/about")
  .get((_req, res) => res.render("about", { pageName: "About Us" }));

// router
//   .route("/become-volunteer")
//   .get((_req, res) =>
//     res.render("become-volunteer", { pageName: "Become a volunteer" })
//   );

router
  .route("/donations")
  .get((_req, res) => res.render("donations", { pageName: "Donations" }));

router
  .route("/donate-now")
  .get((_req, res) => res.render("donate-now", { pageName: "Donate now" }));

router
  .route("/contact")
  .get((_req, res) => res.render("contact", { pageName: "Contact Us" }))
  .post(contactUs);

router
  .route("/gallery")
  .get((_req, res) => res.render("gallery", { pageName: "Gallery" }));

// router
//   .route("/volunteers")
//   .get((_req, res) => res.render("volunteers", { pageName: "Volunteers" }));

router
  .route("/login")
  .get((_req, res) => res.render("login", { pageName: "Login" }))
  .post(login);

router
  .route("/register")
  .get((_req, res) => res.render("register", { pageName: "Register" }))
  .post(register);

exports.homeRoutes = router;
