const { test, after, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const assert = require('node:assert');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Someone',
    url: 'http://example.com',
    likes: 0,
  },
  {
    title: 'Browser can execute only JavaScript',
    author: 'Someone',
    url: 'http://example.com',
    likes: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');
  assert.strictEqual(response.body.length, initialBlogs.length);
});

test('a specific blog title is within the returned blogs', async () => {
  const response = await api.get('/api/blogs');
  const titles = response.body.map((b) => b.title);
  assert.ok(titles.includes('HTML is easy'));
});
test('id is just id and not _id', async () => {
  const response = await api.get('/api/blogs');
  const blog = response.body[0];

  assert.ok(blog.id);
  assert.strictEqual(typeof blog.id, 'string');

  assert.strictEqual(blog._id, undefined);
});

test('Blogs can be added and blog amount goes up by 1', async () => {
  const newBlog = {
    title: 'New Blog Title',
    author: 'me',
    url: 'http://example.com',
    likes: 86,
  };

  const blogsAtStart = await api.get('/api/blogs');

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await api.get('/api/blogs');
  const titles = blogsAtEnd.body.map((b) => b.title);

  assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length + 1);

  assert.ok(titles.includes('New Blog Title'));
});

test('Delete works', async () => {
  const startingValue = await api.get('/api/blogs');
  const victim = startingValue.body[0];

  console.log('Deleting', victim.id);

  await api.delete(`/api/blogs/${victim.id}`).expect(204);
  const endValue = await api.get('/api/blogs');
  assert.strictEqual(endValue.body.length, startingValue.body.length - 1);
});

after(async () => {
  await mongoose.connection.close();
});
