import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>
}

const Statistics = ({ statistics }) => {
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          {statistics.map((statistic) => {
            return <StatisticLine name={statistic.name} value={statistic.value} key={statistic.name} />
          })}
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({ name, value }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = () => [good, neutral, bad].reduce((a, c) => a + c, 0)
  const average = () => (good * 1 + bad * -1) / all() || 0
  const positive = () => good / all() || 0

  const statistics = [
    { name: 'good', value: good },
    { name: 'neutral', value: neutral },
    { name: 'bad', value: bad },
    { name: 'all', value: all() },
    { name: 'average', value: average() },
    { name: 'positive', value: positive() + '%' }
  ]

  return (
    <div>
      <div>
        <h2>give feedback</h2>
        <Button text="good" handleClick={() => setGood(good + 1)} />
        <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
        <Button text="bad" handleClick={() => setBad(bad + 1)} />
      </div>
      <Statistics statistics={statistics} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
