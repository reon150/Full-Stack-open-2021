import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'LIKE': {
      const id = action.data.id
      const blogToLike = state.find(n => n.id === id)
      const likedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1
      }
      return state.map(blog =>
        blog.id !== id ? blog : likedBlog
      )
    }
    case 'ADD_COMMENT': {
      const id = action.data.id
      const comment = action.data.comment
      const blogToAddComment = state.find(n => n.id === id)
      const blogWithNewComment = { ...blogToAddComment }
      blogWithNewComment.comments.push(comment)
      return state.map(blog =>
        blog.id !== id ? blog : blogWithNewComment
      )
    }
    case 'REMOVE_BLOG': {
      const id = action.data.id
      return state.filter(b => b.id !== id)
    }
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const likeTo = id => {
  return async dispatch => {
    const blog = await blogService.get(id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.update(changedBlog)
    dispatch({
      type: 'LIKE',
      data: { id },
    })
  }
}

export const removeBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: { id },
    })
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    await blogService.createComment(id, comment)
    dispatch({
      type: 'ADD_COMMENT',
      data: { id, comment },
    })
  }
}

export default blogReducer