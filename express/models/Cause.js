const monoose = require("mongoose");

const causeSchema = new monoose.Schema({
  user: {
    type: monoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  totalAmount: Number,
  raisedAmount: Number,
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

exports.Cause = monoose.model("Cause", causeSchema);
