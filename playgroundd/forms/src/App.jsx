import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
const App = ({ people }) => {
  const [persons, setPersons] = useState(people)
  const filterPeople = () => {

  }
  const addPerson = () => {

  }
  return <>
    <h1>Phone Book</h1>
    <Filter onsbt={filterPeople} />
    <h2>Add a new</h2>
    <PersonForm onsbt={addPerson} />
    <h2>Numbers</h2>
    <Persons persons={people} />
  </>
}
export default App
