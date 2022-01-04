const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

const MONGODB_URI = 'mongodb://localhost:27017/library-graphql?retryWrites=true'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }
  
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String
      genre: String
    ): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      let filteredBooks = books;
      if (args.author)
        filteredBooks = filteredBooks.filter(b => b.author === args.author)
      
      if (args.genre)
        filteredBooks = filteredBooks.filter(b => b.genres.includes(args.genre))
      
      return filteredBooks
    },
    allAuthors: () => authors,
  },
  Mutation: {
    addBook: async (root, args) => {
      let book = new Book({ ...args })
      const author = new Author({ name: args.author })
      try {
        await author.save()
        book.author = author
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      
      return book
    },
    editAuthor: (root, args) => {
      let updatedAuthor = authors.find(a => a.name === args.name)
      if (!updatedAuthor) return null
      updatedAuthor = { ...updatedAuthor, born: args.setBornTo }
      authors = authors.map(a => a.name !== args.name ? a : updatedAuthor)
      return updatedAuthor
    }
  },
  Author: {
    bookCount: (root) => books.filter(b => b.author === root.name).length
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
