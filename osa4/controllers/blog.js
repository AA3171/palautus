const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const user = require('./user');
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const app = express();

const getblog = app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.find({}).populate('user');
  res.json(blogs);
});

const postblog = app.post('/api/blogs', async (req, res) => {
  const authorization = req.get('authorization');
  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const token = authorization.substring(7);
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.SECRET || 'devsecret');
  } catch (error) {
    return res.status(401).json({ error: 'token invalid' });
  }

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' });
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    return res.status(401).json({ error: 'user not found' });
  }

  const blog = new Blog({
    ...req.body,
    user: user._id,
  });
  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
});

const deleteblog = app.delete('/api/blogs/:id', async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndDelete(id);

  response.status(204).end();
});

module.exports = {
  getblog,
  postblog,
  deleteblog,
};
