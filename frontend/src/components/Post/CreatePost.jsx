"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button"
import { X } from "lucide-react";
import { useRecoilState } from "recoil";
import { createModalAtom} from "@/store/atoms/Modal";
import { useState } from "react";
import { useEffect } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import axios from "axios";

const CreatePost=()=> {
  const [modal,setModal] = useRecoilState(createModalAtom)
  const [communities,setCommunities] = useState([])
  const authHeader = localStorage.getItem('authHeader')
  const [post,setPost] = useState({
    title : "",
    content : "",
    community : "",
    postImages : []
  })
  const getUserCommunities = async()=>{
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/community/user/all`,{
      headers : {
        'Authorization' : authHeader
      }
    })
    setCommunities(response.data.userCommunities)
  }
  const handleSelectCommunity = (value) =>{
    if(value) {
      setPost({...post,community : value})
    }
  }

  const handleUploadImages=(e)=>{
    const uplodedimages = Array.from(e.target.files)
    setPost({...post,postImages: uplodedimages})
  }
  const handlePostSubmit = async()=>{
    const form = new FormData()
    form.append("title",post.title);
    form.append("content",post.content)
    form.append("communityName",post.community)
    post.postImages.forEach((img)=>{
      form.append("postImages",img)
    })
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/post/create`,form,{
      headers : {
        'Authorization' : authHeader,
        'Content-Type' : "multipart/form-data"
      }
    })
  }

  useEffect(()=>{
    getUserCommunities() 
  },[])
  const flag = Array.isArray(communities)===true ? true : false
  return (
    <>
      {modal==="createPost" && (
          <Card className="bg-neutral-900 border-neutral-800 shadow-neutral-600 rounded-2xl w-full max-w-2xl">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-xl font-semibold text-gray-100">Create Post</CardTitle>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Title</label>
                <Input value={post.title} onChange={(e)=>setPost({...post,title:e.target.value})} className="bg-neutral-800 border-gray-700 text-white placeholder-gray-500" placeholder="Enter post title"/>
              </div>
              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Description</label>
                <Textarea value={post.content} onChange={(e)=>setPost({...post,content:e.target.value})} className="bg-neutral-800 border-gray-700 text-white placeholder-gray-500" rows={5} placeholder="Write your thoughts..."/>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Community</label>
                <Select  onValueChange={(value)=>handleSelectCommunity(value)} >
                   <SelectTrigger className="text-white bg-neutral-800 rounded-lg border border-gray-700 cursor-pointer w-full">
                     <SelectValue  placeholder="Select Community" />
                   </SelectTrigger>
                   <SelectContent className="text-white bg-neutral-800 rounded-lg border border-gray-700 cursor-pointer" >
                     <SelectGroup>
                      <SelectLabel >Your Communities </SelectLabel>
                      {flag && communities.map(community => <SelectItem key={community._id} value={community.name}>{community.name}</SelectItem>)}
                     </SelectGroup>
                   </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Attach Images</label>
                <Input  type="file" multiple  onChange={(e)=>handleUploadImages(e)} className="file:text-white bg-neutral-800 border-gray-700 text-neutral-500 placeholder-gray-500"/>
              </div>

              <div className="flex justify-end">
                <Button onClick={handlePostSubmit} className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-2 rounded-xl cursor-pointer transition">Post</Button>
              </div>
            </CardContent>
          </Card>
      )}
    </>
  );
}
export default CreatePost