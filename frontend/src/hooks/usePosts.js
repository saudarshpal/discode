import { postAtom } from "@/store/atoms/post"
import axios from "axios"
import { useEffect } from "react"
import { useRecoilState } from "recoil"

const usePosts = () => {
   const [posts,setPosts] = useRecoilState(postAtom)
   const authHeaders = localStorage.getItem('authHeader')
   const fecthPosts = async()=>{
       const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/post/all`,{
          headers : {
            'Authorization' : authHeaders
          }
       })
       setPosts(response.data.posts)
   }
   useEffect(()=>{
   fecthPosts()
   },[])
   return posts
}

export default usePosts