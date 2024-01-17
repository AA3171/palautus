import { useState } from 'react'

const Topvoted = (props) => {
  let a = props.numlist[0]
  let p = 0
  let c = 1
  while (c < props.numlist.length) {
    if (a <= props.numlist[c]){
      a = props.numlist[c]
      p = c
    }
    c++
    console.log(p)
  }
  return (
    <div>
      <h1>Most likes</h1>
      <p>{props.arraylist[p]} with {props.numlist[p]} likes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0,0,0,0,0,0,0,0,0])

  const randomize = () => {
    setSelected(Math.floor(Math.random() * 8))
  }

  const addPoint = () => {
    let temp = points
    temp[selected] += 1
    setPoints(temp)
    console.log(points)
    setPoints([...points], 0)
  }
  return (
    <div>
      <p>{anecdotes[selected]}</p>
      {points[selected]}
      <button onClick={() => addPoint()}>upvote</button>
      <button onClick={() => randomize()}>button</button>
      <Topvoted numlist={points} arraylist={anecdotes} />
    </div>
  )
}

export default App