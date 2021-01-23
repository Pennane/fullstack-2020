import React, { useState } from 'react'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'

import Footer from './components/Footer'
import Menu from './components/Menu'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'

import AnecdoteList from './views/AnecdoteList'
import About from './views/About'
import CreateNew from './views/CreateNew'

const initialAnecdotes = [
  {
    content: 'If it hurts, do it more often',
    author: 'Jez Humble',
    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
    votes: 0,
    id: '1'
  },
  {
    content: 'Premature optimization is the root of all evil',
    author: 'Donald Knuth',
    info: 'http://wiki.c2.com/?PrematureOptimization',
    votes: 0,
    id: '2'
  }
]

const App = () => {
  const [anecdotes, setAnecdotes] = useState(initialAnecdotes)
  const [notification, setNotification] = useState('')

  const history = useHistory()

  const match = useRouteMatch('/anecdotes/:id')

  const currentAnecdote = match ? anecdotes.find((a) => Number(a.id) === Number(match.params.id)) : null

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote '${anecdote.content}' has been created!`)
    history.push('/anecdotes')
    setTimeout(() => {
      setNotification('')
    }, 10000)
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={notification} />
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={currentAnecdote} />
        </Route>
        <Route path="/anecdotes">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App
