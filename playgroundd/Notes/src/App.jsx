import { useEffect, useState } from 'react'
import Note from './components/Note'
import Notification from './components/Notification.jsx'
import noteService from './services/notes.js'
import Footer from './components/Footer.jsx'
const App = () => {
  const emptyNote = { id: '', content: '', important: '' }
  const [notes, setNotes] = useState([]);
  const [showImportantOnly, setShowImportantOnly] = useState(false)
  const [newNote, setNewNote] = useState(emptyNote)
  const [errMsg, setErrMsg] = useState(null)
  useEffect(() => {
    noteService.getAll().then(dataBaseNotes => setNotes(dataBaseNotes))
  }, [])
  const handleInputChange = (e) => {
    setNewNote({ ...newNote, content: e.target.value })
  }
  const sendNote = (e) => {
    e.preventDefault()
    const theNoteToSend = {
      id: String(notes.length + 1),
      content: newNote.content,
      important: Math.random() < 0.5
    }
    noteService.create(theNoteToSend).then(createdNote => {
      setNotes(notes.concat(createdNote))
      setNewNote(emptyNote)
    })
  }
  const toggleNoteImportance = (id) => {

    const targetNote = notes.find(x => x.id === id);
    const changedNote = { ...targetNote, important: !targetNote.important }
    noteService.update(id, changedNote).then(updatedNote => {
      setNotes(notes.map(x => x.id !== id ? x : updatedNote))
    }).catch(() => {
      setErrMsg(`the note ${targetNote.content} has already been deleted from the server`);
      setTimeout(() => setErrMsg(null), 5000)
      setNotes(notes.filter(x => x.id !== id))
    })
  }
  const importantOnlyNoteList = notes.filter(x => x.important).map(x => <Note key={x.id} note={x} toggleCurrentNoteImportance={() => toggleNoteImportance(x.id)} />);
  const noteList = notes.map(x => <Note key={x.id} note={x} toggleCurrentNoteImportance={() => toggleNoteImportance(x.id)} />);
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errMsg} />
      <table>
        <tbody>
          {showImportantOnly ? importantOnlyNoteList : noteList}
        </tbody>
      </table>
      <button onClick={() => setShowImportantOnly(!showImportantOnly)}>Show {showImportantOnly ? 'All' : 'important only'}</button>
      <form onSubmit={sendNote}>
        <input value={newNote.content} onChange={handleInputChange} />
        <button type='submit'>Send</button>
      </form>
      <Footer />
    </div>
  )
}
export default App
