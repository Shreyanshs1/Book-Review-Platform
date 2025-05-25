import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function HomePage() {
  const { user, login, logout } = useUser();

  // Dummy user (replace _id with one from your DB)
  const dummyUser = {
    _id: '6832b2ffa27495fb3a594b56', 
    name: 'John Doe',
    email: 'john@example.com',
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-10">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">📚 Book Review Platform</h1>

      <div className="space-x-4 mb-6">
        <Link
          to="/books"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Browse Books
        </Link>

        {user && (
          <Link
            to={`/user/${user._id}`}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            My Profile
          </Link>
        )}
      </div>

      {!user ? (
        <button
          onClick={() => login(dummyUser)}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          Login as John Doe
        </button>
      ) : (
        <div className="text-center">
          <p className="mb-2 text-green-700">Logged in as <strong>{user.name}</strong></p>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
