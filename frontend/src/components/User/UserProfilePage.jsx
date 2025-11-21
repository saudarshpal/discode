import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Banner from '@/assets/Banner.jpg'
import Post from "../Post/Post"
import UserDetails from "./UserDetails"
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"


const UserProfilePage = ({userId}) => {
  const [user,setUser] = useState({})
  const [userPosts,setUserPosts] = useState([])
  const [userCommunities,setUserCommunities] = useState([])
  const authHeader = localStorage.getItem('authHeader')
//   const totalposts = userPosts.length
  const [follow,setFollow] = useState(false)
  const getUser = async()=>{
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/${userId}`,{
        headers : {
            'Authorization' : authHeader
        }
    })
        setUser(response.data.user)
    }
  const getUserPosts = async()=>{
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/post/user/own`,{
        headers : {
            'Authorization' : authHeader
        }
    })
        setUserPosts(response.data.posts)
    }
  const getUserCommunities = async()=>{
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/community/user/all`,{
        headers : {
            'Authorization' : authHeader
        }
    })
        setUserCommunities(response.data.userCommunities)
    }
  const updateFollow = async()=>{
    //    delay send using throttle
  }
  useEffect(()=>{
      getUser()
      getUserPosts()
      getUserCommunities()
    },[])
  return (
    <div className="w-full">
        <img src={user.profile.banner.url} alt="" className="relative rounded-2xl w-full h-[50vh]"></img>
        <div className="relative">
            <div className="flex justify-between mt-[-30px] pl-10">
                <div className="flex flex-row items-end gap-2">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={`${user.profile.avatar.url}`}/>
                        <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h1 className="text-white text-4xl font-semibold">{user.usernmae}</h1>
                </div>
                <div className="flex flex-row items-end gap-4">
                     <div onClick={()=>setFollow(!follow)} className={`${follow ? "bg-red-600 border border-red-600 hover:shadow hover:shadow-red-300 " : "bg-sky-700 border border-sky-700 hover:shadow hover:shadow-sky-300 "} text-white text-center text-lg font-medium  gap-1 px-3 py-1 rounded-full  cursor-pointer w-25`}>
                        {follow ? "Unfollow" : "Follow"}
                    </div>
                </div>
            </div>  
        </div>
        <div className="flex flex-row mt-8">
            <div className="w-2/3 p-2">
                {userPosts.map((post,index)=><Post key={index} post={post}/>)}
            </div>
            <div className="w-1/3">
                <UserDetails user={user} totalposts={totalposts} userCommunities={userCommunities}/>    
            </div>
        </div>
        
        
    </div>
  )
}

export default UserProfilePage