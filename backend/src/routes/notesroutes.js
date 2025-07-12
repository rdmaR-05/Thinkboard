import express from "express";
import {
  getallNotes,
  createNote,
  updateNote,
  deleteNote,
  getNotebyId
} from "../controllers/notescontroller.js";  

const router = express.Router();

router.get("/", getallNotes);
router.get("/:id", getNotebyId);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
