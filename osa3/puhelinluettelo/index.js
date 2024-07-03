const express = require('express')
var morgan = require('morgan')
const app = express()
morgan.token('body', req => {
    return JSON.stringify(req.body)
  })
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
let persons = [  
    {    id: "1",    nimi: "Mika Häkkinen",    numero: 546756756  },  
    {    id: "2",    nimi: "Koira",    numero: 56756756  },  
    {    id: "3",    nimi: "Pankki automaatti",    numero: 345643  }]



app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    response.send('Phonebook has info for ' + persons.length + " people" +  "<br/>" + new Date(Date.now()))
  })

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {    
            response.json(person)  
            } 
            else {
                response.status(404).end()
            }
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
          
    if (!body.nimi) {
        return response.status(400).json({ 
        error: 'nimi puuttuu' 
        })
    }
    for (let i = 0; i < persons.length; i++) { 
        if (body.nimi == persons[i]["nimi"]){
            return response.status(400).json({
                error: 'Nimi on jo luettelossa'
            })
        }
    }
    

    if (!body.numero) {
        return response.status(400).json({ 
            error: 'numero puuttuu' 
        })
        }
          
        const person = {
            id: generateId(),
            nimi: body.nimi,
            numero: body.numero,
        }
          
        persons = persons.concat(person)
          
        response.json(person)
        })

  

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


