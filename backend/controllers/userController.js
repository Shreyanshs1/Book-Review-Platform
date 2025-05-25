import User from '../models/User.js';

// GET /users/:id - Fetch user profile
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user', error: error.message });
  }
};

// PUT /users/:id - Update user profile
export const updateUserById = async (req, res) => {
  try {
    const { name, email, bio } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, bio },
      { new: true, runValidators: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: 'User not found' });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
};
