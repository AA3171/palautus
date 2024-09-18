require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const Note = require('./models/people')
const cors = require('cors')
const mongoose = require('mongoose')

///mongodb+srv://aa3171:${password}@cluster0.uhwcr.mongodb.net/phonebook?retryWrites=true&w=majority


const url = process.env.PORT

console.log('connecting to', url)





const app = express()
app.use(express.static('dist'))
morgan.token('body', req => {
    return JSON.stringify(req.body)
  })
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
let persons = [  
    {    id: "1",    name: "Mika Häkkinen",    number: 5467567356  },  
    {    id: "2",    name: "Koira",    number: 56756756  },  
    {    id: "3",    name: "Pankki automaatti",    number: 345643  }]

app.use(cors())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    response.send('Phonebook has info for ' + persons.length + " people" +  "<br/>" + new Date(Date.now()))
  })

app.get('/api/persons', (request, response) => {
    Note.find({}).then(results => {
        response.json(results)
      })
      
})

app.get('/api/persons/:id', (request, response) => {
    Note.findById(request.params.id).then(person => {
    if (person) {    
            response.json(person)  
            } 
            else {
                response.status(404).end()
            }
    })
})
app.delete('/api/persons/:id', (request, response) => {
        const id = request.params.id
        persons = persons.filter(person => person.id !== id)
      
        response.status(204).end()
      })

const generateId = () => {

    return String(Math.floor(Math.random() * 1000000))
    }
          
app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
        return response.status(400).json({ 
        error: 'nimi puuttuu' 
        })
    }
    for (let i = 0; i < persons.length; i++) { 
        if (body.name == persons[i]["name"]){
            return response.status(400).json({
                error: 'Nimi on jo luettelossa'
            })
        }
    }
    if (!body.number) {
        return response.status(400).json({ 
            error: 'numero puuttuu' 
        })
        }
          

    const note = new Note({
        name: body.name, 
        number: body.number,
      })

    note.save().then(savedNote => {
      response.json(savedNote)
    })
    
    
    /*(request, response) => {
    const body = request.body
          
    if (!body.name) {
        return response.status(400).json({ 
        error: 'nimi puuttuu' 
        })
    }
    for (let i = 0; i < persons.length; i++) { 
        if (body.name == persons[i]["name"]){
            return response.status(400).json({
                error: 'Nimi on jo luettelossa'
            })
        }
    }
    

    if (!body.number) {
        return response.status(400).json({ 
            error: 'numero puuttuu' 
        })
        }
          
        const person = {
            id: generateId(),
            name: body.name,
            number: body.number,
        }
          */
  
        })

  

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


