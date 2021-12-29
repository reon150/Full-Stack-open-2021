import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import useField from '../hooks/useField'

const NewBlog = () => {
  const dispatch = useDispatch()

  const [title, resetTitle] = useField('text')
  const [author, resetAuthor] = useField('text')
  const [url, resetUrl] = useField('text')

  const handleNewBlog = (event) => {
    event.preventDefault()

    dispatch(
      createBlog({
        title: title.value,
        author: author.value,
        url: url.value,
      })
    )

    setNotification(
      {
        message: `a new blog '${title}' by ${author} added!`,
        type: 'success'
      },
      10
    )

    resetTitle()
    resetAuthor()
    resetUrl()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          author
          <input id='author' {...author} />
        </div>
        <div>
          title
          <input id='title' {...title} />
        </div>
        <div>
          url
          <input id='url' {...url} />
        </div>
        <button id='create'>create</button>
      </form>
    </div>
  )
}

export default NewBlog
