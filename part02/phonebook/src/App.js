import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [personsToShow, setPersonsToShow] = useState([...persons])
  const [formState, setFormState] = useState({ name: '', number: '' })
  const [search, setSearch] = useState('')

  const handleFormChange = (event) => setFormState({
    ...formState,
    [event.target.name]: event.target.value
  })

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === formState.name)) {
      alert(`${formState.name} is already added to phonebook`)
    } else {
      const newPersons = persons.concat({ name: formState.name, number: formState.number, id: persons[persons.length - 1].id + 1 })
      setPersons(newPersons)
      setFormState({ name: '', number: '' })
      setSearch('')
      setPersonsToShow(newPersons)
    }
  }

  const filterPhoneBook = (event) => {
    setSearch(event.target.value)
    setPersonsToShow(persons.filter(person => person.name.toLowerCase().includes(event.target.value)))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={search} onChange={filterPhoneBook} />
      <form onSubmit={addPerson}>
        <div>
          name: <input name='name' value={formState.name} onChange={handleFormChange} />
        </div>
        <div>
          number: <input name='number' value={formState.number} onChange={handleFormChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => <div key={person.id}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App
