const Persons = ({ persons, deletePerson }) => {
  const personList = persons.map(x =>
    <tr key={x.id}>
      <td>{x.name} {x.phone}</td>
      <td><button onClick={() => deletePerson(x.id, x.name)}>delete</button></td>
    </tr>)
  return <table><tbody>{personList}</tbody></table>
}
export default Persons
