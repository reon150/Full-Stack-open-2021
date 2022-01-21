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

export const ALL_BOOKS = gql`
  query allBooks {
    allBooks {
      title
      published
      author {
        name
      }
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
      author
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
