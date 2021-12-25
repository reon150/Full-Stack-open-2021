import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()
  
  const vote = (id) => {
    dispatch(voteFor(id))
  }

  const anecdotesToShow = filter === '' 
    ? anecdotes 
    : anecdotes.filter(
      anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )

  return (
    <div>
      {anecdotesToShow.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList