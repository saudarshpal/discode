import express from "express";
import { createProfile,followUser, getCommunities, getUserById, getUsers, Signin, Signup, unSubscribe,Verify } from "../controllers/userControllers.js";
import { upload } from "../config.js";
import { subscribe } from "diagnostics_channel";
import { authMiddleware } from "../middlewares/auth.js";



const router = express.Router()


const profileUploads = upload.fields([{name : 'avatar', maxcount : 1},{name : 'banner', maxcount : 1}])


router.post('/signup',Signup)
router.get('/verify/:verificationToken',Verify)
router.post('/signin',Signin)
router.get('/u',authMiddleware,getUserById)
router.get('/bulk',authMiddleware,getUsers)
router.post('/settings/profile',authMiddleware,profileUploads,createProfile)
router.post('/:userId',authMiddleware,followUser)
router.delete('/:userId',authMiddleware,followUser)
router.post('/:communityId',authMiddleware,subscribe)
router.delete('/:communityId',authMiddleware,unSubscribe)
router.get('/coummunity/',authMiddleware,getCommunities)




export default router