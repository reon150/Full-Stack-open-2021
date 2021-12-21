const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  return response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  request.body.likes = request.body.likes === undefined ? 0 : request.body.likes;

  if (!request.body.title || !request.body.author || !request.body.url) {
    return response.status(400).json({ error: 'title, author or url missing' });
  }

  const blog = new Blog(request.body);
  const blogSaved = await blog.save();
  return response.status(201).json(blogSaved);
});

module.exports = blogsRouter;
