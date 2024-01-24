import { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = (props) => {
  
  return (
    <div>search <input value={props.search} onChange={props.handleSearch}/></div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
    <div>
      name: <input value={props.newName} onChange={props.handleNoteChange}/>
    </div>
    <div>number: <input value={props.newNumber} onChange={props.handleChangeNumber}/></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = (props) => {
  return (
    <div>
    {props.persons.filter(props.filterSearch).map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

const App = () => {

  function filterSearch(people){
    if (people.name.indexOf(search) != -1){
      return true
    }
  }
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , number: '+358 004 251'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
  axios.get('http://localhost:3001/persons').then(response => {
    setPersons(response.data)

  })
}, [])

  const handleChangeNumber = (event) => {
    setNumber(event.target.value)
  }
  const handleNoteChange = (event) => {    
    console.log(event.target.value)    
    setNewName(event.target.value)
    }
  const handleSearch = (event) => {
      setSearch(event.target.value)
    }


  const addPerson = (event) => {    event.preventDefault()    
    let justNames = persons.map(person => person.name)
    if (justNames.indexOf(newName) != -1){
      alert(newName + " is already in the registry")
    }
    else {
      setPersons([...persons, {name: newName, number: newNumber}])
      setNewName("")
      setNumber("")  
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch}/>
      <h3>Add new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNoteChange={handleNoteChange} newNumber={newNumber} handleChangeNumber={handleChangeNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterSearch={filterSearch} />
    </div>
  )

}

export default App