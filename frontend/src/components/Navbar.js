import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Navbar() {
  const { user } = useUser();

  return (
    <nav className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-lg font-bold text-blue-700">📚 BookReview</Link>
      <div className="space-x-4">
        <Link to="/books" className="text-gray-700 hover:underline">Books</Link>
        {user && <Link to={`/user/${user._id}`} className="text-gray-700 hover:underline">Profile</Link>}
      </div>
    </nav>
  );
}
