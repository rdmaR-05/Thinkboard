import note from '../models/note.js'
export async function getallNotes (_,res){
    try{
        const notes = await note.find().sort({createdAt:-1});
        res.status(200).json(notes);
    }
    catch(error){
        console.error("Error in getAllNotescontroller",error);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export async function getNotebyId(req,res) {
    try {
        const NoteId = await note.findById(req.params.id);
        if(!NoteId) return res.status(404).json({message:"Note not found"});
        res.json(NoteId);

    } catch (error) {
        console.error("Error in getNotebyIdcontroller",error);
        res.status(500).json({message:"Internal Server Error"});
    }
    
};

export async function createNote(req,res){
    try {
        const{title,content} = req.body
        const newNote = new note({title,content})
        console.log(title,content);
        const noteSaved = await newNote.save();
        res.status(201).json(noteSaved);
    } catch (error) {
        console.error("Error in createnote controller",error);
        res.status(500).json({message:"Internal server error"});
        
    }
};
export async function updateNote(req,res){
    try {
       const {title,content} = req.body
       const updatedNote = await note.findByIdAndUpdate(req.params.id,{title,content},{new:true});
       if(!updateNote) return res.status(404).json({message:"Note not found"});
       res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updatenote controller",error);
        res.status(500).json({message:"Internal server error"});//-1 isko desc order main sort karega
    }
};

export async function deleteNote (req,res){
    try {
       const deletedNote = await note.findByIdAndDelete(req.params.id);
       if(!deletedNote) return res.status(404).json({message:"Note not found"});
       res.status(200).json({message:"Note deleted successfully"});
    } catch (error) {
        console.error("Error in deletenote controller",error);
        res.status(500).json({message:"Internal server error"});
    }
    
};