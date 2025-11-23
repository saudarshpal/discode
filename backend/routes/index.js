import express from 'express';
import userRouter from './userRoutes.js'
import communityRouter from './communityRoutes.js'
import postRouter from './postRoutes.js'


const router = express.Router()

router.use('/user',userRouter);
router.use('/community',communityRouter)
router.use('/post',postRouter)


export default router