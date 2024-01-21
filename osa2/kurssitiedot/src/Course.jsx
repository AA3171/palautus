
const Course = (props) => {
    return (
      props.course.map((coursesList) => (
        <div key={coursesList.name}>
        <Header course={coursesList} />
        <Content course={coursesList} />
        <Total course={coursesList} />
        </div>
      ))
    )
  }
  const Header = (props) => {
    return (
      <div>
        <h1>{props.course.name}</h1>
      </div>
    )
  }
  const Content = (props) => {
    return (
      props.course.parts.map((courseProp) => (
        <div key={courseProp.name}>
          <Part text = {courseProp.name} num = {courseProp.exercises} />
        </div>
      ))
    )
  }
  const Total = (props) => {
    console.log
    const summa = props.course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises,
    0,
  );
    return (
      <div>
        <p><b>Total number of exercises {summa}</b></p>
      </div>
    )
  
  }
  const Part = (props) => {
    return (
      <div>
        <p>{props.text} {props.num}</p>
      </div>
    )
  }
export default Course