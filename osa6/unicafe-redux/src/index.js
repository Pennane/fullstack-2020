import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const all = () => [values.good, values.neutral, values.bad].reduce((a, c) => a + c, 0)
  const average = () => {
    let val = (values.good * 1 + values.bad * -1) / all()
    return isNaN(val)
      ? 0
      : val.toLocaleString('fi-FI', {
          maximumFractionDigits: 2
        })
  }

  const positive = () => parseInt((values.good / all()) * 100) || 0

  let values = {
    good: store.getState().good,
    neutral: store.getState().neutral,
    bad: store.getState().bad
  }

  let computedValues = {
    all: all(),
    average: average(),
    positive: positive()
  }

  const incrementGood = () => {
    store.dispatch({
      type: 'INCREMENT_GOOD'
    })
  }
  const incrementneutral = () => {
    store.dispatch({
      type: 'INCREMENT_neutral'
    })
  }
  const incrementBad = () => {
    store.dispatch({
      type: 'INCREMENT_BAD'
    })
  }
  const reset = () => {
    store.dispatch({
      type: 'RESET_STATE'
    })
  }

  return (
    <div>
      <h1>unicafe redux</h1>
      <h2>give feedback</h2>
      <button onClick={incrementGood}>good</button>
      <button onClick={incrementneutral}>neutral</button>
      <button onClick={incrementBad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <h2>statistics</h2>
      <div>good {values.good}</div>
      <div>neutral {values.neutral}</div>
      <div>bad {values.bad}</div>
      <div>all {computedValues.all}</div>
      <div>average {computedValues.average}</div>
      <div>positive {computedValues.positive}%</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
