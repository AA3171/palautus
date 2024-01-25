import { useState, useEffect } from 'react'
import axios from 'axios'
import serverCom from './servercom'
import './App.css'


const Filter = (props) => {
  
  return (
    <div>search <input value={props.search} onChange={props.handleSearch}/></div>
  )
}
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  if (message === '404, person not found'){
  return (
    <div className="error">
      {message}
    </div>
  )}
  return (
    <div className="alert">
      {message}
    </div>)
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
    {props.persons.filter(props.filterSearch).map(person => <div key={person.name}>{person.name} {person.number} <button onClick={() => props.deletefromregistry(person)}>Delete</button> </div>)}
    </div>
  )
}

const App = () => {

  function deletefromregistry(victim){
    if (confirm("You sure?")){
    serverCom.killPerson(victim).then(response => {      console.log(response)    })}
    setalertMessage("Deleted successfully")
  }
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
  const [alertMessage, setalertMessage] = useState(null)


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
    
    function containsObject(obj, list) {
      var i;
      for (i = 0; i < list.length; i++) {
          if (list[i].name === obj) {
              return true;
          }
      }
  
      return false;
  }
  function returnObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].name === obj) {
            return list[i];
        }
    }

    return false;
}
  const addPerson = (event) => {    event.preventDefault()    

    if (containsObject(newName, persons)){
      if (confirm(newName + " is already in the registry. Would you like to change their number?")){
        serverCom.replacenumber(returnObject(newName, persons), {name: newName, number: newNumber})
        .then(response => {      console.log(response)    })
        .catch(error => {setalertMessage('404, person not found')})
        setalertMessage(newName + " number changed successfully")
        
      }
    }
    else {
      setPersons([...persons, {name: newName, number: newNumber}])
      serverCom.create({name: newName, number: newNumber}).then(response => {      console.log(response)    })
      setalertMessage(newName + " added successfully")
      setNewName("")
      setNumber("")  
    }
  }

  serverCom.Update().then(response => {
    setPersons(response.data)})

  if (alertMessage != null){
    setTimeout(() => {setalertMessage(null)}, 1000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={alertMessage} />
      <Filter search={search} handleSearch={handleSearch}/>
      <h3>Add new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNoteChange={handleNoteChange} 
      newNumber={newNumber} handleChangeNumber={handleChangeNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterSearch={filterSearch} deletefromregistry={deletefromregistry}/>
    </div>
  )


}

export default App