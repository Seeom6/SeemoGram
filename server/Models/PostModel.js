import mongoose, { Schema } from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userPost: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    caption: {
      type: String,
      default: "",
    },
    postImage: {
      type: String,
      default: "",
    },
    location: String,
    tags: {
      type: [String],
      default: "",
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: "Users",
      default: [],
    },
    comments: [
      {
        commentBy: {
          type: Schema.Types.ObjectId,
          ref: "Users",
        },
        text: {
          type: String,
          required: true,
        },
        created: { type: Date, default: Date.now },
        userPic: {
            type : String
        },
        userName: {
            type: String
        },
      },
    ],
  },
  { timestamps: true }
);

const postModel = mongoose.model("posts", PostSchema);

export default postModel;
