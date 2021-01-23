import React, { useState } from 'react'

import { useField } from '../hooks'

const CreateNew = (props) => {
    const { reset: contentReset, ...content } = useField({ name: 'content', type: 'text' })
    const { reset: authorReset, ...author } = useField({ name: 'author', type: 'text' })
    const { reset: infoReset, ...info } = useField({ name: 'url', type: 'text' })

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content,
            author,
            info,
            votes: 0
        })
    }

    const reset = () => {
        contentReset()
        authorReset()
        infoReset()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...content} />
                </div>
                <div>
                    author
                    <input {...author} />
                </div>
                <div>
                    url for more info
                    <input {...info} />
                </div>
                <button type="submit">create</button>
                <button type="button" onClick={reset}>
                    reset
                </button>
            </form>
        </div>
    )
}

export default CreateNew
