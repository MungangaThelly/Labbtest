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
  
      // Input validation: Ensure username and password are provided
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
  
      // Create a new user instance
      const newUser = new User({ username, password });
  
      // Save the new user to the database
      await newUser.save();
  
      // Respond with the created user
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error: error.message });
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

// **Read** - GET request to get a user by id 
app.get('/users/:id', async (req, res) => {
    try {
      // Use `_id` for the MongoDB document's primary key
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user); // Respond with the found user
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
  });
  

// **Update** - PUT request to update a user's name by id
app.put('/users/:id', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id, // Find user by _id
        { username: req.body.username }, // Update username (you can also use other fields like `name`)
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
  
// **Delete** - DELETE request to delete a user by id 
app.delete('/users/:id', async (req, res) => {
    try {
      const result = await User.deleteOne({ _id: req.params.id }); // Use _id to find the user
  
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
