import PostModel from "../models/posts.model.js";

export const createPost = (req, res) => {
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

        const newPost = PostModel.create(postInfo) 
        
        if(!newPost) return res.status(400).json({ message: "Failed to create post" });

        return res.status(201).json({ message: "Post created" });
        
    } catch(error) {
        console.log("Error in auth controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const fetchAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find()
        if (!posts) return res.status(400).json({ message: "Error occurred" });
        return res.status(200).json({ posts: posts });
    } catch(error) {
        console.log("Error in auth controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const fetchLoggedInPosts = async (req, res) => {
    const userId = req.user._id;
    try {
        const posts = await PostModel.find({ userId: userId })
        if (!posts) return res.status(400).json({ message: "Error occurred" });
        return res.status(200).json({ posts: posts });
    } catch(error) {
        console.log("Error in auth controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}