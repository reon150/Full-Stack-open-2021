/* eslint-disable no-underscore-dangle */
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/user');
const helper = require('./test_helper');
const Blog = require('../models/blog');
const app = require('../app');

const api = supertest(app);

let token;
let userTest;

beforeAll(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash('secrect', 10);
  const user = new User({ name: 'test_name', username: 'root', passwordHash });
  userTest = await user.save();
  const apiResponse = await api
    .post('/api/login')
    .send({ username: 'root', password: 'secrect' });
  token = `bearer ${apiResponse.body.token}`;
});

beforeEach(async () => {
  await Blog.deleteMany({});
  helper.initialBlogs[0].user = userTest._id;
  await Blog.insertMany(helper.initialBlogs);
});

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', token)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs').set('Authorization', token);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('that the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs').set('Authorization', token);

    expect(response.body[0].id).toBeDefined();
    expect(response.body[0]._id).toBe(undefined);
  });
});

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Computers',
      author: 'Emilio Ogando',
      url: 'https',
      likes: 187,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const titles = blogsAtEnd.map((b) => b.title);

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    expect(titles).toContain('Computers');
  });

  describe('when likes property is missing', () => {
    test('set likes to 0 by default ', async () => {
      const newBlog = {
        title: 'Emails',
        author: 'Ronald Emilio',
        url: 'http:',
      };

      const apiResponse = await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      const blogAtEnd = blogsAtEnd.find((b) => b.id === apiResponse.body.id);

      expect(apiResponse.body.likes).toBeDefined();
      expect(apiResponse.body.likes).toBe(0);
      expect(blogAtEnd.likes).toBe(0);
    });
  });

  test('fails with status code 400 if data invaild', async () => {
    const newBlog = {
      likes: 150,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', token)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const contents = blogsAtEnd.map((b) => b.title);

    expect(contents).not.toContain(blogToDelete.title);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
