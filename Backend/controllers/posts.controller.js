import PostModel from "../models/posts.model.js";
import UserModel from "../models/user.model.js"

export const createPost = async (req, res) => {
    const { description, color } = req.body
    const userId = req.user._id;
    try {

        if (!description || !color) {
            return res.status(400).json({ message: "All Fields are required" });
        }

        const postInfo = {
            userId: userId,
            description: description,
            color: color,
        };

        const newPost = await PostModel.create(postInfo) 
        
        if(!newPost) return res.status(400).json({ message: "Failed to create post" });

        return res.status(201).json({ message: "Post created" });
        
    } catch(error) {
        console.log("Error in auth controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const fetchAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find().sort({ createdAt: -1 }).populate("userId", "username profileImage").exec()
        if (!posts) return res.status(400).json({ message: "Error occurred" });
        return res.status(200).json({ posts: posts });
    } catch(error) {
        console.log("Error in auth controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const likePost = async (req, res) => {
    const { id: postId } = req.params
    const userId = req.user._id;
    try {
        const updatedPost = await PostModel.findByIdAndUpdate(
            postId,
            { $inc: { likes: 1 } },
            { new: true }
        )

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await UserModel.findByIdAndUpdate(
            userId,
            { $addToSet: { likedPosts: postId } },
            { new: true }
        );
      
        res.status(200).json({ message: 'Post liked successfully', post: updatedPost });
    } catch(error) {
        console.log("Error in auth controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const disLikePost = async (req, res) => {
    const { id: postId } = req.params
    const userId = req.user._id;
    try {
        const updatedPost = await PostModel.findByIdAndUpdate(
            postId,
            { $inc: { likes: -1 } },
            { new: true }
        )

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await UserModel.findByIdAndUpdate(
            userId,
            { $pull: { likedPosts: postId } },
            { new: true }
        );
      
        res.status(200).json({ message: 'Post disliked successfully', post: updatedPost });
    } catch(error) {
        console.log("Error in auth controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const fetchLoggedInPosts = async (req, res) => {
    const userId = req.user._id;
    try {
        const posts = await PostModel.find({ userId: userId }).sort({ createdAt: -1 })
        if (!posts) return res.status(400).json({ message: "Error occurred" });
        return res.status(200).json({ posts: posts });
    } catch(error) {
        console.log("Error in auth controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}