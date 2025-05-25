import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookById, fetchReviewsByBook } from '../api/bookApi';

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const bookData = await fetchBookById(id);
        const reviewsData = await fetchReviewsByBook(id);
        setBook(bookData);
        setReviews(reviewsData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading book:', error.message);
        setLoading(false);
      }
    };

    loadDetails();
  }, [id]);

  if (loading) return <p className="text-center mt-6 text-gray-600">Loading book details...</p>;
  if (!book) return <p className="text-center mt-6 text-red-600">Book not found</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-2">{book.title}</h2>
      <p className="text-lg text-gray-700 mb-1">by {book.author}</p>
      <p className="text-sm text-gray-600 mb-4">Genre: {book.genre || 'N/A'}</p>
      <p className="text-gray-800 mb-4">{book.description}</p>

      <p className="mb-4">
        <span className="font-semibold">Average Rating:</span>{' '}
        {book.averageRating?.toFixed(1) || 'No reviews yet'}
      </p>

      <h3 className="text-2xl font-semibold mb-2 mt-8">Reviews</h3>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review._id} className="border p-3 rounded-md shadow-sm">
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-medium">{review.user?.name || 'Anonymous'}</span>{' '}
                rated it <strong>{review.rating}/5</strong>
              </p>
              <p className="text-gray-800">{review.comment || 'No comment'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
