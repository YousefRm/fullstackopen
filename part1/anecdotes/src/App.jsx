import { useState } from 'react'
const Heading = ({ text }) => {
  return <h1>{text}</h1>
}
const Label = ({ text }) => {
  return <p>{text}</p>
}
const Button = ({ text, onbtnclick }) => {
  return <button onClick={onbtnclick} >{text}</button>
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  let ri = Math.floor(Math.random() * anecdotes.length);
  const [currentAnicdote, setCurrentAnicdote] = useState([anecdotes[ri], ri]);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [mostVotes, setMostVotes] = useState([anecdotes[0], 0]);
  let currentMax = 0;
  const generateRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    if (randomIndex === currentAnicdote[1]) { return generateRandomAnecdote() }
    setCurrentAnicdote([anecdotes[randomIndex], randomIndex]);

  }
  const voteCurrentAnicdote = () => {
    const newVotes = votes.slice();
    newVotes[currentAnicdote[1]]++;
    setVotes(newVotes);
    if (newVotes[currentAnicdote[1]] >= currentMax) {
      const highestVote = newVotes.indexOf(Math.max(...newVotes));
      currentMax = newVotes[highestVote];
      setMostVotes([anecdotes[highestVote], highestVote])
    }
  }
  return (
    <div>
      < Heading text='Anecdote of the day' />
      <Label text={currentAnicdote[0]} />
      <Label text={`has ${votes[currentAnicdote[1]]} votes`} />
      <Button text='vote' onbtnclick={voteCurrentAnicdote} />
      <Button text='next anecdote' onbtnclick={generateRandomAnecdote} />
      <Heading text='Anecdote with most votes' />
      <Label text={mostVotes[0]} />
      <Label text={`has ${votes[mostVotes[1]]} votes`} />

    </div>
  )
}
export default App
