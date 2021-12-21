const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const User = require('../models/user');
const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(helper.initialUsers);
});

describe('addition of a new user', () => {
  test('succeeds with valid data', async () => {
    const newUser = {
      name: 'Ronald Negron',
      username: 'reonsupremo',
      password: '123',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usesrsAtEnd = await helper.usersInDb();
    expect(usesrsAtEnd).toHaveLength(helper.initialUsers.length + 1);

    const usernames = usesrsAtEnd.map((n) => n.username);
    expect(usernames).toContain(newUser.username);
  });

  describe('fails with status code 400 if', () => {
    test('username already exists', async () => {
      const newUser = {
        name: 'Ronald Negron',
        username: helper.initialUsers[0].username,
        password: '123',
      };

      await api.post('/api/users').send(newUser).expect(400);

      const usersAtEnd = await helper.usersInDb();

      expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
    });
    test('some properties are missing', async () => {
      const newUser = {
        name: 'Ronald Negron',
        password: '123',
      };

      await api.post('/api/users').send(newUser).expect(400);

      const usersAtEnd = await helper.usersInDb();

      expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
    });

    test('password length is less than 3', async () => {
      const newUser = {
        name: 'Ronald Negron',
        username: 'user-name',
        password: '1',
      };

      await api.post('/api/users').send(newUser).expect(400);

      const usersAtEnd = await helper.usersInDb();

      expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
