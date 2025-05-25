import express from 'express';
import { getReviewsByBook, addReview } from '../controllers/reviewController.js';

const router = express.Router();

router.get('/', getReviewsByBook);
router.post('/', addReview);

export default router;
