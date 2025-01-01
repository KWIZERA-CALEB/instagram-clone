import express from 'express'
import { protectRoute } from '../middlewares/auth.middleware.js'
import { getUsersForSidebar, getMessages, sendMessage } from '../controllers/message.controller.js'

const router = express.Router()

router.get('/message/users', protectRoute, getUsersForSidebar)
router.get('/message/user/:id', protectRoute, getMessages)
router.post('/message/send/user/:id', protectRoute, sendMessage)

export default router