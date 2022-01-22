
import {
  useSubscription, useApolloClient
} from '@apollo/client'
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import BooksRecomendations from './components/BooksRecomendations'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const bookAdded = subscriptionData.data.bookAdded;
      const booksInCache = client.readQuery({ query: ALL_BOOKS });
      if (!booksInCache.allBooks.map(b => b.title).includes(bookAdded.title)) {
        console.log('IN')
        client.writeQuery({
          query: ALL_BOOKS,
          data: { allBooks: booksInCache.allBooks.concat(bookAdded) },
        });
      }
      window.alert(`The '${bookAdded.title}' book has been added`)
    }
  })


  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token !== null 
          ? <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommend')}>recommend</button>
              <button onClick={logout}>logout</button>
            </>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm 
        show={page === 'login'}
        setToken={setToken}
      /> 

      <BooksRecomendations
        show={page === 'recommend'}
      />

    </div>
  )
}

export default App
