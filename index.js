const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./schema');

const app = express();
const port = 3010;

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/blogDB', { 
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// API route to create a new blog post
app.post('/blogs', async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});