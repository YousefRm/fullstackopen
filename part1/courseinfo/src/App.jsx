const Part = (props) => {
  return (
    <p>{props.text}{props.exercise} </p>
  )
}
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}
const Content = (props) => {
  let partsArray = [];
  for (let i = 0; i < 3; i++) {
    partsArray.push(<Part key={i} text={props.textArray[i]} exercise={props.exarray[i]} />);
  }
  return partsArray
}
const Total = (props) => {
  return (
    <p> Number of exercises {props.tootal}</p>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack Application Development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      }, {
        name: 'Using props to pass data',
        exercises: 7
      }, {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  const exercisesArray = course.parts.map(part => part = part.exercises);
  return (
    <>
      <Header course={course.name} />
      <Content textArray={course.parts.map(part => part = part.name)} exarray={exercisesArray} />
      <Total tootal={exercisesArray.reduce((acc, num) => acc += num)} />
    </>
  )
}
export default App
