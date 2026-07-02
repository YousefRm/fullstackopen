const Note = ({ note, toggleCurrentNoteImportance }) => {
  return (<tr className="note">
    <td> {note.content}</td>
    <td><button onClick={toggleCurrentNoteImportance}>{note.important ? 'important' : 'not important'}</button> </td>
  </tr>)
}
export default Note
