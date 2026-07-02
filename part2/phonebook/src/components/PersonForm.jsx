const PersonForm = ({ onsbt, newPerson, validate }) => {
  return <>
    <form onSubmit={onsbt}>
      <table>
        <tbody>
          <tr><td>name:</td><td><input name='name' value={newPerson.name} onChange={validate} /></td></tr>
          <tr><td>number:</td><td><input name='phone' value={newPerson.phone} onChange={validate} /></td></tr>
          <tr><td><button type="submit">add</button></td></tr>
        </tbody>
      </table>
    </form>
  </>
}
export default PersonForm
