const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('content', function(req, res) {return JSON.stringify(req.body)})
app.use(morgan(function(tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.content(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}))

app.get('/', (req, res) => {
  res.send('build/index.html')
})

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(persons => {
      res.json(persons.map(Person.format))
    })
    .catch(error => {
      console.log(error)
    })
})

app.get('/info', (req, res) => {
  Person
    .countDocuments({})
    .then(c => {
      res.send(`Puhelinluettelossa ${c} henkilön tiedot.<br /> ${new Date()}`)
    })
    .catch(error => {
      console.log(error)
    })
})

app.get('/api/persons/:id', (req, res) => {
  Person
    .findById(req.params.id)
    .then(person => {
      if(person) {res.json(Person.format(person))}
      else {res.status(404).end()}
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({error: 'Malformatted id'})
    })
})

app.delete('/api/persons/:id', (req, res) => {
  Person
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(() => {
      res.status(400).send({error: 'Malformatted id'})
    })
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  if(body.name === '' || body.number === '') {
    return res.status(400).json({error: 'Name or number missing'})
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person
    .save()
    .then(savedPer => {
      savedPer.validate()
      res.json(Person.format(savedPer))
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({error: 'Malformatted name'})
    })
})

app.put('/api/persons/:id', (req, res) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person
    .findByIdAndUpdate(req.params.id, person, {new: true})
    .then(updated => {
      res.json(Person.format(updated))
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({error: 'Malformatted id'})
    })
})

const error = (req, res) => {
  res.status(404).send({error: 'unknown endpoint'})
}

app.use(error)

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
