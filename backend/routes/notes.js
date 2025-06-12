const express = require("express")
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const router = express.Router()
var fetchuser = require("../middleware/fetchuser")

//ROUTER 1: This a /api/notes/fetchallnotes endpoint to fetch all notes of a user
router.get('/fetchallnotes', fetchuser ,async (req,res)=>{
  try{
    const notes = await Note.find({user: req.user.id});
    res.json(notes)
  }catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).json({ error: "Internal Server Error", detail: err.message });
  }
})

//ROUTER 2: This a /api/notes/addnotes endpoint to add notes of a user
router.post('/addnotes',[
  //putting validations and error messages of each field
  body('title', "Must be at atleast 3 char").isLength({ min: 3 }),
  body('description', "Must be at atleast 6 char").isLength({ min: 5 }),
], fetchuser ,async (req,res)=>{
  try{
    const {title , description , tag} = req.body
    const errors = validationResult(req);
    //if there is an error then return bad reqest
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const note = new Note({
      title,description,tag,user:req.user.id
    })
    const saveNote = await note.save()
    res.json(saveNote)
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).json({ error: "Internal Server Error", detail: err.message });
  }
})

//ROUTER 3: This a /api/notes/updateNotes endpoint to update notes of a user
router.put('/updatenotes/:id', fetchuser, async (req,res)=>{
  const {title , description , tag} = req.body
  const newNote = {}
  if(title){newNote.title = title}
  if(description){newNote.description = description}
  if(tag){newNote.tag = tag}
  //finding a note to be updated and update it
  let note = await Note.findById(req.params.id)
  if(!note){
    return res.status(404).send("Note not found")
  }
  if(note.user.toString() !== req.user.id){
    return res.status(401).send("not allowed")
  }
  note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
  res.send(note)
})

//ROUTER 4: This a /api/notes/deleteNotes endpoint to delete notes of a user
router.delete('/deletenotes/:id', fetchuser, async (req,res)=>{
  
  //finding a note to delete it
  let note = await Note.findById(req.params.id)
  if(!note){
    return res.status(404).send("Note not found")
  }
  //check if user owns this note 
  if(note.user.toString() !== req.user.id){
    return res.status(401).send("not allowed")
  }
  note = await Note.findByIdAndDelete(req.params.id);
  res.send({"success":"Note has been deleted","note":note})
})

module.exports = router