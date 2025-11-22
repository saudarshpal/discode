import express from "express";
import { commentOnPost, createPost, deleteComment, deletePost, getAllcomments, getAllPosts, getPostById, getYourPosts, voteOnComment, voteOnPost} from "../controllers/postController.js";
import { authMiddleware } from "../middlewares/auth.js";
import multer from "multer";

const router = express.Router()

router.use(authMiddleware)

const upload = multer({dest : '/uploads/images/'})
const uploadImages = upload.array('postImages',10)

router.post('/create',uploadImages,createPost) // create a post
router.get('/all',getAllPosts) // get all posts
router.get('/own',getYourPosts) // get your posts
router.get('/:postId',getPostById) // get post by id
router.delete('/delete/:postId',deletePost) // delete a post
router.post('/vote/:postId',voteOnPost) // vote on post
router.post('/comment/:postId',commentOnPost) // comment on post
router.get('/comments/:postId',getAllcomments) // get all comments on post
router.delete('/comment/delete/:postId/:commentId',deleteComment) // delete comment
router.post('/comment/vote/:postId/:commentId',voteOnComment)// vote on comment



export default router;