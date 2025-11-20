import { PlusIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Banner from '@/assets/Banner.jpg'
import CommuntiyDetails from "./CommuntiyDetails"
import Post from "../Post/Post"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"


const CommunityHomePage = () => {
  const {communityId} = useParams()
  const [community,setCommuntiy] = useState({})
  const [communityPosts,setCommunityPosts] = useState([])
  const authHeader  = localStorage.getItem('authHeader')
  const getCommunity = async()=>{
    const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/community/${communityId}`,{
        headers : {
            'Authorization' : authHeader
        }
    })
    setCommuntiy(response.data.community)
  }
  const getCommunityPosts =async()=>{
    const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/community/posts/${communityId}`,{
        headers : {
            'Authorization' : authHeader
        }
    })
    setCommunityPosts(response.data.posts)
  }
  useEffect(()=>{
    getCommunity()
    getCommunityPosts()
  },[])
  return (
    <div className="w-full">
        <img src={Banner} alt="" className="relative rounded-2xl w-full h-[40vh]"></img>
        <div className="relative">
            <div className="flex justify-between mt-[-30px] pl-10">
                <div className="flex flex-row items-end gap-2">
                    <Avatar className="h-20 w-20">
                        <AvatarImage />
                        <AvatarFallback>{community.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h1 className="text-white text-4xl font-semibold">{community.name}</h1>
                </div>
                <div className="flex flex-row items-end gap-4">
                    <div className=" text-white text-lg font-medium flex items-center gap-1 px-3 py-1 rounded-full border border-neutral-800 hover:shadow hover:shadow-neutral-600 cursor-pointer" onClick={()=>setModal("createPost")}>
                        {/* Create<PlusIcon size={22} color="white" className="mt-1"/> either delte community or create post for community */}
                    </div>
                    <div className="text-white text-lg font-medium flex items-center gap-1 px-3 py-1 rounded-full border border-neutral-800 hover:shadow hover:shadow-neutral-600 cursor-pointer" onClick={()=>setModal("createPost")}>
                        {/* Follow follo community handler */}
                    </div>
                </div>
            </div>   
        </div>
        <div className="flex flex-row mt-8">
            <div className="w-2/3 p-2">
                {communityPosts.map((post,index)=><Post key={index} post={post}/>)}
            </div>
            <div className="w-1/3">
                <CommuntiyDetails community={community}/>
            </div>
        </div>
        
        
    </div>
  )
}

export default CommunityHomePage