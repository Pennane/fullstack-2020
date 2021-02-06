import React from 'react'
import { CoursePart } from '../types'
import { assertNever } from '../utils'

interface PartProps {
    part: CoursePart
}

const AdditionalPartData = (props: PartProps): JSX.Element | null => {
    const { part } = props
    switch (part.name) {
        case 'Fundamentals':
            return (
                <>
                    <p>{part.description}</p>
                </>
            )
        case 'Using props to pass data':
            return <>Group project count: {part.groupProjectCount}</>
        case 'Deeper type usage':
            return (
                <>
                    <p>{part.description}</p>
                    <p>{part.exerciseSubmissionLink}</p>
                </>
            )
        case 'Love for typescript':
            return (
                <>
                    <p>{part.description}</p>
                </>
            )
        default:
            assertNever(part)
            return null
    }
}

const Part = (props: PartProps) => {
    const { part } = props
    return (
        <div>
            <h3>{part.name}</h3>
            <p>Exercises: {part.exerciseCount}</p>
            <AdditionalPartData part={part} />
        </div>
    )
}

export default Part
