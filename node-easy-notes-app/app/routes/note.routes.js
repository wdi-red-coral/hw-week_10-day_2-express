module.exports = app => {
    const notes = require('../controllers/note.controller.js');
    app.get('/notes', notes.index);
    app.get('/notes/:id', notes.show);
    app.delete('/notes/:id', notes.destroy);
    app.put('/notes/:id', notes.update);
    app.post('/notes', notes.create);
}