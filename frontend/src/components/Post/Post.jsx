  import { MessageCircle } from "lucide-react"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  import {  useSetRecoilState } from "recoil"
  import { createModalAtom } from "@/store/atoms/Modal"
  import { useState } from "react"
  import {TbArrowBigUp,TbArrowBigUpFilled} from 'react-icons/tb'
  import { TbArrowBigDown, TbArrowBigDownFilled,} from "react-icons/tb"
  import { useNavigate } from "react-router-dom"
  import ImageCarousel from "./ImageCarousel"
  


  const Post=({post})=>{
    const userId = post.author
    const communityId = post.community
    const commentCount = post.comments.length
    const upvotes  = post.votes.upvotes
    const downvotes = post.votes.downvotes 
    const images = post.images
    const setModal = useSetRecoilState(createModalAtom)
    const [vote,setVote] = useState('unvote') 
    const [upVoteCount,setUpVoteCount] = useState(upvotes)
    const [downVoteCount,setDownVoteCount] = useState(downvotes)
    const [buttoncolor,setButtonColor] = useState('bg-neutral-600')
    const [downVoteClick, setDownVoteClick] = useState(false)
    const [upVoteClick, setUpVoteClick] = useState(false)
    const navigate = useNavigate()
    const handleUpVote = ()=>{
      if(vote==="unvote"){
        setVote("upvote")
        setUpVoteCount(upVoteCount+1)
        setUpVoteClick(true)
        setDownVoteClick(false)
        setButtonColor('bg-red-500')
      }
      if(vote==="downvote"){
        setVote("upvote")
        setUpVoteCount(upVoteCount+1)
        setDownVoteCount(downVoteCount-1)
        setUpVoteClick(true)
        setDownVoteClick(false)
        setButtonColor('bg-red-500')
      }
      if(upVoteClick===true){
        setVote("unvote")
        setUpVoteCount(upVoteCount-1)
        setUpVoteClick(false)
        setDownVoteClick(false)
        setButtonColor('bg-neutral-600')
      }  
    } 
    const handleDownVote = ()=>{
      if(vote==="unvote"){
        setVote("downvote")
        setDownVoteCount(downVoteCount+1)
        setDownVoteClick(true)
        setUpVoteClick(false)
        setButtonColor('bg-violet-500')
      }
      if(vote==="upvote"){
        setVote("downvote")
        setDownVoteCount(downVoteCount+1)
        setUpVoteCount(upVoteCount-1)
        setDownVoteClick(true)
        setUpVoteClick(false)
        setButtonColor('bg-violet-500')
      }
      if(downVoteClick===true){
        setVote("unvote")
        setDownVoteCount(downVoteCount-1)
        setDownVoteClick(false)
        setUpVoteClick(false)
        setButtonColor('bg-neutral-600')
      }   
    } 
    return (
      <div className="border-solid border-y border-neutral-800 p-1">
          <div className="flex flex-col gap-1 hover:bg-neutral-800 rounded-lg px-4 py-1">
              <div className="flex itmes-center justify-start gap-2">
                  <Avatar className='w-8 h-8 cursor-pointer' onClick={()=>navigate(`/user/${userId}`)}>
                    <AvatarImage />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-wrap gap-1 items-center justify-start ">
                    <span className="text-neutral-500 text-sm font-semibold pt-1">{post.username}</span>
                    {post.community && <span onClick={()=>navigate(`/community/${communityId}`)} className="text-neutral-500 text-sm font-semibold pt-1 hover:text-neutral-300 cursor-pointer">[{post.community}]</span>}
                  </div>  
              </div>
              <h2 className="text-xl font-semibold text-white">{post.title}</h2>
              <div className="w-full text-white/70 text-md "> {post.content} </div>
              {images && <ImageCarousel images={images}/>}
              <div className="flex flex-row itmes-center gap-2 ">
                  <div  className={`${buttoncolor} text-white text-sm rounded-full flex flex-row items-center gap-1 p-1.5`}>
                    {upVoteClick ? <TbArrowBigUpFilled size={18} color="white" onClick={handleUpVote} className={`rounded-full cursor-pointer`}/>
                    : <TbArrowBigUp size={18} color="white" onClick={handleUpVote} className={`rounded-full cursor-pointer`}/>}
                      {upVoteCount}
                    {downVoteClick ? <TbArrowBigDownFilled size={18} color="white" onClick={handleDownVote} className={`rounded-full cursor-pointer`}/>
                    : <TbArrowBigDown size={18} color="white" onClick={handleDownVote} className={`rounded-full cursor-pointer`} />}
                      {downVoteCount}
                  </div>
                  <div onClick={()=>{setModal("postComment")}} className="bg-white/20 text-white text-sm rounded-full flex flex-row items-center gap-1 px-2 cursor-pointer">
                      <MessageCircle size={18} color="white"/>
                      {commentCount}
                  </div>
              </div>
          </div>
      </div>
    )
  }
  export default Post
  