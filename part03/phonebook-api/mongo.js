const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/phonebook'
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 2) {
  Person.find({}).then(persons => {
    console.log('phonebook:')
    persons.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
  })

  person.save().then(person => {
    console.log(`added ${person.name} ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}


