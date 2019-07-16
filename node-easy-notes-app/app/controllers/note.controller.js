const Note = require('../models/note.model.js');

const notFound = res => res.status(404).json('404 Not Found');

exports.index = (req, res) => Note.find().then(
    notes => res.status(200).json(notes),
    error => console.error(error)
);

exports.show = (req, res) => Note.findById(req.params.id).then(
    note => res.status(200).json(note),
    error => notFound(res)
);

exports.update = (req, res) =>  Note.findByIdAndUpdate(req.params.noteId, {
    title: req.body.title || "Untitled Note",
    content: req.body.content
}, {new: true}).then(
    note => {
        note = new Note({
            title: req.body.title || 'No title',
            content: req.body.content || 'No content'
        })
        note.save();
        return res.status(201).json(note)
    },
    error => notFound(res)
)

exports.destroy = (req, res) => Note.findById(req.params.id).then(
    note => {
        note.remove();
        return res.status(202).json(note, 'was deleted')
    },
    error => notFound(res)
)

exports.create = (req, res) => {
    const noteParams = {
        title: req.body.title || 'No title',
        content: req.body.content || 'No content'
    }
    Note.create(noteParams).then(
        note => res.status(201).json(note),
        error => res.status(500).json('Can not create')
    )
}
