import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById, updateUserById } from '../api/bookApi';
import { useUser } from '../context/UserContext';

export default function UserProfilePage() {
  const { id } = useParams();
  const { user: loggedInUser, login } = useUser();

  const [form, setForm] = useState({
    name: '',
    email: '',
    bio: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getUserById(id);
        setForm({
          name: data.name,
          email: data.email,
          bio: data.bio || '',
        });
      } catch (err) {
        console.error('Failed to load user:', err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const updated = await updateUserById(id, form);
      setMessage('Profile updated successfully');
      if (loggedInUser && loggedInUser._id === id) {
        login(updated); // update global context and localStorage
      }
    } catch (err) {
      console.error('Failed to update user:', err.message);
      setMessage('Update failed.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-6 text-gray-500">Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows={4}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Update Profile'}
        </button>
      </form>

      {message && <p className="text-green-600 mt-4">{message}</p>}
    </div>
  );
}
