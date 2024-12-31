import express from 'express'
import { createPost, fetchAllPosts, fetchLoggedInPosts } from '../controllers/posts.controller.js'
import { protectRoute } from '../middlewares/auth.middleware.js'

const router = express.Router()


router.post('/posts/create-post', protectRoute, createPost)
router.get('/posts/all', fetchAllPosts)
router.get('/posts/loggedin/posts', protectRoute, fetchLoggedInPosts)

export default router