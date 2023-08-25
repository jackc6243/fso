const express = require("express")
var morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())


let phonebook =
[
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
    },
    { 
        "id": 5,
        "name": "3r23ry Poppendieck", 
        "number": "39324223-6423122"
      }
]

const generateID = () => Math.floor(Math.random()*100000+10)

app.get("/api/phonebook", (request, response) => {
    response.json(phonebook)
})

app.get("/info", (request, response) => {
    const time = new Date().toLocaleDateString()
    response.send(`<p>Phonebook has info for ${phonebook.length} people</p><p>${time}</p>`)
})

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = phonebook.find(p => p.id == id) || false
    
    if (person) {
       response.json(person)
    } else {
        response.status(400).end()
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = phonebook.find(p => p.id == id) || false
    
    if (person) {
        phonebook = phonebook.filter(p => p.id !== id)
        response.status(200).end()
    } else {
        console.log("Not found")
        response.status(204).end()
    }
})

app.post("/api/persons", (request, response) => {
    const id = generateID()
    const b = request.body

    if ((b.name || false) && (b.number || false)) {
        if (phonebook.some(x => x.name === b.name)) {
            console.log("same name")
            response.status(400).end()
        }
        phonebook.push({"id": id, "name": b.name, "number": b.number})
        response.status(200).end()
    } else {
        console.log("no name/number")
        response.status(400).end()
    }
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})