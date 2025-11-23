import { SearchIcon } from "lucide-react"
import CommunityProfileCard from "@/components/Home/CommunityProfileCard"
import axios from "axios"
import { useEffect, useState } from "react"

const CommunityBar = () => {
  const [communities,setCommunities] = useState([])
  const authHeaders = localStorage.getItem('authHeader')
  const fetchCommunities = async()=>{
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/community/bulk`,{
      headers :{
        'Authorization' : authHeaders
      }
    })
    setCommunities(response.data.communities)
  }
  useEffect(()=>{
    fetchCommunities()
  },[])
  return (
    <div className=" h-full rounded-lg">
        <div className="w-full flex flex-col items-center">
            <div className="bg-neutral-600 flex items-center gap-1 m-3 rounded-full px-3 py-2 w-full ">
                <SearchIcon size={20} color="gray"/>
                <input type="text" placeholder="Search Communities " className=" text-white px-1 w-full outline-none rounded-full placeholder:text-sm "></input>
            </div>
            <div className="w-full flex flex-col gap-2">
              {
                communities.map((c,index)=> <CommunityProfileCard key={index} community={c} />)
              }
            </div>
            
          </div>
    </div>
  )
}

export default CommunityBar