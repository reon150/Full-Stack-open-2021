/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  return response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  try {
    const { title, author, url } = request.body;

    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
    const user = await User.findById(decodedToken.id);

    let { likes } = request.body;
    likes = likes === undefined || likes === null ? 0 : likes;

    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    return response.status(201).json(savedBlog);
  } catch (error) {
    return next(error);
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const {
      title,
      author,
      url,
      likes,
    } = request.body;

    request.body.likes = request.body.likes === undefined ? 0 : request.body.likes;

    const blog = {
      title,
      author,
      url,
      likes,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    return response.json(updatedBlog);
  } catch (error) {
    return next(error);
  }
});

module.exports = blogsRouter;
