import express from 'express'
import multer from 'multer'
import { addModerator, createCommunity, deleteCommunity, getCommunities, getCommunityById, getcommunityPosts, updateBanner } from '../controllers/communityControllers.js'
import { authMiddleware } from '../middlewares/auth.js'


const router = express.Router()
router.use(authMiddleware)

const upload =  multer({dest :'uploads/'})
const uploadBanner = upload.single('communityBanner')


router.get('/bulk',getCommunities) //
router.put('/create',createCommunity) //create community
router.put('/create/upload/:communityId',uploadBanner,updateBanner) //update community banner
router.get('/:communityId',getCommunityById)// get community by id
router.get('/:communityId/posts',getcommunityPosts)
router.delete('/:communityId',deleteCommunity)
router.put('/:communityId/add-moderator/:moderatorId',addModerator)

export default router