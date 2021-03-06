/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 });
  return response.json(blog);
});

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  return response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  try {
    const { title, author, url } = request.body;
    const { user } = request;

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
    await savedBlog.populate('user', { username: 1, name: 1 });
    return response.status(201).json(savedBlog);
  } catch (error) {
    return next(error);
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  const { user } = request;

  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'token invalid' });
  }

  await Blog.findByIdAndRemove(request.params.id);
  return response.status(204).end();
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

blogsRouter.post('/:id/comments', async (request, response, next) => {
  try {
    const { id } = request.params;
    const { comment } = request.body;

    request.body.likes = request.body.likes === undefined ? 0 : request.body.likes;

    const blog = await Blog.findById(id);
    blog.comments.push(comment);

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    return response.json(updatedBlog);
  } catch (error) {
    return next(error);
  }
});

module.exports = blogsRouter;
