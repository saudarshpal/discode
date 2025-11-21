import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRecoilState, useRecoilValue} from "recoil";
import { createModalAtom } from "@/store/atoms/Modal";
import {  postIdAtom } from "@/store/atoms/Post";
import { useEffect, useState } from "react";
import CommentsList from "./CommentsList";
import { ArrowRight } from "lucide-react";
import axios from "axios";

const CommentSection =()=>{
  const postId = useRecoilValue(postIdAtom)
  const [modal,setModal] = useRecoilState(createModalAtom)
  const [postcomments,setPostComments] = useState([])
  const [addcomment,setAddComment] = useState()
  const authHeader = localStorage.getItem('authHeader')

  const getPostComments = async()=>{
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/post/comments/${postId}`,{
          headers : {
            Authorization : authHeader
          }
    })
    setPostComments(response.data.comments)
  }
  const CreateComment = async()=>{
       await axios.post( `${import.meta.env.VITE_API_BASE_URL}/post/comments/${postId}`,{content: comment},{
          headers : {
            Authorization : authHeader
        }
      })
  }
  const fetchPostComments = async()=>{
     const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/post/comments/${postId}`,{
          headers : {
            Authorization : authHeader
        }
      })
      setPostComments(response.data.comments)
  }
  useEffect(()=>{
    getPostComments()
    fetchPostComments()
  },[])
  return (
    <>
    {/* add that inseet floating while viewing and creeating comment */}
     {modal==="postComment" &&  <div className="fixed inset-0 flex justify-center items-center z-50">
          {/* Blurred dark overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModal(null)}></div>
           <Card className="relative z-10 bg-neutral-900 border-neutral-800 shadow-neutral-600 rounded-2xl w-135 max-w-2xl p-3">
              <CardHeader className='flex flex-row items-center justify-between'>
                <CardTitle className="text-xl font-semibold text-gray-100">Add Comment</CardTitle>
                  <ArrowRight onClick={()=>setModal(null)}color="white" size={20} className="cursor-pointer"></ArrowRight>
              </CardHeader>   
              <CardContent className="space-y-4">
                  <div className="space-y-3 pb-4 border-b border-neutral-800">
                    <Textarea value={addcomment} onChange={(e)=>setAddComment(e.target.value)} placeholder="Write a comment..."
                              className="bg-neutral-800 border-neutral-700 text-neutral-200 resize-none"/>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={CreateComment}>Comment</Button>
                  </div>
                  <CommentsList comments={postcomments} postId={postId}/>  
              </CardContent>
          </Card>
        </div>}

    </>

  );
}

export default CommentSection
