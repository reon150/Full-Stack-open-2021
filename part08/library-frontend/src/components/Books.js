import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import BooksTable from './BooksTable'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('All')

  useEffect(() => {
    if (!result.loading) {
      const allBooks = result.data.allBooks
      setBooks(allBooks)
      let genres = ['All']
      allBooks.forEach(book => {
        book.genres.forEach((genre) => {
          if (genres.indexOf(genre) === -1) {
            genres.push(genre)
          }
        })
      })
      setGenres(genres)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  useEffect(() => {
    if (selectedGenre === 'All') {
      setFilteredBooks(books)
    } else {
      setFilteredBooks(
        books.filter((book) => book.genres.indexOf(selectedGenre) !== -1)
      )
    }
  }, [books, selectedGenre])

  if (result.loading)  {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <BooksTable books={filteredBooks} />
      <div>
        {genres.length > 0 &&
          genres.map((genre) => (
            <button onClick={() => setSelectedGenre(genre)} key={genre}>
              {genre}
            </button>
          ))}
      </div>
    </div>
  )
}

export default Books