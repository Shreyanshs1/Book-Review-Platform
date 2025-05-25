import { useUser } from '../context/UserContext';

export default function HomePage() {
  const { login, user } = useUser();

  const dummyUser = {
    _id: '6832b2ffa27495fb3a594b56', // replace with real MongoDB _id
    name: 'John Doe',
    email: 'john@example.com',
  };
  console.log(user);

  return (
    <div className="text-center py-10">
      <h1 className="text-3xl font-bold mb-4">Welcome to Book Review App</h1>
      {!user ? (
        <button
          onClick={() => login(dummyUser)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Fake Login as John Doe
        </button>
      ) : (
        <p className="text-green-700">Logged in as {user.name}</p>
      )}
    </div>
  );
}
