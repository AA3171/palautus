const express = require('express')
const app = express()

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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


