require('dotenv').config(); // Ensure .env is loaded
const express = require('express');
const mongoose = require('mongoose');
const User = require('./src/models/User'); // Import the User model

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {

})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// **Create** - POST request to create a new user
app.post('/users', async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json(newUser); // Respond with the created user
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
});

// **Read** - GET request to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users); // Respond with all users
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// **Read** - GET request to get a user by email
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user); // Respond with the found user
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

// **Update** - PUT request to update a user's name by email
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: req.params.email }, // Find user by email
      { name: req.body.name }, // Update name
      { new: true } // Return the updated document
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser); // Respond with the updated user
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});

// **Delete** - DELETE request to delete a user by email
app.delete('/users/:id', async (req, res) => {
  try {
    const result = await User.deleteOne({ email: req.params.email });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted' }); // Respond with success message
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
