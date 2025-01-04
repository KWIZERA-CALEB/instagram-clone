import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 8
    },
    bio: {
        type: String,
        default: "No bio added yet"
    },
    fullName: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        default: 'https://twikaapp.netlify.app/images/avatar.jpg'
    },
    likedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
    ],
}, {timestamps: true})

const UserModel = mongoose.model('User', userSchema)

export default UserModel