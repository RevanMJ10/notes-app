import Note from "../models/Notes.js";

export async function createNote (req, res) {
    const { title, content} = req.body;

    const newNote = await Note.create({
        title,
        content,
        userId: req.userId
    });

    res.json(newNote);
}

export async function getNote (req, res) {
    const notes = await Note.find({ userId: req.userId});
    res.json(notes);
}

export async function updateNote (req, res) {
    const { id } = req.params;
    const { title, content} = req.body;

    const note = await Note.findOneAndUpdate(
        { _id: id, userId: req.userId},
        { title, content},
        { new: true}
    );

    res.json(note);
}

export async function deleteNote (req, res) {
    const { id } = req.params;
    
    await Note.findOneAndDelete({ _id: id, userId: req.userId});

    res.json({ message: "Deleted"});
}
