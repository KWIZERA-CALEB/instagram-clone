import mongoose from 'mongoose'

const Schema = mongoose.Schema

const postSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
}, {timestamps: true})

const PostModel = mongoose.model('Post', postSchema)

export default PostModel