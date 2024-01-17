import { useState } from 'react'


const Button = (props) => {
  return (

      <button onClick={() => props.var(props.val + 1)}> 
        {props.name}
    </button>

  )
}
const Statisticsline = (props) => {
  return(
    <tbody>
      <tr>
        <th align='left'>{props.name}:</th> 
        <td >{props.value}</td>
      </tr>
    </tbody>
    )
  
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  if (good + bad + neutral === 0){
    return (
      <div>
      <h1>Give feedback</h1>
      <Button var={setGood} val={good} name="good"/> 
      <Button var={setNeutral} val={neutral} name="neutral"/>
      <Button var={setBad} val={bad} name="bad"/>

      <h1>Statistics</h1>
      <p>No feedback given</p>
      
  

    </div>
    )
  }{
  return (
    <div>
      <h1>Give feedback</h1>
      <Button var={setGood} val={good} name="good"/> 
      <Button var={setNeutral} val={neutral} name="neutral"/>
      <Button var={setBad} val={bad} name="bad"/>

      <h1>Statistics</h1>
      <table>
        <Statisticsline name="good" value={good} />
        <Statisticsline name="neutral" value={neutral} />
        <Statisticsline name="bad" value={bad} />
        <Statisticsline name="all" value={good+bad+neutral} />
        <Statisticsline name="average" value={(good * 1 + bad * -1) / (good+bad+neutral)} />
        <Statisticsline name="positive" value={(good / (good+bad+neutral))*100+ '%'}/>
      </table>

    </div>
  )}
}

export default App