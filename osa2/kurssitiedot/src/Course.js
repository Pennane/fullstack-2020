import React from 'react'

const Header = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, i) => {
        return <Part key={i} part={part} />
      })}
    </div>
  )
}

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((a, c) => a + c.exercises, 0)
  return (
    <div>
      <p>Number of exercises {totalExercises}</p>
    </div>
  )
}

const Course = ({ name, parts }) => {
  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default Course
