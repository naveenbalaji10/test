import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: [true, "Email should be unique"],
  },
  username: {
    type: String,
    required: [true, "Email is Required"],
    match: [
      /^[0-9A-Za-z]{6,16}$/,
      "It should contain minimum 6 letters including alphanumerics",
    ],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", userSchema);

export default User;
