module.exports = (app) =>{
    const notes = require('../controllers/note.controller.js')

    // CREATE new note
    app.post('/notes', notes.create)
    
    // GET all notes
    app.get('/notes', notes.findAll)

    // GET note using id
    app.get('/notes/:noteId', notes.findOne)

    // UPDATE a note
    app.put('/notes/:noteId', notes.update)

    // DELETE a note
    app.delete('/notes/:noteId', notes.delete)
}