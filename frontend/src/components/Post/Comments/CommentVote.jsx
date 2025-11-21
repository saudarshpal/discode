import useThrottle from "@/hooks/useThrottle"
import axios from "axios"
import { useCallback } from "react"


const CommentVote = ({comment,postId}) => {
    const commentId = comment._id
    const upvotes = comment.votes.upvotes
    const downvotes = comment.votes.downvotes
    const [vote,setVote] = useState('unvote') 
    const [upVoteCount,setUpVoteCount] = useState(upvotes)
    const [downVoteCount,setDownVoteCount] = useState(downvotes)
    const [buttoncolor,setButtonColor] = useState('bg-neutral-600')
    const [downVoteClick, setDownVoteClick] = useState(false)
    const [upVoteClick, setUpVoteClick] = useState(false)
    const authHeader = localStorage.getItem('authHeader')
    const handleUpVote = ()=>{
      if(vote==="unvote"){
        setVote("upvote")
        setUpVoteCount(upVoteCount+1)
        setUpVoteClick(true)
        setDownVoteClick(false)
        setButtonColor('bg-red-500')
        throttledVoteRequest('upvote')
      }
      if(vote==="downvote"){
        setVote("upvote")
        setUpVoteCount(upVoteCount+1)
        setDownVoteCount(downVoteCount-1)
        setUpVoteClick(true)
        setDownVoteClick(false)
        setButtonColor('bg-red-500')
        throttledVoteRequest('upvote')
      }
      if(upVoteClick===true){
        setVote("unvote")
        setUpVoteCount(upVoteCount-1)
        setUpVoteClick(false)
        setDownVoteClick(false)
        setButtonColor('bg-neutral-600')
        throttledVoteRequest('unvote')
      }  
    } 
    const handleDownVote = ()=>{
      if(vote==="unvote"){
        setVote("downvote")
        setDownVoteCount(downVoteCount+1)
        setDownVoteClick(true)
        setUpVoteClick(false)
        setButtonColor('bg-violet-500')
        throttledVoteRequest('downvote')
      }
      if(vote==="upvote"){
        setVote("downvote")
        setDownVoteCount(downVoteCount+1)
        setUpVoteCount(upVoteCount-1)
        setDownVoteClick(true)
        setUpVoteClick(false)
        setButtonColor('bg-violet-500')
        throttledVoteRequest('downvote')
      }
      if(downVoteClick===true){
        setVote("unvote")
        setDownVoteCount(downVoteCount-1)
        setDownVoteClick(false)
        setUpVoteClick(false)
        setButtonColor('bg-neutral-600')
        throttledVoteRequest('unvote')
      }   
    } 
    const handleUpdateVote = useCallback(async(vote)=>{
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/post/comment/${postId}/${commentId}`,{voteType:vote},{
            headers : {
                'Authorization' : authHeader
            }
        }).then(res=>console.log(res.data))
    },[authHeader,commentId,postId]) 
    const throttledVoteRequest = useThrottle(handleUpdateVote, 4000)
  return (
    <>
      <div  className={`${buttoncolor} text-white text-sm rounded-full flex flex-row items-center gap-1 p-1.5`}>
                                          {upVoteClick ? <TbArrowBigUpFilled size={18} color="white" onClick={handleUpVote} className={`rounded-full cursor-pointer`}/>
                                                       : <TbArrowBigUp size={18} color="white" onClick={handleUpVote} className={`rounded-full cursor-pointer`}/>}
                                            {upVoteCount}
                                          {downVoteClick ? <TbArrowBigDownFilled size={18} color="white" onClick={handleDownVote} className={`rounded-full cursor-pointer`}/>
                                                        : <TbArrowBigDown size={18} color="white" onClick={handleDownVote} className={`rounded-full cursor-pointer`} />}
                                            {downVoteCount}
                        </div>
    </>
  )
}

export default CommentVote