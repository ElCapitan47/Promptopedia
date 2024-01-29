"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"  //UseSession hook lets us know which user is currently logged in
import { useRouter } from "next/navigation"
import Form from "@components/Form"

const CreatePrompt = () => {
    const router=useRouter();
    const {data: session} =useSession(); //to get details of the user in the current session
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost]= useState({
        prompt: '',
        tag: '',
    })

    const createPrompt= async(e)=>{
        e.preventDefault();
        setSubmitting(true);
        try{
          const response= await fetch('/api/prompt/new',{
            method: 'POST',
            body: JSON.stringify({
              prompt: post.prompt,
              tag: post.tag,
              userId: session?.user.id
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
    <Form type='Create' post={post} setPost={setPost} handleSubmit={createPrompt} submitting={submitting}/>
  )
}

export default CreatePrompt
