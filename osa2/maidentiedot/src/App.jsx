import { useState } from 'react'
import axios from 'axios'

const Lan = (props) => {
  
  return (
    props.lanlist.map(lan => <div key={lan}><p></p>-{lan.slice(7, -1)} </div>)
    )
}



const App = () => {
  ///Settings consts
  const [search, setSearch] = useState('')
  const [flag, setFlag] = useState('')

  const [countries, setCountries] = useState([
    {name:{common: "Finland"}, flags: {png: "a"}, languages: {fin: "finnish"}}
  ]) 
  ///Functions
  function containsObject(country){
    if (country.name.common.toLowerCase().indexOf(search.toLowerCase()) != -1){
      return true
    }
  }
  function showCountry(count){
    setSearch(count)
  }

const handleSearchChange = (event) => {    
  console.log(event.target.value)    
  setSearch(event.target.value)
  }

  axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response => { 
    setCountries(response.data)
    if (countries.filter(containsObject).length === 1){
      setFlag(countries.filter(containsObject)[0].flags.png)
    }
  })
  if (countries.filter(containsObject).length <= 10 && countries.filter(containsObject).length > 1){
  return (
   <div>
        <form>
    <div>
      Search: <input value={search} onChange={handleSearchChange}/>
    </div>
  </form>
  {countries.filter(containsObject).map(country => <div key={country.name.common}>{country.name.common} <button onClick={() => showCountry(country.name.common)}>Show</button></div>)}
   </div>
  )}
  if (countries.filter(containsObject).length > 10){
  return (
    <div>
    <form>
<div>
  Search: <input value={search} onChange={handleSearchChange}/>
</div>
</form>
Too many countries
</div>
  )}
  if (countries.filter(containsObject).length === 1){
    return (
     <div>
          <form>
      <div>
        Search: <input value={search} onChange={handleSearchChange}/>
      </div>
    </form>
    {countries.filter(containsObject).map(country => <div key={country.name.common}>{country.name.common} <p></p> Capital {country.capital} <p></p> Area {country.area} km²
    <p></p> <img src={flag} alt="flag"></img> <p></p>
    languages <Lan lanlist={JSON.stringify(country.languages).replace("{", "").replace("}","").split(",")}/>


    
    </div>)}

     </div>
    )}

      return (
       <div>
            <form>
        <div>
          Search: <input value={search} onChange={handleSearchChange}/>
        </div>
      </form>
      Skill issue
       </div>
      )
      
}

export default App
