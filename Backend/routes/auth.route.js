import express from 'express'
import { signUpUser, loginUser, logoutUser, getLoggedInUser } from '../controllers/auth.controller.js'
import { protectRoute } from '../middlewares/auth.middleware.js'


const router = express.Router()

router.post('/auth/signup', signUpUser)
router.post('/auth/login', loginUser)
router.post('/auth/logout', logoutUser)
router.get('/auth/loggedin-user', protectRoute, getLoggedInUser)

export default router