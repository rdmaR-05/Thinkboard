import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import { LoaderIcon,Trash2Icon,ArrowLeftIcon } from 'lucide-react';
import { Link } from 'react-router';

const NoteDetails = () => {
  const[note,setNote] = useState(true);
  const[loading,setLoading] = useState(true);
  const[saving,setSaving] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  console.log({id});
  useEffect(() => {
    const fetchNote = async() => {
        try {
            const res  = await api.get(`/notes/${id}`);
            setNote(res.data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch the note");
        }
        finally{
            setLoading(false);
        }
    };
    fetchNote();
  },[id]);
  const handleDelete = async() => {
    if(!window.confirm("Are you sure you want to delete this note?")) return;
    try {
        await api.delete(`/notes/${id}`);
        toast.success("Note Deleted Successfully");
        navigate("/");
    } catch (error) {
        console.log("Delete Error", error);
        toast.error("Failed to delete note");
        
    }
  };
  const handleSave = async() => {
    if(!note.content.trim() && !note.content.trim()){
        toast.error("Please add title and content");
        return;
    }
    if(!note.title.trim()){
        toast.error("Please add a title");
        return;
    }
    if(!note.content.trim()){
        toast.error("Please add some content");
        return;
    }
    setSaving(true);
    try {
        await api.put(`/notes/${id}`,note)
        toast.success("Note Updated Sucessfully");
        navigate("/");
    } catch (error) {
        console.log("Update error",error);
        toast.error("Failed to update note");
        
    }
    finally{
        setSaving(false)
    }
  };

  if(loading){
    return(
        <div className=' min-h-screen bg-base-200 flex items-center justify-center'>
            <LoaderIcon className=' animate-spin size-10'></LoaderIcon>
        </div>
    )
  }
  return (
    <div className='min-h-screen bg-base-200'>
      <div className="container mx-auto px-4 py-8">
        <div className='max-w-2xl mx-auto'>

        <div className=' flex items-center justify-between mb-6'>
            <Link to={"/"} className='btn btn-ghost mb-6'>
                <ArrowLeftIcon className= 'size-5' />
                Back to Notes
            </Link>
            <button
                className="btn btn-error btn-outline"
                onClick={(e) => handleDelete(e, note._id)}>
                <Trash2Icon className="size-5" />
                Delete Note
            </button>
        </div>
        <div className=' card bg-base-100'>
            <div className=' card-body'>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input 
                  type='text'
                  placeholder='Note Title'
                  className='input input-bordered'
                  value={note.title}
                  onChange={(e)=> setNote({...note,title:e.target.value})} />
                </div>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Content</span>
                  </label>
                    <textarea
                    placeholder='Write your note here...'
                    className='textarea textarea-bordered h-32'
                    value={note.content}
                    onChange={(e) => setNote({...note,content:e.target.value})} />
                </div>
                <div className=' card-actions justify-end'>
                    <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                        {saving? "Saving...":"Save Changes"}
                    </button>
                </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetails;
