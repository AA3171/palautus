const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const person = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://aa3171:${password}@cluster0.uhwcr.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,

})

const Note = mongoose.model('People', noteSchema)
if (process.argv[3]){
const note = new Note({
  name: person, 
  number: number,

})

note.save().then(result => {
  console.log('added ' + person + ' number ' + number + ' to phonebook')
  mongoose.connection.close()
})}
else{
    console.log("Phonebook:")
    Note.find({}).then(result => {
        result.forEach(note => {
          console.log(note.name + " " + note.number)
        })
        mongoose.connection.close()
      })
}