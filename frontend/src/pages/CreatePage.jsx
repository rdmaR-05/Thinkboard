import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { ArrowLeftIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/axios';
const CreatePage = () => {
  const [title,seTitle] = useState("");
  const [content,setContent] = useState("");
  const [loading,setLoading] = useState(false);
  const navigate  = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!title.trim() && !content.trim()){
      toast.error("All fields are required");
    }
    else if(!title.trim()){
      toast.error("Title is required");
    }
    else if(!content.trim()){
      toast.error("Content is required");
    }
    setLoading(true);
    try {
      await api.post("/notes",{
        title,
        content
      });
      toast.success("Note Created Successfully!!!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create note");
    }
    finally{
      setLoading(false);
    }

  }
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-2-w-2xl mx-auto'>
          <Link to={"/"} className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className= 'size-5' />
            Back to Notes
          </Link>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input 
                  type='text'
                  placeholder='Note Title'
                  className='input input-bordered'
                  value={title}
                  onChange={(e)=> seTitle(e.target.value)} />
                </div>

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Content</span>
                  </label>
                    <textarea
                    placeholder='Write your note here...'
                    className='textarea textarea-bordered h-32'
                    value={content}
                    onChange={(e) => setContent(e.target.value)} />
                </div>

                <div className="card-actions justify-end">
                  <button type='submit' className='btn btn-primary' disabled={loading}>
                    {loading ? "Creating...": "Create Note"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage;
