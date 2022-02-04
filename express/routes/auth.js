const { Router } = require("express");
const { logout, updateProfile } = require("../controllers/user");
const { useAuth } = require("../middlewares/auth");

const router = Router();

router.get("/user", async (req, res) => {
  if (!req.session.userId && !req.user) return res.json(null);
  let user = await req.user.getUser();
  user.cart = user.cart.items;
  return res.json(user);
});

router.route("/").get((_req, res) => res.render("authentication"));
router.route("/logout").post(logout);
router.route("/update-profile").post(useAuth, updateProfile);
exports.authRoutes = router;
