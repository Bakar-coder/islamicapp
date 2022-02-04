const monoose = require("mongoose");

const userSchema = new monoose.Schema({
  googleID: String,
  twitterID: String,
  facebookID: String,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String, required: true },
  admin: { type: Boolean, default: false },
  volunteer: { type: Boolean, default: false },
  password: { type: String, required: true, min: 8, max: 25 },
  status: { type: String, required: true, default: "active" },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

userSchema.methods.generateUser = function () {
  return {
    googleID: this.googleID ? this.googleID : undefined,
    twitterID: this.twitterID ? this.twitterID : undefined,
    facebookID: this.facebookID ? this.facebookID : undefined,
    firstName: this.firstName,
    lastName: this.lastName,
    username: this.username,
    email: this.email,
    avatar: this.avatar,
    status: this.status,
    verified: this.verified,
    createdAt: this.createdAt,
  };
};

exports.User = monoose.model("User", userSchema);
