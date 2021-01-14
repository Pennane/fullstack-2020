import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const randomIntegerFromRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const mapAnecdotesToVotable = (arr) => {
  return arr.map((anecdote, i) => {
    return {
      text: anecdote,
      votes: 0,
      index: i
    }
  })
}

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>
}

const Anecdote = ({ text, votes }) => {
  return (
    <div className="anecdote">
      <p>{text}</p>
      <p>votes: {votes}</p>
    </div>
  )
}

const App = (props) => {
  const [votableAnecdotes, setVotableAnecdotes] = useState(mapAnecdotesToVotable(anecdotes))
  const [anecdoteIndex, setAnecdoteIndex] = useState(randomIntegerFromRange(0, votableAnecdotes.length - 1))

  const anecdote = votableAnecdotes[anecdoteIndex]

  const mostVoted = votableAnecdotes.reduce(
    (mostVoted, current) => (current.votes > mostVoted.votes ? current : mostVoted),
    anecdote
  )

  const newAnecdote = () => setAnecdoteIndex(randomIntegerFromRange(0, votableAnecdotes.length - 1))
  const voteAnecdote = (i) => {
    const _anecdotes = [...votableAnecdotes]
    _anecdotes[i].votes++
    setVotableAnecdotes(_anecdotes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdote.text} votes={anecdote.votes} />
      <Button text="vote" handleClick={() => voteAnecdote(anecdoteIndex)} />
      <Button text="random anecdote" handleClick={() => newAnecdote()} />
      {mostVoted.votes > 0 && (
        <div>
          <h1>Most voted anecdote</h1>
          <Anecdote text={mostVoted.text} votes={mostVoted.votes} />
        </div>
      )}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
