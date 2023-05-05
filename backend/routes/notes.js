const express = require('express');
const fetchUser = require('../middleware/fetchusers');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Router 1 to get all the notes
router.get('/fetchNotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }

})

// Router 1 : Add a new Note
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title ').isLength({ min: 5 }),
    body('description', 'Description must be in 5 character').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(500).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const SaveNote = await note.save();
        res.json(SaveNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }


})

// Router 3 : to updsate note

router.put('/update/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //find the note to be updated
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("You are Not Allowed(caution)");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }

})

// Router 3 : to delete note
router.delete('/delete/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        //allow delete if user is real

        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("You are Not Allowed(caution)");
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ Success: "Successfully note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");

    }
    //find the note to be deleted

})


module.exports = router