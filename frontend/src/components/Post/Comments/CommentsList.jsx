import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import CommentVote from "./commentVote";


const CommentsList = ({comments,postId}) => {
  const totalcomments = comments.length
  return (
    <div className="max-h-80 overflow-y-auto space-y-4 pr-2">
          {totalcomments>0 ? comments.map((c, index) => (<motion.div key={index}
                                                   initial={{ opacity: 0,y:8}}
                                                   animate={{ opacity: 1, y:0 }}
                                                   className="flex gap-3 "
                                        >
              <Avatar className="h-9 w-9">
                <AvatarImage  />
                <AvatarFallback>{c.username.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-zinc-300">{c.username}</p>
                <p className="text-sm text-zinc-400 leading-6">{c.text}</p>
                <div className="place-self-start ">
                    <div className="text-white text-xs rounded-full flex flex-row items-center gap-1 ">
                       <CommentVote comment={c} postId={postId}/>
                    </div >
                </div>
              </div>
              
            </motion.div>
          )) : <div className="text-neutral-600"> No comments posted </div>}
        </div>
  )
}



export default CommentsList