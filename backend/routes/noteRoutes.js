import express from 'express';
import auth from '../middleware/auth.js';
import { createNote, getNote, updateNote, deleteNote } from '../controllers/noteController.js';

const router = express.Router();

router.get('/', auth, getNote);         // Get all notes
router.post('/', auth, createNote);     // Create note
router.put('/:id', auth, updateNote);   // Update
router.delete('/:id', auth, deleteNote); // Delete

export default router;
