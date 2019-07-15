const Note = require ('../models/note.model.js')

exports.create = (request, response) => {
    if( !request.body.content){
        return response.status(400).send({
            message: "Note content cannot be empty"
        })
    }
    
    const note = new Note({
        title: request.body.title || "untitled note",
        content: request.body.content
    })

    note.save()
    .then( (data) => {response.send(data)} )
    .catch( (error) => {response.status(500).send({
        message: error.message || "Some error occurred while creating the Note"
        }) 
    })

}//END CREATE 

exports.findAll = (request, response) =>{
    Note.find()
    .then( (notes) => {response.send(notes) } )
    .catch( (error) => {response.status(500).send({
        message: error.message || "Some error occurred while creating the Note"
        }) 
    })
}

exports.findOne = (request,response) =>{
    Note.findById(request.params.noteId)
    .then( (note) => {
        if( !note){
            return response.status(404).send({
                message: "Note not found with id " + request.params.noteId
            })
        }
        response.send(note)
    })
    .catch( (error) => {
        if(error.kind === 'ObjectId'){
            return response.status(404).send({
                message: "Note not found with id " + request.params.noteId
            })
        }
        return response.status(500).send({
            message: "Error retrieving note with id" + request.params.noteId
        })
    })
}//END FINDONE ()

exports.update = (request, response) =>{
    if( !request.body.content){
        return response.status(400).send({
            message: "Note content can not be empty"
        })
    }
    Note.findByIdAndUpdate(request.params.noteId, {
        title: request.body.title || "Untitled Note",
        content: request.body.content
    }, {new: true} )
    .then( (note) => {
        if( !note ){
            return response.status(404).send({
                message: "Note not found with id " + request.params.noteId
            })
        }
        response.send(note)
    })
    .catch( (error) => {
        if(error.kind === 'ObjectId'){
            return response.status(404).send({
                message: "Note not found with id " + request.params.noteId
            })
        }
        return response.status(500).send({
            message: "Error updating note with id " + request.params.noteId
        })
    })
}//END UPDATE 

exports.delete = (request, response) =>{
    Note.findByIdAndRemove(request.params.noteId)
    .then( (note) => {
        if( !note){
            return response.status(404).send({
                message: "Note not found with id " + request.params.noteId
            })
        }
        response.send({message: "Note deleted successfully !" })
    })
    .catch( (error) => {
        if(error.kind === 'ObjectId' || error.name === 'NotFound'){
            return response.status(404).send({
                message: "Note not found with id  " + request.params.noteId
            })
        }
        return response.status(500).send({
            message: "Couldn't delete note with id " + request.params.noteId
        })
    })
}