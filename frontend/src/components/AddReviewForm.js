import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { submitReview, fetchReviewsByBook } from '../api/bookApi';

export default function AddReviewForm({ bookId, onReviewAdded }) {
  const { user } = useUser();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert('You must be logged in to submit a review.');

    try {
      setSubmitting(true);
      const review = {
        userId: user._id,
        bookId,
        rating,
        comment,
      };

      await submitReview(review);
      setComment('');
      setRating(5);

      const updatedReviews = await fetchReviewsByBook(bookId);
      onReviewAdded(updatedReviews);
    } catch (error) {
      console.error('Review submission failed:', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-2">Leave a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border rounded px-3 py-2 w-20"
          >
            {[5, 4, 3, 2, 1].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border rounded w-full px-3 py-2"
            rows={4}
            placeholder="Write your thoughts..."
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}
