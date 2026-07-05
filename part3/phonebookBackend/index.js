const express = require('express')
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
let persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "phone": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "phone": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "phone": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "phone": "39-23-6423122"
  }
]
const generateId = () => {
  const id = Math.floor(Math.random() * 1000000000000)
  return String(id)

}
app.get('/api/persons', (request, response) => {
  response.json(persons)
})
app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people </p><p>${Date()}</p>`)
})
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})
app.post('/api/persons', (request, response) => {
  const body = request.body
  const name = body.name
  const phone = body.phone
  if (!name) return response.status(400).json({ error: "name is missing" })
  if (!phone) return response.status(400).json({ error: "phone is missing" })
  if (persons.find(p => p.name === name)) return response.status(400).json({ error: "name must be unique" })
  const person = {
    id: generateId(),
    name: name,
    phone: phone
  }
  persons = persons.concat(person)
  response.json(person)
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`)
})
