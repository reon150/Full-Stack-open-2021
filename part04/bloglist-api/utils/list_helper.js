const dummy = () => 1;

const totalLikes = (blogs) => (blogs.length === 0
  ? 0
  : blogs.reduce((sum, blog) => sum + blog.likes, 0));

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return { };

  const blog = blogs.reduce((previous, current) => {
    if (current.likes > previous.likes) {
      return current;
    }

    return previous;
  });

  const { title, author, likes } = blog;
  return { title, author, likes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
