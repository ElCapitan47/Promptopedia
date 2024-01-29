import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//GET
export const GET= async(req,{params})=>{
    const prompt_id= params.id;
    try{
        await connectToDB();
        const prompt= await Prompt.findById(prompt_id).populate('creator');
        if(!prompt)
        {
            return new Response('Prompt not found', {status:404})
        }
        return new Response(JSON.stringify(prompt), {status:200});

    }
    catch(error)
    {
        return new Response("Failed to get the post",{status:500});
    }
   
}

//PATCH
export const PATCH= async(req,{params})=>{
    const {prompt, tag}= await req.json();
    const prompt_id= params.id;
    try{
        await connectToDB();
        const existingPrompt= await Prompt.findById(prompt_id).populate('creator');
        if(!existingPrompt)
        {
            return new Response('Prompt does not exist',{status: 404});
        }
        existingPrompt.prompt=prompt;
        existingPrompt.tag= tag;
        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt),{status:200});

    }
    catch(error)
    {
        return new Response('Failed to update the post', {status: 500})
    }

}
//DELETE

export const DELETE=async(req,{params})=>{
    const prompt_id= params.id;
    try{
        await connectToDB();
        // const prompt= await Prompt.findById(prompt_id);
        // if(!prompt)
        // {
        //     return new Response('Prompt does not exist',{status:400});
        // }
        // await Prompt.deleteOne(prompt_id);
        await Prompt.findByIdAndDelete(prompt_id);
        return new Response('Prompt deleted successfully',{status:200})
        
    }
    catch(error)
    {
        return new Response('Failed to delete',{status:500});
    }
}