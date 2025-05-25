import Review from '../models/Review.js';
import Book from '../models/Book.js';

// GET /reviews?bookId=xyz – get all reviews for a book
export const getReviewsByBook = async (req, res) => {
  try {
    const { bookId } = req.query;
    if (!bookId) {
      return res.status(400).json({ message: 'bookId query parameter is required' });
    }

    const reviews = await Review.find({ book: bookId })
      .populate('user', 'name')       // include user name
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
  }
};

// POST /reviews – submit a new review
export const addReview = async (req, res) => {
  try {
    const { userId, bookId, rating, comment } = req.body;
    if (!userId || !bookId || !rating) {
      return res.status(400).json({ message: 'userId, bookId, and rating are required' });
    }

    // Create and save
    const newReview = new Review({
      user: userId,
      book: bookId,
      rating,
      comment,
    });
    const savedReview = await newReview.save();

    // Update book's averageRating
    const allRatings = await Review.find({ book: bookId }).select('rating');
    const avg =
      allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length;

    await Book.findByIdAndUpdate(bookId, { averageRating: avg });

    // Populate user field in response
    await savedReview.populate('user', 'name');

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add review', error: error.message });
  }
};
