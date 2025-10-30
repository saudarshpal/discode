import express from "express";
import { createProfile,followUser, getCommunities, getUserById, getUsers, Signin, Signup, subscribe, unfollowUser, unSubscribe,Verify } from "../controllers/userControllers.js";
import multer from "multer";
import { authMiddleware } from "../middlewares/auth.js";



const router = express.Router()


const upload = multer({dest : 'uploads/'})
const uploadMiddleware = upload.fields([{name : 'avatar', maxCount : 1},{name : 'userBanner', maxCount : 1}])


router.post('/signup',Signup)
router.get('/verify/:verificationToken',Verify)
router.post('/signin',Signin)
router.get('/u',authMiddleware,getUserById)
router.get('/bulk',authMiddleware,getUsers)
router.post('/settings/profile',authMiddleware,uploadMiddleware,createProfile)
router.post('/:followUserId',authMiddleware,followUser)
router.delete('/:unfollowUserId',authMiddleware,unfollowUser)
router.post('/:communityId',authMiddleware,subscribe)
router.delete('/:communityId',authMiddleware,unSubscribe)
router.get('/coummunity/',authMiddleware,getCommunities)




export default router