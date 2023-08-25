require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.get('/api/phonebook', (req, res) => {
  Person.find({}).then(result => {
    res.json(result)
  })
})

app.post('/api/phonebook', (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  } else if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  Person.find({ name: body.name }).then(result => {
    if (result.length !== 0) {
      console.log('name already exists')
      return response.status(400).json({
        error: 'Person already exists'
      })
    } else {
      const newPerson = new Person({ name: body.name, number: body.number })
      newPerson.save().then(result => {
        console.log(`Added ${result.name} ${result.number} into the phonebook`)
        response.json(result)
      }).catch(error => next(error))
    }
  })
})

app.put('/api/phonebook/:id', (request, response, next) => {
  const newPerson = {
    name: request.body.name,
    number: request.body.number
  }

  Person.findByIdAndUpdate(request.params.id,
    newPerson,
    { new: true, runValidators: true, context: 'query' })
    .then(updated => {
      console.log('updated person is: ', updated)
      response.json(updated)
    }).catch(error => next(error))
})

app.get('/api/phonebook/:name', (request, response) => {
  Person.find({ name: request.params.name }).then(result => {
    if (result.length === 0) {
      console.log('No such name found')
      return response.status(400).json({
        error: 'No such name found'
      })
    } else {
      console.log('found:', result)
      response.json(result)
    }
  }).catch(error => {
    console.log(error)
    response.status(500).end()
  })
})

app.delete('/api/phonebook/:id', (request, response, next) => {
  console.log('deleting')
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      if (!result) {
        response.status(400).send({ error: 'no id found' })
      } else {
        console.log('Have deleted :', result)
        response.status(204).end()
      }
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log('error is', error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  response.status(400).end()
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
