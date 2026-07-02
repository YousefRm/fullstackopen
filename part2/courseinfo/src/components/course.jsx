const Line = ({ title, exerices }) => {
  return <p>{title} {exerices}</p>
}
const Section = ({ parts, title }) => {
  const lists = parts.map(x => <Line key={x.id} title={x.name} exerices={x.exercises} />)
  const total = parts.reduce((acc, x) => {
    return acc + x.exercises
  }, 0)
  return (
    <>
      <h2>{title}</h2>
      {lists}
      <h3>total of {total} exercises</h3>
    </>

  )
}
const Courses = ({ courses }) => {
  const lists = courses.map(x => <Section key={x.id} parts={x.parts} title={x.name} />)
  return lists
}
export default Courses
