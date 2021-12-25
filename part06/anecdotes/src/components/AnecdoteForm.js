import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    props.createAnecdote(content)
    props.setNotification(`new anecdote '${content}'`, 10)
  }

  return (
    <div>
      <h2>create new</h2>
      <form method='post' onSubmit={addAnecdote}>
        <div><input name='content' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

