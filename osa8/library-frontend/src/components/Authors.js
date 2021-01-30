import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries/index'

const Authors = (props) => {
    let [name, setName] = useState('')
    let [birthyear, setBirthyear] = useState()

    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }]
    })

    const submit = (event) => {
        event.preventDefault()

        editAuthor({
            variables: {
                name,
                setBornTo: Number(birthyear)
            }
        })

        setName('')
        setBirthyear()
    }

    const result = useQuery(ALL_AUTHORS, {
        pollInterval: 30000
    })

    if (!props.show) {
        return null
    }

    if (result.loading) {
        return <div>loading...</div>
    }

    const authors = result.data.allAuthors

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {authors.map((a) => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <h3>Set birthyear</h3>
                <form onSubmit={submit}>
                    <div>
                        name
                        <input value={name} onChange={({ target }) => setName(target.value)} />
                    </div>
                    <div>
                        birthyear
                        <input type="number" value={birthyear} onChange={({ target }) => setBirthyear(target.value)} />
                    </div>
                    <button type="submit">Edit</button>
                </form>
            </div>
        </div>
    )
}

export default Authors
