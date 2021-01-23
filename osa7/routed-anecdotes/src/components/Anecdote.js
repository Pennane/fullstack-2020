import React from 'react'

const Anecdote = ({ anecdote }) => (
  <div className="anecdote">
    <p>{anecdote.content}</p>
    <p>Author: {anecdote.author}</p>
    <p>{anecdote.info}</p>
    <p>Votes: {anecdote.votes}</p>
  </div>
)

export default Anecdote
