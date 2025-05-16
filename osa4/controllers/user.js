const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const app = express();

const getuser = app.get('/api/users', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const postuser = app.post('/api/users', async (req, res) => {
  const { username, name, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    name,
    passwordHash,
  });
  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

const deleteuser = app.delete('/api/users/:id', async (request, response) => {
  const id = request.params.id;
  await User.findByIdAndDelete(id);

  response.status(204).end();
});

module.exports = {
  getuser,
  postuser,
  deleteuser,
};
