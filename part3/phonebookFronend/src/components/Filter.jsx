import { useState } from 'react'
const Filter = ({ persons }) => {
  const [target, setTarget] = useState('');
  const search = (e) => {
    const newTarget = e.target.value;
    setTarget(newTarget);
  }
  return <>
    <input type="search" value={target} onChange={search} />
    {persons.filter(x => typeof x.name === 'string' && x.name.toLowerCase() === target.toLowerCase()).map(x => <p key={x.id}>{x.name} {x.phone}</p>)}
  </>
}
export default Filter
