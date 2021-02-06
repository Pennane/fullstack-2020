import React from 'react'
import ReactDOM from 'react-dom'
import Part from './components/Part'
import { CoursePart } from './types'

const App: React.FC = () => {
    const courseName = 'Half Stack application development'
    const courseParts: CoursePart[] = [
        {
            name: 'Fundamentals',
            exerciseCount: 10,
            description: 'This is an awesome course part'
        },
        {
            name: 'Using props to pass data',
            exerciseCount: 7,
            groupProjectCount: 3
        },
        {
            name: 'Deeper type usage',
            exerciseCount: 14,
            description: 'Confusing description',
            exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev'
        },
        {
            name: 'Love for typescript',
            exerciseCount: 14,
            description: 'tybescib is nice'
        }
    ]

    return (
        <div>
            <h1>{courseName}</h1>
            {courseParts.map((part) => (
                <Part part={part}></Part>
            ))}
            <p>Number of exercises {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}</p>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
