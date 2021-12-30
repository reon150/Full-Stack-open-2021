import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import storage from '../utils/storage'
import Blog from './Blog'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedUser = storage.loadUser()
    if (loggedUser) {
      dispatch(initializeBlogs())
    }
  }, [])

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id }
          blog={blog}
          own={user.username===blog.user.username}
        />
      )}
    </div>
  )
}

export default BlogList
