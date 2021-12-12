require('dotenv').config();
const express = require('express')
const morgan = require('morgan');
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(cors())
app.use(express.json())
morgan.token('body', req => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => res.json(persons))
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id == id)

  if (person) {
    res.json(person)
  } else {
    res.status(400).end()
  }
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  if (!body.name || !body.number) {
    res.status(400).json({
      error: 'content missing'
    })
  } else if (persons.find(person => person.name == body.name)) {
    res.status(409).json({
      error: 'name must be unique'
    })
  } else {
    const person = new Person({
      name: body.name,
      number: body.number
    })
  
    person.save().then(savedPerson => res.json(savedPerson))
  }
})

app.delete('/api/persons/:id', (req, res) => {
  Person.remove({ _id: req.params.id }, (err) => {
    res.status(204).end()
  })
})

app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date}</p>
  `)
})

app.use((error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

