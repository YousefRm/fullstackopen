import { useEffect, useState } from 'react'
import axios from 'axios'
const App = () => {
  const [notes, setNotes] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3001/notes').then(response => setNotes(response.data))
  }, [])
  console.log('hi')
  return notes.map(note => <h1 key={note.id}>{note.content}</h1>)
}
export default App
