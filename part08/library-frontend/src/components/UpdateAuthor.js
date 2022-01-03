import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'

const UpdateAuthor = ({ authors }) => {
  const [name, setName] = useState(authors[0].name)
  const [born, setBorn] = useState('')

  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const submit = async (event) => {
    event.preventDefault()
        
    updateAuthor({
      variables: { name, setBornTo: Number(born) }
    })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={(e) => setName(e.target.value)}>
            {authors.map(a =>
              <option key={a.name} value={a.name}>{a.name}</option>
            )}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default UpdateAuthor
