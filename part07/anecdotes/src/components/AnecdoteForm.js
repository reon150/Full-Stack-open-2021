import React from 'react'
import { useHistory } from "react-router-dom"
import useField from '../hooks/useField'

const AnecdoteForm = (props) => {
  const [content, resetContent] = useField('text')
  const [author, resetAuthor] = useField('text')
  const [info, resetInfo] = useField('text')
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault()

    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })

    history.push('/')
  }

  const reset = (e) => {
    e.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>       
        <button onClick={reset}>reset</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
