import React from 'react'
import { useParams } from "react-router-dom"

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => a.id === id)
   
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>author: {anecdote.author}</p>
      <p>more info: <a href={anecdote.info} target='_blank' rel='noreferrer'>{anecdote.info}</a></p>
      <p>votes: {anecdote.votes}</p>
    </div>
  )
}

export default Anecdote
