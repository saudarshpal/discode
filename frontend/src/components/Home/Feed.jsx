import React from 'react'
import CreatePost from '../Post/CreatePost'
import Post from '../Post/Post'
import { useRecoilValue } from 'recoil'
import { createModalAtom } from '@/store/atoms/Modal'
import { postAtom } from '@/store/atoms/Post'
import CommentSection from '../Post/CommentSection'
import CreateCommunity from './CreateCommunity'
import usePosts from '@/hooks/usePosts'

const Feed = () => {
  const modal = useRecoilValue(createModalAtom)
  let posts = useRecoilValue(postAtom) 
  posts = usePosts() // fetching all the posts
  return (
    <>
       {modal=== "createPost" ? (<CreatePost />) :
             modal==="createCommunity" ? (<CreateCommunity/>):
             modal==="postComment" ? (<CommentSection />) :
             posts.map((post,index)=><Post key={index} post={post}/>) // displaying all the posts
        } 
    </>
  )
}

export default Feed
