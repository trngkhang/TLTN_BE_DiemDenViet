import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    basicAuth: {
      username: { type: String },
      password: { type: String },
    },
    googleAuth: {
      UID: { type: String },
    },
    avatar: {
      type: String,
      required: true,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true, minimize: false, strict: false }
);

// Custom validation to require at least one authentication method
UserSchema.pre("validate", function (next) {
  if (!this.basicAuth.username && !this.googleAuth.UID) {
    return next(new Error("User must have either basicAuth or googleAuth."));
  }
  next();
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
