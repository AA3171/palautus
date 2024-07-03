//($env:VITE_SOME_KEY="") -and (npm run dev)
import { useState } from 'react'
import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY
const Lan = (props) => {
  
  return (
    props.lanlist.map(lan => <div key={lan}><p></p>-{lan.slice(7, -1)} </div>)
    )
}
let lan = 0
let lat = 0
let weatherinfo = {weather:[{main: "sunny"}], main: {temp: "250"}, wind: {speed: "7"}}

const App = () => {
  ///Settings consts
  const [search, setSearch] = useState('')
  const [flag, setFlag] = useState('')

  const [countries, setCountries] = useState([
    {name:{common: "Finland"}, flags: {png: "a"}, languages: {fin: "finnish"}, latlng: [63, 40]}
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
  if (countries.filter(containsObject).length === 1){
    lan = countries.filter(containsObject)[0].latlng[1]
    lat = countries.filter(containsObject)[0].latlng[0]
    console.log(countries.filter(containsObject))
    {axios.get("https://api.openweathermap.org/data/2.5/weather?lat=" + Math.round(lat) + "&lon=" + Math.round(lan) + "&appid=" + api_key).then(response => {weatherinfo = response.data})} 
    {console.log(api_key)}
    {console.log(weatherinfo)}

  }
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
      

    <p></p>
    <h2> Weather in {country.capital} </h2>
    {Math.round(weatherinfo.main.temp - 273)} celsius <p></p>
    {weatherinfo.weather[0].main} <p></p>
    {weatherinfo.wind.speed} m/s

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
