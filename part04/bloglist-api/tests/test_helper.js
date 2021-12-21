const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Ronald Ogando',
    url: 'https',
    likes: 520,
  },
  {
    title: 'The future of programming',
    author: 'Emilio Negron',
    url: 'http',
    likes: 443,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
