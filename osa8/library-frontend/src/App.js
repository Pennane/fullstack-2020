import React, { useState } from 'react'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
    const bookResult = useQuery(ALL_BOOKS)

    const client = useApolloClient()

    const [page, setPage] = useState('authors')

    const updateCacheWith = (addedBook) => {
        console.log('updating cache')
        const includedIn = (set, object) => set.map((p) => p.id).includes(object.id)

        const dataInStore = client.readQuery({ query: ALL_BOOKS })
        if (!includedIn(dataInStore.allBooks, addedBook)) {
            client.writeQuery({
                query: ALL_BOOKS,
                data: { allBooks: dataInStore.allBooks.concat(addedBook) }
            })
        }
    }

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const addedBook = subscriptionData.data.bookAdded
            console.log('new book')
            window.alert(`${addedBook.title} added`)
            updateCacheWith(addedBook)
        }
    })

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                <button onClick={() => setPage('add')}>add book</button>
            </div>

            <Authors show={page === 'authors'} />

            <Books show={page === 'books'} result={bookResult} />

            <NewBook show={page === 'add'} updateCacheWith={updateCacheWith} />
        </div>
    )
}

export default App
