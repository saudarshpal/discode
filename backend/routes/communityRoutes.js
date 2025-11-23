import express from 'express'
import multer from 'multer'
import { addModerator, createCommunity, deleteCommunity, followCommunity, getCommunities, getCommunityById, getcommunityPosts, unFollowCommunity, updateBanner, userCommunities } from '../controllers/communityControllers.js'
import { authMiddleware } from '../middlewares/auth.js'


const router = express.Router()
router.use(authMiddleware)

const upload =  multer({dest :'tmp/uploads/community/'})
const uploadBanner = upload.single('communityBanner')


router.get('/bulk',getCommunities) // get all communities
router.get('/:communityId',getCommunityById)// get community by id
router.get('/user/all',userCommunities) //user Subscribed communities
router.put('/create',createCommunity) //create community
router.put('/create/upload/:communityId',uploadBanner,updateBanner) //update community banner // add this to the create part
router.get('/posts/:communityId/',getcommunityPosts) // get all posts of a community 
router.delete('/delete/:communityId',deleteCommunity) // delete a community
router.post('/follow/:communityId',followCommunity) // follow community 
router.post('/unfollow/:communityId',unFollowCommunity) //unfollow community
router.put('/add-moderator/:communityId/:moderatorId',addModerator)// adds a moderator to community


export default router