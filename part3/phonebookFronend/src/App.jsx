import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personFormService from './services/personForm.js'
import Notification from './components/Notification.jsx'
const App = () => {
  const [persons, setPersons] = useState([])
  const emptyPerson = { name: '', phone: '' }
  const emptyMsg = { name: '', type: '' }
  const [newPerson, setNewPerson] = useState(emptyPerson)
  const [msg, setMsg] = useState(emptyMsg)
  const removeNotification = () => { setTimeout(() => setMsg(emptyMsg), 5000) }
  useEffect(() => { personFormService.getAll().then(allPersons => setPersons(allPersons)) }, [])

  const addPerson = (e) => {
    e.preventDefault()
    //checking if the name of the person is empty
    if (!newPerson.name) {
      setMsg({ name: 'the name cant be empty', type: 'error' });
      removeNotification();
      return;
    };
    //checking if the person name is already existing or not
    const existing = persons.find(person => person.name === newPerson.name);
    const confirmReplace = () => window.confirm(`${newPerson.name} is already in the phonebook.replcae the old number with a new one?`);
    if (existing) {
      if (!confirmReplace()) {
        setNewPerson(emptyPerson);
        setMsg({ name: `replace of ${existing.name} cancelled`, type: 'error' })
        removeNotification()
        return
      }
      //if it exist update its value
      personFormService.update(existing.id, newPerson).then(returnedPerson => {
        setPersons(persons.map(x => x.id === existing.id ? returnedPerson : x))
        setNewPerson(emptyPerson)
        setMsg({ name: `${returnedPerson.name} updated succesfully`, type: 'succes' })
        removeNotification()
      }).catch((err) => {
        setMsg({ name: `information on ${existing.name} has been removed from the server`, type: 'error' })
        removeNotification()
        setPersons(persons.filter(x => x.id !== existing.id))
        setNewPerson(emptyPerson)
      })
      return
    }
    //after the checking create a new person and send it to the server
    personFormService.create(newPerson).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));
      setNewPerson(emptyPerson)
      setMsg({ name: `Added ${returnedPerson.name}`, type: 'succes' })
      removeNotification()
    })
  }
  //bind user input to the new pserson value 
  const validate = (e) => {
    const { name, value } = e.target;
    setNewPerson({ ...newPerson, [name]: value })
  }
  //delete person
  const deletePerson = (id, name) => {
    personFormService.remove(id, name).then(() => {
      setPersons(persons.filter(x => x.id !== id))
      setMsg({ name: `deleting ${name} succeded`, type: 'succes' })
      removeNotification()
    }).catch(() => {
      setMsg({ name: `deleting ${name} canceled`, type: 'error' })
      removeNotification()
    })
  }

  return <>
    <h1>Phone Book</h1>
    <Notification message={msg.name} type={msg.type} />
    filter numbers:<Filter persons={persons} />
    <h2>Add a new</h2>
    <PersonForm onsbt={addPerson} newPerson={newPerson} validate={validate} />
    <h2>Numbers</h2>
    <Persons persons={persons} deletePerson={deletePerson} />
  </>
}
export default App
