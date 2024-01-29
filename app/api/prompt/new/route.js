// import { connectToDB } from "@utils/database"
// import Prompt from "@models/prompt";
// export const POST= async(req,res) =>{
//     const {userId, prompt, tag}= await req.json();
//     try{
//         console.log('Hi 1');
//         await connectToDB();  //We connect to db everytime bcoz this is a lambda func and it dies once it does its job
//         console.log('Hi 2');

//         const newPrompt= await Prompt.create({
//             creator: userId,
//             prompt: prompt,
//             tag: tag,

//         });
//         console.log(newPrompt);
//         // const newPrompt= new Prompt({
//         //     creator: userId,
//         //     prompt: prompt,
//         //     tag: tag,
//         // })
//         // await newPrompt.save();

//         return new Response(JSON.stringify(newPrompt),{status: 201});


//     }
//     catch(error){
//         console.log(error);
//         return new Response('Failed to create a new Prompt',{status: 500});


//     }

// }
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { userId, prompt, tag } = await request.json();

    try {
        await connectToDB();
        const newPrompt = new Prompt({ creator: userId, prompt, tag });

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}