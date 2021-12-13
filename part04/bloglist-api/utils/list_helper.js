const dummy = () => 1;

const totalLikes = (blogs) => (blogs.length === 0
  ? 0
  : blogs.reduce((sum, blog) => sum + blog.likes, 0));

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const blog = blogs.reduce((previous, current) => {
    if (current.likes > previous.likes) {
      return current;
    }

    return previous;
  });

  const { title, author, likes } = blog;
  return { title, author, likes };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const blog = blogs.reduce((previous, current) => {
    if (blogs.filter((b) => b.author === current.author).length
      > blogs.filter((b) => b.author === previous.author).length) {
      return current;
    }

    return previous;
  });

  return { author: blog.author, blogs: blogs.filter((b) => b.author === blog.author).length };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const blog = favoriteBlog(blogs);

  const { author, likes } = blog;
  return { author, likes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
