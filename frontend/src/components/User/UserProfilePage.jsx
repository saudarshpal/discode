import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Banner from '@/assets/Banner.jpg'
import Post from "../Post/Post"
import UserDetails from "./UserDetails"
import axios from "axios"


const UserProfilePage = ({userId}) => {
  const [user,setUser] = useState({})
  const [userPosts,setUserPosts] = useState([])
  const [userCommunities,setUserCommunities] = useState([])
  const authHeader = localStorage.getItem('authHeader')
  const totalposts = userPosts.length
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
  const handleFollow = async()=>{

  }
  const handleDelete = async()=>{

  } 
  useEffect(()=>{
      getUser()
      getUserPosts()
      getUserCommunities()
    },[])
  return (
    <div className="w-full">
        <img src={Banner} alt="" className="relative rounded-2xl w-full h-[40vh]"></img>
        <div className="relative">
            <div className="flex justify-between mt-[-30px] pl-10">
                <div className="flex flex-row items-end gap-2">
                    <Avatar className="h-20 w-20">
                        <AvatarImage />
                        <AvatarFallback>{user.usernmae.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h1 className="text-white text-4xl font-semibold">{user.usernmae}</h1>
                </div>
                <div className="flex flex-row items-end gap-4">
                    <div className=" text-white text-lg font-medium flex items-center gap-1 px-3 py-1 rounded-full border border-neutral-800 hover:shadow hover:shadow-neutral-600 cursor-pointer">
                        Follow 
                    </div>
                    <div className=" text-white text-lg font-medium flex items-center gap-1 px-3 py-1 rounded-full border border-neutral-800 hover:shadow hover:shadow-neutral-600 cursor-pointer" >
                        Delete
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