const { resolve } = require("path");
const { Cause } = require("../models/Cause");

const { deleteFile } = require("../utils/deleteFile");
const { errorMap } = require("../utils/error");
const { paths } = require("../utils/paths");

exports.getcause = async (req, res) => {
  const { id } = req.params;
  const cause = await Cause.findById(id)
    .populate("user", ["avatar", "firstName", "lastName", "username"])
    .exec();
  return res.json(cause);
};

exports.allcauses = async (_req, res) => {
  const causes = await Cause.find()
    .populate("user", ["avatar", "firstName", "lastName", "username"])
    .sort("-_id");
  res.json(causes);
};

exports.paginatedcauses = async (req, res) => {
  let { cursor, limit } = req.query;
  const realLimit = Math.min(50, limit ? parseInt(limit) : 16);
  const realLimitPlus = realLimit + 1;
  let causes = await Cause.find()
    .populate("user", ["avatar", "firstName", "lastName", "username"])
    .sort("-_id")
    .limit(realLimitPlus)
    .exec();

  if (cursor) causes = causes && causes.filter((prod) => prod._id < cursor);

  return res.json({
    causes: causes.slice(0, realLimit),
    hasMore: causes.length == realLimitPlus,
  });
};

exports.createCause = async (req, res) => {
  let opts = req.body;
  let { image } = req.files;

  if (!image)
    return res.status(400).render("admin/add-cause", {
      values: {
        error: errorMap([
          { message: "images field is not allowed empty", field: "image" },
        ]),
        ...req.body,
        page: "Admin Add cause",
      },
    });

  const { title, description, totalAmount, raisedAmount, featured, published } =
    opts;

  let cause = await Cause.findOne({ title });
  if (cause)
    return res.status(400).render("admin/add-cause", {
      values: {
        error: errorMap([
          {
            field: "title",
            message: `cause with title ${title} already exists`,
          },
        ]),
        ...req.body,
        page: "Admin Add cause",
      },
    });

  const imagePath = paths(image);
  image.mv(resolve(imagePath));

  cause = new Cause({
    title: title.toLowerCase(),
    description: description.toLowerCase(),
    totalAmount: totalAmount ? parseFloat(totalAmount) : undefined,
    raisedAmount: raisedAmount ? parseFloat(raisedAmount) : undefined,
    image: imagePath,
    featured: !!featured,
    published: !!published,
    user: req.user._id,
  });
  await cause.save();
  req.flash("success", `${cause.title} has been add successfully.`);
  return res.redirect("/admin/causes");
};

exports.updateCause = async (req, res) => {
  const { id } = req.params;
  let { title, description, totalAmount, raisedAmount, featured, published } =
    req.body;

  let { image } = req.files;

  let cause = await Cause.findById(id).populate("user", [
    "avatar",
    "firstName",
    "lastName",
    "username",
  ]);
  const user = req.user;
  if (!cause)
    return res.status(400).render(`admin/update-cause/${id}`, {
      values: {
        error: errorMap([{ field: "_id", message: `cause does not exists` }]),
        ...req.body,
      },
    });

  if (!user.admin && cause.user.id !== user._id)
    return res.status(403).render(`admin/update-cause/${id}`, {
      values: {
        error: errorMap([{ message: "Forbidden request, access denied." }]),
        ...req.body,
      },
    });

  if (image) {
    deleteFile(cause.image);
    const path = paths(image);
    image.mv(resolve(path));
    cause.image = path;
  }

  cause.description = description.toLocaleLowerCase();

  cause.title = title.toLocaleLowerCase();
  if (totalAmount) cause.totalAmount = parseFloat(totalAmount);
  if (raisedAmount) cause.raisedAmount = parseInt(raisedAmount);
  cause.featured = !!featured;
  cause.published = !!published;
  await cause.save();
  req.flash("success", `${cause.title} has been updated successfully.`);
  return res.redirect("/admin/causes");
};

exports.deleteCause = async (req, res) => {
  const { id } = req.params;
  const cause = await Cause.findById(id);
  const user = req.user;
  if (!cause)
    return res.status(400).json({
      error: errorMap([
        { field: "id", message: `cause with id ${id} not found` },
      ]),
    });
  if (!user.admin && cause.user.id !== user._id)
    return res.status(403).render(`admin/update-cause/${id}`, {
      error: errorMap([{ message: "unauthorized cause removal" }]),
    });

  deleteFile(cause.image);
  await cause.deleteOne({ _id: id });
  req.flash("success", `${cause.title} has been deleted successfully.`);
  return res.redirect("/admin/causes");
};
