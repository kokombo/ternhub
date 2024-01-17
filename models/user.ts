import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "node:crypto";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Please provide your email address"],
    },

    password: {
      type: String,
      required: [true, "Please provide your email address"],
    },

    profession: {
      type: String,
    },

    image: {
      type: String,
    },

    authMethod: {
      type: String,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      default: "user",
    },

    savedJobs: [{ type: Schema.Types.ObjectId, ref: "Job" }],

    refreshToken: String,

    passwordChangedAt: Date,

    passwordResetToken: String,

    passwordResetTokenExpires: Date,

    emailVerificationToken: String,

    emailVerificationTokenExpires: Date,
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.createEmailVerificationToken = async function () {
  const token = crypto.randomBytes(32).toString("hex");

  this.emailVerificationToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.emailVerificationTokenExpires = Date.now() + 30 * 60 * 1000; //Email verification expires token/link in 30 minutes.

  return token;
};

UserSchema.methods.createPasswordResetToken = async function () {
  const token = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.passwordResetTokenExpires = Date.now() + 15 * 60 * 1000; //Email verification expires token/link in 15 minutes.

  return token;
};

const User = models.User || model("User", UserSchema);

export default User;
