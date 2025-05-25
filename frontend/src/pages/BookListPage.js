import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../api/bookApi';
import { Link } from 'react-router-dom';

export default function BookListPage() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data.books);
        setFiltered(data.books);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch books:', error.message);
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  useEffect(() => {
    if (search.trim() === '') {
      setFiltered(books);
    } else {
      const lower = search.toLowerCase();
      setFiltered(
        books.filter((book) => book.title.toLowerCase().includes(lower))
      );
    }
  }, [search, books]);

  if (loading) return <p className="text-center text-gray-600 mt-6">Loading books...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-4 text-center">Books</h2>

      <input
        type="text"
        placeholder="Search by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filtered.map((book) => (
          <div key={book._id} className="bg-white rounded-lg shadow p-4">
            <h3 className="text-xl font-semibold mb-1">{book.title}</h3>
            <p className="text-gray-600 mb-2">by {book.author}</p>
            <p className="text-sm mb-2">
              Rating:{' '}
              <span className="font-medium">
                {book.averageRating?.toFixed(1) || 'No reviews yet'}
              </span>
            </p>
            <Link
              to={`/books/${book._id}`}
              className="inline-block mt-2 text-blue-600 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
