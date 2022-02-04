const { Router } = require("express");
const { useAdmin } = require("../middlewares/auth");
const {
  createCause,
  deleteCause,
  updateCause,
} = require("../controllers/cause");
const { Cause } = require("../models/Cause");
const router = Router();

const getAddCause = async (_req, res) => {
  res.render("admin/add-cause");
};

const getUpdateCause = async (req, res) => {
  const { id } = req.params;
  const cause = await Cause.findOne({ _id: id });
  res.render("admin/update-cause", { cause });
};

router
  .route("/add-cause")
  .get(useAdmin, getAddCause)
  .post(useAdmin, createCause);

router
  .route("/update-cause/:id")
  .get(useAdmin, getUpdateCause)
  .post(useAdmin, updateCause);

router.route("/delete-cause/:id").post(useAdmin, deleteCause);

router.route("/causes").get(useAdmin, async (_req, res) => {
  return res.render("admin/causes");
});

exports.adminRoutes = router;
