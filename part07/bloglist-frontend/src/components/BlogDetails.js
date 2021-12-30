import React from 'react'
import { useParams, useNavigate  } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, likeTo, removeBlog } from '../reducers/blogReducer'
import useField from '../hooks/useField'

const BlogDetails = () => {
  const dispatch = useDispatch()
  const navigate  = useNavigate()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const [comment, resetComment] = useField('text')

  const id = useParams().id
  const blog = blogs.find(u => u.id === id)
  const own = user.username === blog.user.username

  const submitComment = (id) => {
    dispatch(addComment(id, comment.value))
    resetComment()
  }

  const handleRemove = (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      dispatch(removeBlog(id))
      navigate('/')
    }
  }

  const handleLike = (id) => {
    dispatch(likeTo(id))
  }

  return (
    <div className='blog'>
      {(
        <div>
          <h2>{blog.title} by {blog.author}</h2>
          <div>{blog.url}</div>
          <div>likes {blog.likes}
            <button onClick={() => handleLike(blog.id)}>like</button>
          </div>
          <div>added by {blog.user.name}</div>
          {own&&<button onClick={() => handleRemove(blog.id)}>remove</button>}
          <h3>comments</h3>
          <input id='comment' {...comment} />
          <button onClick={() => submitComment(blog.id)}>add comment</button>
          <ul>
            {('comments' in blog) && blog.comments.map((comment, index) =>
              <li key={comment + index}>
                {comment}
              </li>)}
          </ul>
        </div>
      )}
    </div>
  )
}

export default BlogDetails