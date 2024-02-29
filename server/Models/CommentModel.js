import mongoose, { Schema } from "mongoose"


const CommentSchema = new mongoose.Schema({
    userComment: {
        type : Schema.Types.ObjectId ,
        ref: "Users"
    },
    description: {
        type: String,
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "posts"
    },


},{timestamps: true})

const CommentModel = mongoose.model("Comments" , CommentSchema)

export default postModel