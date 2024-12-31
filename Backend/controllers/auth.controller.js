import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";

export const signUpUser = async (req, res) => {
    const { username, email, password, fullName } = req.body
    try {
        if (!username || !email || !password || !fullName) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if(password.length < 8) {
            return res.status(400).json({ message: "Password must be atleast 8 characters" });
        }

        const isEmailUnique = await UserModel.findOne({ email })

        if (isEmailUnique) return res.status(400).json({ message: "Email is taken" });

        const isUsernameUnique = await UserModel.findOne({ username })

        if (isUsernameUnique) return res.status(400).json({ message: "Username is taken" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
            fullName,
        });

        if (newUser) {
            await newUser.save();
            return res.status(201).json({
                message: "You are registered"
            })
        } else {
            return res.status(400).json({ message: "Invalid user data" });
        }

    } catch(error) {
        console.log("Error in auth controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
    
      if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const user = await UserModel.findOne({ username });
  
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const isPasswordCorrect = await bcrypt.compare(password, user.password);


      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      generateToken(user._id, res);
  
      return res.status(200).json({
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        message: "Logged in successfully",
        joined: user.createdAt
      });
    } catch (error) {
        console.log("Error in auth controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logoutUser = (req, res) => {
    try {
      res.cookie("jwt", "", { maxAge: 0 });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in auth controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getLoggedInUser = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch(error) {
        console.log("Error in auth controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}