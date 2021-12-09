import React, { useState, useEffect  } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import personsService from '../services/persons';
import Notification from './Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [personsToShow, setPersonsToShow] = useState([...persons])
  const [formState, setFormState] = useState({ name: '', number: '' })
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(persons => {
        setPersons(persons)  
        setPersonsToShow(persons)
      })
      .catch(error => alert(`An error has ocurred retrieving the data: ${error.message}`))
  }, [])

  const handleFormChange = (event) => setFormState({
    ...formState,
    [event.target.name]: event.target.value
  })

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name === formState.name)
    if (person !== undefined) {
      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...person, number: formState.number }
        personsService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            const updatedPersons = persons.map(person => person.id !== changedPerson.id ? person : returnedPerson)
            setPersons(updatedPersons)
            setFormState({ name: '', number: '' })
            setSearch('')
            setPersonsToShow(updatedPersons)
            setMessage({
              content: `${person.name}'s number has been updated`,
              type: 'information'
            })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(() => {
            setPersons(persons.filter(p => p.id !== person.id))
            setPersonsToShow(persons.filter(p => p.id !== person.id))
            setFormState({ name: '', number: '' })
            setSearch('')
            setMessage({
              content: `Information of ${person.name} has already been removed from server`,
              type: 'error'
            })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      const newPerson = { name: formState.name, number: formState.number }
      personsService
        .create(newPerson)
        .then(person => {
          const newPersons = persons.concat(person)
          setPersons(newPersons)
          setFormState({ name: '', number: '' })
          setSearch('')
          setPersonsToShow(newPersons)
          setMessage({
            content: `Added ${person.name}`,
            type: 'information'
          })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => alert(`An error has ocurred: ${error.message}`))
    }
  }

  const filterPhoneBook = (event) => {
    setSearch(event.target.value)
    setPersonsToShow(persons.filter(person => person.name.toLowerCase().includes(event.target.value)))
  }

  const deletePerson = (event) => {
    const person = persons.find(p => p.id === parseInt(event.target.value))
    if (window.confirm(`Delete ${person.name}`)) {
      personsService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          setPersonsToShow(personsToShow.filter(p => p.id !== person.id))
        })
        .catch(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          setPersonsToShow(personsToShow.filter(p => p.id !== person.id))
          setMessage({
            content: `Information of ${person.name} has already been removed from server`,
            type: 'error'
          })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter search={search} filterPhoneBook={filterPhoneBook} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} formState={formState} handleFormChange={handleFormChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
