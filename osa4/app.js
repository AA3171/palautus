const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Blog = require('./models/blog');
const blogcontroller = require('./controllers/blog');
const User = require('./models/user');
const usercontroller = require('./controllers/user');
const loginRouter = require('./controllers/login');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/bloglist');

app.get('/api/blogs', blogcontroller.getblog);
app.post('/api/blogs', blogcontroller.postblog);
app.delete('/api/blogs/:id', blogcontroller.deleteblog);

app.get('/api/users', usercontroller.getuser);
app.post('/api/users', usercontroller.postuser);
app.delete('/api/users', usercontroller.deleteuser);

app.use('/api/login', loginRouter);

module.exports = app;
