import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
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
    comment: {
      type: Array,
      default: [],
    },
    description: {
      type: String,
      maxLength: 2000,
    },
    userPicturePath: String,
    picturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
