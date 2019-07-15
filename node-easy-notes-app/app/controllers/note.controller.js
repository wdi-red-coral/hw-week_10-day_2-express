const Note = require('../models/note.model.js')

// CREATE and save new note
exports.create = (req, res)=>{
    // validate req
    if(!req.body.content){
        return res.status(400).send({
            message: "Note content can not be empty"
        })
    }

    // create 
    const note = new Note({
        title: req.body.title || "untitled note",
        content: req.body.content
    })
    //Save 
    note.save()
        .then( data=>{
            res.send(data)
        })
        .catch(error=>{
            res.status(500).send({
                message: error.message || "Some error occured while creating the Note."
            })
        })
}

// GET all notes
exports.findAll = (req, res)=>{
    Note.find()
        .then(notes=>{
            res.send(notes)
        })
        .catch(error =>{
            res.status(500).send({
                message: error.message || "Some error occured while retrieving notes."
            })
        })
}

// GET a not using id
exports.findOne = (req, res)=>{
    Note.findById(req.params.noteId)
        .then(note=>{
            if(!note){
                return res.status(404).send({
                    message: "Note not found with id" + req.params.noteId
                })
            }
            res.send(note)
        })
        .catch(error=>{
            if(error.kind === 'ObjectId'){
                return res.status(404).send({
                    message: "Note not found with id" + req.params.noteId
                })
            }
            return res.status(500).send({
                message: "Error retrieving note with id" + req.params.noteId
            })
        })
}

// UPDATE
exports.update = (req, res)=>{
    // validate req
    if(!req.body.content){
        return res.status(400).send({
            message: "Note content can not be empty"
        })
    }
    // find and update
    Note.findByIdAndUpdate(
      req.params.noteId,
      {
        title: req.body.title || "untitled note",
        content: req.body.content
      },
      { new: true }
    ) // The {new: true} is to return the modified document to the then() function instead of the original.
      .then(note => {
        if (!note) {
          return res.status(404).send({
            message: "Note not found with id " + req.params.noteId
          });
        }
        res.send(note);
      })
      .catch(error => {
        if (error.kind === "ObjectId") {
          return res.status(404).send({
            message: "Note not found with id " + req.params.noteId
          });
        }
        return res.status(500).send({
          message: "Error updatign note with id " + req.params.noteId
        });
      });
}

// DELETE 
exports.delete = (req, res)=>{
    Note.findByIdAndRemove(req.params.noteId)
        .then(note=>{
            if(!note){
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                })
            }
            res.send({message: "Note deleted successfully!"})
        })
        .catch(error=>{
            if(error.kind === 'ObjectId' || error.name === 'NotFound'){
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                })
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.noteId
            })
        })
}