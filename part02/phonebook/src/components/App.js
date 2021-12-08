import React, { useState, useEffect  } from 'react';
import axios from 'axios'
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [personsToShow, setPersonsToShow] = useState([...persons])
  const [formState, setFormState] = useState({ name: '', number: '' })
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)  
        setPersonsToShow(response.data)
      })
  }, [])

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
      <Filter search={search} filterPhoneBook={filterPhoneBook} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} formState={formState} handleFormChange={handleFormChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App
