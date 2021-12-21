const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  return response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  try {
    request.body.likes = request.body.likes === undefined ? 0 : request.body.likes;

    const blog = new Blog(request.body);
    const blogSaved = await blog.save();

    return response.status(201).json(blogSaved);
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

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
    return response.json(updatedBlog);
  } catch (error) {
    return next(error);
  }
});

module.exports = blogsRouter;
