import React from 'react'
import { useParams, useNavigate  } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, likeTo, removeBlog } from '../reducers/blogReducer'
import useField from '../hooks/useField'
import { Button } from 'react-bootstrap'

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
          <h3>{blog.title} by {blog.author}</h3>
          <div>{blog.url}</div>
          <div>likes {blog.likes}
            <Button variant='secondary' onClick={() => handleLike(blog.id)}>like</Button>
          </div>
          <div>added by {blog.user.name}</div>
          {own&&<Button variant='danger' onClick={() => handleRemove(blog.id)}>remove</Button>}
          <h4>comments</h4>
          <input id='comment' {...comment} />
          <Button variant='outline-primary' onClick={() => submitComment(blog.id)}>add comment</Button>
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