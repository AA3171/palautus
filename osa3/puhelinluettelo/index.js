const express = require('express')
const app = express()
app.use(express.json())
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
app.post('/api/persons', (request, response) => {
        const person = request.body  
        console.log(person)  
        response.json(person)})



  

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


