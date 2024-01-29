"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"  //UseSession hook lets us know which user is currently logged in
import { useRouter, useSearchParams } from "next/navigation"
import Form from "@components/Form"

const EditPrompt = () => {
    const router=useRouter();
    const [submitting, setSubmitting] = useState(false);
    const searchParams= useSearchParams();
    const promptId= searchParams.get('id');
    const [post, setPost]= useState({
        prompt: '',
        tag: '',
    })

    useEffect(()=>{
        const getPromptDetails= async()=>{
            const response= await fetch(`/api/prompt/${promptId}`);
            const data= await response.json();
            setPost({prompt: data.prompt, tag: data.tag});

        };
        if(promptId)
        {
          getPromptDetails();
           
        }

    },[promptId])

    const updatePrompt= async(e)=>{
        e.preventDefault();
        setSubmitting(true);
        if(!promptId)
        {
            return alert('Prompt not found!')
        }
        try{
          const response= await fetch(`/api/prompt/${promptId}`,{
            method: 'PATCH',
            body: JSON.stringify({
              prompt: post.prompt,
              tag: post.tag,
            })
          })

          if(response.ok)
          {
            router.push('/');
          }
          else
          {
            console.log('Not Ok Response')
          }

        }
        catch(error){
          console.log(error);

        }
        finally{
          setSubmitting(false);
        }

    }
  return (
    <Form type='Edit' post={post} setPost={setPost} handleSubmit={updatePrompt} submitting={submitting}/>
  )
}

export default EditPrompt
