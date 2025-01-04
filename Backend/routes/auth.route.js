import express from 'express'
import { signUpUser, loginUser, logoutUser, getLoggedInUser, userPublicProfileInfo, updateProfileImage, updateProfileDetails } from '../controllers/auth.controller.js'
import { protectRoute } from '../middlewares/auth.middleware.js'


const router = express.Router()

router.post('/auth/signup', signUpUser)
router.post('/auth/login', loginUser)
router.post('/auth/logout', logoutUser)
router.get('/auth/loggedin-user', protectRoute, getLoggedInUser)
router.post('/auth/update-profile-image', protectRoute, updateProfileImage)
router.post('/auth/update-profile-info', protectRoute, updateProfileDetails)
router.get('/auth/public-profile/:username', userPublicProfileInfo)

export default router