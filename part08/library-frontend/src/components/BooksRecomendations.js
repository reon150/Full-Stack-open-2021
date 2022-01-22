import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { FILTERED_BOOKS, ME } from '../queries'
import BooksTable from './BooksTable'

const BooksRecomendations = (props) => {
  const user = useQuery(ME)
  const [getFavoriteBooks, result] = useLazyQuery(FILTERED_BOOKS)
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [setBooks, result.data])

  useEffect(() => {
    if (!user.loading) {
      getFavoriteBooks({ variables: { genre: user.data.me.favoriteGenre } })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getFavoriteBooks, user.loading])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{user.data.me.favoriteGenre}</strong></p>
      <BooksTable books={books} />
    </div>
  )
}

export default BooksRecomendations
