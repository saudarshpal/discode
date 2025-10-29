import express from 'express'
import multer from 'multer'
import { addModerator, createCommunity, deleteCommunity, getCommunities, getCommunityById, getcommunityPosts } from '../controllers/communityControllers.js'
import { authMiddleware } from '../middlewares/auth.js'


const router = express.Router()
router.use(authMiddleware)

const upload =  multer({dest :'uploads/'})
const uploadBanner = upload.single('communityBanner')


router.get('/bulk',getCommunities)
router.put('/create',uploadBanner,createCommunity)
router.get('/:communityId',getCommunityById)
router.get('/:communityId/posts',getcommunityPosts)
router.delete('/:communityId',deleteCommunity)
router.put('/add-moderator/:communityId/:moderatorId',addModerator)

export default router