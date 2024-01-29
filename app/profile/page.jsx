"use client"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from "@components/Profile"

const MyProfile = () => {
  const [posts,setPosts]= useState([]);
  const {data:session}= useSession();
  const [isEdited, setIsEdited] = useState(false);
  const router= useRouter();

  useEffect(()=>{
    const fetchPosts= async()=>{
      const response= await fetch(`/api/users/${session?.user.id}/posts`);
      const data= await response.json();
      setPosts(data);
    }
    if(session?.user.id)
    {
      fetchPosts();
    }
    

  },[isEdited])
  const handleEdit=(post)=>{
   
    //we want to redirect user to a new page where he can edit the prompt
    router.push(`/update-prompt?id=${post._id}`)


  }
  const handleDelete=async(post)=>{
    //No need to redirect the user, we can directly delete the prompt from here
    const hasConfirmed= confirm("Are you sure you want to delete this prompt?")
    if(hasConfirmed)
    {
      try{
        await fetch(`/api/prompt/${post._id.toString()}`,
        {method: 'DELETE',
        
        });
        const filteredPosts= posts.filter((p)=>{
          p._id!== post._id;
        })
        setIsEdited(prev=>!prev);

        setPosts(filteredPosts);

      }
      catch(error){
        console.log(error);
      }
    }
    
  }
  return (
    <Profile
    name='My'
    desc='Welcome to my personalized profile page'
    handleEdit= {handleEdit}
    handleDelete={handleDelete}
    data={posts}/>
  )
}

export default MyProfile
