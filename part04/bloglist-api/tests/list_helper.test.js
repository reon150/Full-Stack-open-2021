const listHelper = require('../utils/list_helper');

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

describe('dummy', () => {
  test('returns one', () => {
    const result = listHelper.dummy([]);
    expect(result).toBe(1);
  });
});

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes([blogs[0]]);
    expect(result).toBe(7);
  });

  test('when the list has no elements', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test('when list has many elements', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe('favorite blog', () => {
  test('when list has only one blog', () => {
    const result = listHelper.favoriteBlog([blogs[0]]);

    const { title, author, likes } = blogs[0];
    const expected = { title, author, likes };

    expect(result).toEqual(expected);
  });

  test('when the list has no elements', () => {
    const result = listHelper.favoriteBlog([]);

    expect(result).toEqual(null);
  });

  test('when list has many elements', () => {
    const result = listHelper.favoriteBlog(blogs);

    const { title, author, likes } = blogs[2];
    const expected = { title, author, likes };

    expect(result).toEqual(expected);
  });
});

describe('most blogs', () => {
  test('when list has only one blog', () => {
    const result = listHelper.mostBlogs([blogs[0]]);

    const expected = { author: blogs[0].author, blogs: 1 };

    expect(result).toEqual(expected);
  });

  test('when the list has no elements', () => {
    const result = listHelper.mostBlogs([]);

    expect(result).toEqual(null);
  });

  test('when list has many elements', () => {
    const result = listHelper.mostBlogs(blogs);

    const expected = { author: 'Robert C. Martin', blogs: 3 };

    expect(result).toEqual(expected);
  });
});

describe('most likes', () => {
  test('when list has only one blog', () => {
    const result = listHelper.mostLikes([blogs[0]]);

    const { author, likes } = blogs[0];
    const expected = { author, likes };

    expect(result).toEqual(expected);
  });

  test('when the list has no elements', () => {
    const result = listHelper.mostLikes([]);

    expect(result).toEqual(null);
  });

  test('when list has many elements', () => {
    const result = listHelper.mostLikes(blogs);

    const { author, likes } = blogs[2];
    const expected = { author, likes };

    expect(result).toEqual(expected);
  });
});