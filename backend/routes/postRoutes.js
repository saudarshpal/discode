import express from "express";
import { commentOnPost, createPost, deleteComment, getAllcomments, getAllPosts, getPostById, getYourPosts, voteOnPost} from "../controllers/postController.js";
import { deleteModel } from "mongoose";

const router = express.Router()

router.post('/create',createPost)
router.delete('/:postId',deleteModel)
router.get('/:postId',getPostById)
router.get('/all',getAllPosts)
router.get('/own',getYourPosts)
router.post('/:postId/votes',voteOnPost)
router.post('/:postId/comments',commentOnPost)
router.get('/:postId/comments',getAllcomments)
router.delete('/:postId/comments/:commentId',deleteComment)
router.post('/:postId/comments/:commentId/votes',voteOnPost)



export default router;