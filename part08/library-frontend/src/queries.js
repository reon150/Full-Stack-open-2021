import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
      name
    }
    genres
  }
`

export const ALL_BOOKS = gql`
  query allBooks {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS} 
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const FILTERED_BOOKS = gql`
  query Query($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
      }
      genres
    }
  }
`

export const ME = gql`
  query Query {
    me {
      id
      favoriteGenre
      username
    }
  }
`

export const CREATE_BOOK = gql`
  mutation AddBook($published: Int!, $genres: [String!]!, $author: String!, $title: String!) {
    addBook(
      published: $published, 
      genres: $genres, 
      author: $author, 
      title: $title
    ) {
      title
      published
      author {
        name
      }
      genres
    } 
  }
`

export const UPDATE_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
