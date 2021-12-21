const Blog = require('../models/blog');
const User = require('../models/user');

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

const initialUsers = [
  {
    name: 'Ronald Ogando',
    username: 'reon150',
    passwordHash: '123',
  },
  {
    name: 'Emilio Negron',
    username: 'reon999-999',
    passwordHash: '789456123',
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  initialUsers,
  usersInDb,
};
