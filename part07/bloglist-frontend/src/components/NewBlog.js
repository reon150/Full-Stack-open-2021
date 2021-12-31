import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import useField from '../hooks/useField'
import { Button, Form } from 'react-bootstrap'

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
      <Form onSubmit={handleNewBlog}>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control id='author' {...author} />
        </Form.Group>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control id='title' {...title} />
        </Form.Group>
        <Form.Group>
          <Form.Label>url:</Form.Label>
          <Form.Control id='url' {...url} />
        </Form.Group>
        <Button variant='primary' id='create' type='submit'>create</Button>
      </Form>
    </div>
  )
}

export default NewBlog
