import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI';
import api from "../lib/axios";
import toast from "react-hot-toast"
import NoteCard from '../components/NoteCard';
import NotesNotFound from '../components/NotesNotFound';
const HomePage = () => {
  const [isRatelimited,setRateLimited]  = useState(false);
  const [notes,setNotes] = useState([]);
  const [loading,setLoading] = useState(true);
useEffect(() =>{
  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      console.log(res.data);
      setNotes(res.data);
      setRateLimited(false)
      setLoading(false);
    } catch (error) {
      console.log("Error fetching notes", error);
      if(error.response.status ===429){
        setRateLimited(false);
      }
      else{
        toast.error("Failed to load notes");
      }
      setLoading(false);
    }
    finally{
      setLoading(false);
    }
  }
  fetchNotes();
},[]);

  return (
    <div className='min-h-screen'>
      <Navbar/>
      {isRatelimited && <RateLimitedUI />}
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading Notes...</div>}
        
        {/* {notes.length=== 0 && !RateLimited && <NotesNotFound />} */}
        
        {notes.length>0 && !isRatelimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note)=>
            <NoteCard key = {note._id} note = {note} setNotes = {setNotes}/>
          )}
          </div>
        )}
      </div>
      </div>
  )
}

export default HomePage
