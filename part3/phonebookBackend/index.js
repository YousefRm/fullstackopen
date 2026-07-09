require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan((tks, req, res) => {
  return [
    'Method:  ', req.method,
    '  Path:   ', req.path,
    '  Status  ', tks.status(req, res),
    '  Content-Length:  ', tks.res(req, res, 'content-length'),
    ' Response-Time:  ', tks['response-time'](req, res),
    JSON.stringify(req.body)
  ].join('')
}))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})
app.get('/info', (request, response) => {
  Person.find({}).then(persons => response.send(`<p>Phonebook has info for ${persons.length} people </p><p>${Date()}</p>`))

})
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findByIdAndDelete(id).then(result => {
    response.status(204).end()
  })

})
app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const name = body.name
  const phone = body.phone
  if (!name) return response.status(400).json({ error: "name is missing" })
  if (!phone) return response.status(400).json({ error: "phone is missing" })

  const person = new Person({
    name: name,
    phone: phone
  })
  person.save().then(person => {
    response.json(person)
  }).catch(error => next(error))

})
app.put('/api/persons/:id', (request, response, next) => {
  const phone = request.body.phone
  Person.findById(request.params.id).then(person => {
    if (!person) { response.status(404).end() }
    person.phone = phone
    return person.save().then(updatedPerson => {
      response.json(updatedPerson)
    })
  }).catch(error => next(error))
})
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: "malformated id" })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`)
})
