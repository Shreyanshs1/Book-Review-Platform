import express from 'express';
import {
  getAllBooks,
  getBookById,
  addBook,
} from '../controllers/bookController.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', addBook); // No auth yet

export default router;