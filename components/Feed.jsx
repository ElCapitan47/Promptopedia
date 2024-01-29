'use client'
import { useEffect, useState } from "react"
import PromptCard from "./PromptCard"



const PromptCardList=({data, handleTagClick})=>{
  return(
    <div className="mt-16 prompt_layout">
      {data.map((post)=>{
           return <PromptCard key={post._id} post={post} handleTagClick={handleTagClick}/>
      })}

    </div>
  )

}
const Feed = () => {
  const [searchText, setSearchText]= useState('');
  const [posts,setPosts]= useState([]);
  useEffect(()=>{
    const fetchPrompts= async()=>{
      try{
        const response= await fetch('/api/prompt');
        const data= await response.json();

        setPosts(data);
      }
      catch(error){
        console.log(error);
      }
      
  
  
    }
    fetchPrompts();
  
  },[])
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
        type='text'
        placeholder='Search for a prompt'
        value={searchText}
        onChange={(e)=>{setSearchText(e.target.value);}}
        required
        className="search_input peer"></input>
      </form>
      <PromptCardList 
      data={posts}
      handleTagClick={()=>{}}/>

     

    </section>
  )
}

export default Feed
