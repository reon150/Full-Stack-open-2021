import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points , setPoints ] = useState(Array(anecdotes.length).fill(0))

  const getRandomNumber = (max) => Math.floor(Math.random() * max);

  const setAnecdotesPoints = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)  
  }

  const getAnecdoteIndexWithMostVotes = () =>
    points.reduce((mostVotesIndex, x, index, points) => x > points[mostVotesIndex] ? index : mostVotesIndex, 0);

  return (
    <div>
      <div>
        <h2>Anecdote of the day</h2>
        <div>{anecdotes[selected]}</div>
        <div>has {points[selected]} votes</div> 
        <button onClick={setAnecdotesPoints}>vote</button>
        <button onClick={() => setSelected(getRandomNumber(anecdotes.length))}>next anecdote</button>
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        <div>{anecdotes[getAnecdoteIndexWithMostVotes()]}</div>
      </div>
    </div>
  )
}

export default App