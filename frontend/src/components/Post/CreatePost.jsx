"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react";
import { useRecoilState } from "recoil";
import { createModalAtom} from "@/store/atoms/Modal";
import { useState } from "react";
import { useEffect } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import axios from "axios";

const CreatePost=()=> {
  const [modal,setModal] = useRecoilState(createModalAtom)
  const [communities,setCommunities] = useState([])
  const [selectedCommunity, setSelectedCommmunity] = useState("")
  const [post,setPost] = useState({
    title : "",
    content : "",
    community : "",
    images : []
  })
  const authHeader = localStorage.getItem('authHeader')
  const getUserCommunities = async()=>{
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/community/user/all`,{
          headers : {
            'Authorization' :authHeader
          }
        })
        setCommunities(response.data.userCommunities)
  }
  const handleSelectCommunity = (e) =>{
    if(e.target && e.target.value) {
      setSelectedCommmunity(e.target.value)
      setPost({...post,community : selectedCommunity})
    }
  }
  const handleUploadImages=(e)=>{
    const uplodedimages = Array.from(e.target.files)
    setPost({...post,images : uplodedimages})
  }
  const handlePostSubmit = async()=>{
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/post/create`,{post},{
      headers : {
        'Authorization' : authHeader
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
                <Select>
                   <SelectTrigger className="text-white bg-neutral-800 rounded-lg border border-gray-700 cursor-pointer w-full">
                     <SelectValue value={selectedCommunity} onChange={(e)=>handleSelectCommunity(e)} placeholder="Select Community" />
                   </SelectTrigger>
                   <SelectContent className="text-white bg-neutral-800 rounded-lg border border-gray-700 cursor-pointer" >
                     <SelectGroup>
                      <SelectLabel >Your Communities </SelectLabel>
                      {flag && communities.map(community => <SelectItem key={community._id} value={community.name}>{community.name}</SelectItem>)}
                     </SelectGroup>
                   </SelectContent>
                </Select>
              </div>
               {/* Image upload */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Attach Images</label>
                <label className="flex items-center gap-2 px-4 py-2 bg-neutral-800 rounded-lg border border-gray-700 cursor-pointer hover:bg-neutral-700 transition">
                  <Upload className="w-4 h-4 text-gray-300" />
                  <span className="text-gray-300 text-sm">Upload Images</span>
                  <input  type="file" multiple accept="image/*" onChange={(e)=>handleUploadImages(e)} className="hidden" />
                </label>
              </div>
              {/* Post Button */}
              <div className="flex justify-end">
                <Button onClick={handlePostSubmit} className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-2 rounded-xl transition">Post</Button>
              </div>
            </CardContent>
          </Card>
      )}
    </>
  );
}
export default CreatePost