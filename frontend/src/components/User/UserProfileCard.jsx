import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import axios from "axios"
import { useNavigate } from "react-router-dom"




const UserProfileCard = ({userId}) => {
  const [user,setUser] = useState({})
  const authHeader = localStorage.getItem('authHeader')
  const getUser = async()=>{
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/${userId}`,{
        headers : {
            'Authorization' : authHeader
        }
    })
    setUser(response.data.user)
  }
  useEffect(()=>{
    getUser()
  })
  const navigate = useNavigate()
  return (
        <Card className='bg-black flex flex-row itmes-center p-2 border-none shadow-none gap-2 cursor-pointer hover:shadow hover:shadow-neutral-600  '>
            <Avatar onClick={()=>navigate(`/user/${userId}`)}>
                <AvatarImage src={user.profile.avatar} />
                <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="text-white   font-normal pt-1/2 pt-1">{user.username}</h3>
        </Card>
  )
}

export default UserProfileCard