import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 100,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  picturePath: {
    type: String,
    default: "",
  },
  location: String,
  occupation: String,
  savedPosts: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
