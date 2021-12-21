const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
    .populate('blogs', {
      title: 1,
      author: 1,
      url: 1,
      likes: 1,
    });

  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { name, username, password } = request.body;

  if (!name || !username || !password) {
    return response.status(400).json({
      error: 'some properties are missing',
    });
  }

  if (password.length < 3) {
    return response.status(400).json({
      error: 'password length must be at least 3 characters long',
    });
  }

  if (await User.exists({ username })) {
    return response.status(400).json({
      error: 'username already exist',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  return response.json(savedUser);
});

module.exports = usersRouter;
