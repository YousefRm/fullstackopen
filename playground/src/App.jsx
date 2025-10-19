import { useState } from 'react'
const Button = ({ onBtnClick, text }) => {
  return <button onClick={onBtnClick}>{text}</button>
}
const Display = ({ num }) => {
  return <h1>{num}</h1>
}
const History = ({ hist }) => {
  if (hist.length === 0) { return <p>click the button to start</p> }
  return <p>button click history {hist.join('')}</p>
}
const App = () => {
  const [clicks, setClicks] = useState({ left: 0, right: 0 })
  const [counter, setCounter] = useState(0);
  const [allClicks, setAllClicks] = useState([]);
  const [total, setTotal] = useState(0);
  const increaseClick = () => setCounter(counter + 1);
  const decreaseClick = () => setCounter(counter - 1);
  const resetClick = () => setCounter(0);
  const clickLeft = () => { setAllClicks(allClicks.concat('L')); let updatedLeft = clicks.left + 1; setClicks({ ...clicks, left: updatedLeft }); setTotal(clicks.right + updatedLeft) }
  const clickRight = () => { setAllClicks(allClicks.concat('R')); let updatedRight = clicks.right + 1; setClicks({ ...clicks, right: updatedRight }); setTotal(updatedRight + clicks.left) }
  return (
    <div>
      <Display num={counter} />
      <Button text='Increase' onBtnClick={increaseClick} />
      <Button text='decrease' onBtnClick={decreaseClick} />
      <Button text='reset' onBtnClick={resetClick} />
      <div>
        {clicks.left}
        <Button onBtnClick={clickLeft} text='left' />
        <Button onBtnClick={clickRight} text='right' />
        {clicks.right}
        <History hist={allClicks} />
      </div>
    </div>
  )
}
export default App 
