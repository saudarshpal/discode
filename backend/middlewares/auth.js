import jwt from 'jsonwebtoken';
import { JWT_TOKEN } from "../config.js";

    
export const authMiddleware = (req, res, next) => {
   const authHeader = req.headers.authorization
   if(!authHeader || !authHeader.startsWith('Bearer')){
         return res.status(401).json({msg : "Unauthorized"})    
    }
    const token = authHeader.split(' ')[1]
    try{
        const decoded = jwt.verify(token,JWT_TOKEN)
        req.userId = decoded.userId
        next()
    }catch(err){
        console.log(err)
        return res.status(401).json({msg : "Unauthorized"})
    }
};