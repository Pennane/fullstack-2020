require('dotenv').config()

const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const JWT_SECRET = process.env.JWT_SECRET
const MONGODB_URI = process.env.MONGODB_URI

mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = gql`
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

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
        bookCount: Int
        id: ID!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book]!
        allAuthors: [Author]!
        me: User
    }

    input AuthorInput {
        name: String!
        born: Int
    }

    type Mutation {
        addBook(title: String!, published: Int!, author: AuthorInput, genres: [String!]!): Book
        editAuthor(name: String!, setBornTo: Int!): Author
        createUser(username: String!, password: String!, favoriteGenre: String!): User
        login(username: String!, password: String!): Token
    }
`

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (args.author && args.genre) {
                return Book.find({ author: args.author, genres: { $in: [args.genre] } }).populate('author')
            } else if (args.author) {
                return awaitBook.find({ author: args.author }).populate('author')
            } else if (args.genre) {
                return Book.find({ genres: { $in: [args.genre] } }).populate('author')
            }

            return Book.find({}).populate('author')
        },
        allAuthors: () => {
            return Author.find()
        },
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Author: {
        bookCount: (root) => Book.countDocuments({ author: root.id })
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new Error('not authenticated')
            }

            let existingAuthor = await Author.findOne({ name: args.author.name })
            let author
            if (!existingAuthor) {
                author = new Author({ name: args.author.name })
                try {
                    await author.save()
                } catch (exception) {
                    throw new UserInputError(exception.message, {
                        invalidArgs: args
                    })
                }
            } else {
                author = existingAuthor
            }

            const book = new Book({ ...args, author: author.id })
            try {
                await book.save()
            } catch (exception) {
                throw new UserInputError(exception.message, {
                    invalidArgs: args
                })
            }
            const savedBook = await Book.populate(book, { path: 'author' })
            return savedBook
        },
        editAuthor: (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new Error('not authenticated')
            }

            let author = Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo })
            return author
        },
        createUser: async (root, args) => {
            let existingUser = await User.findOne({ username: args.username })
            if (existingUser) throw new Error('Username already in use')

            const saltRounds = 10
            const passwordHash = await bcrypt.hash(args.password, saltRounds)

            let newUser = new User({ ...args, passwordHash })
            try {
                let savedUser = await newUser.save()
                return savedUser
            } catch (exception) {
                throw new UserInputError(exception.message, {
                    invalidArgs: args
                })
            }
        },
        login: async (root, args) => {
            const existingUser = await User.findOne({ username: args.username })

            if (!existingUser) throw new UserInputError('wrong credentials')

            const passwordCorrect =
                existingUser === null ? false : await bcrypt.compare(args.password, existingUser.passwordHash)
            if (!passwordCorrect) {
                throw new UserInputError('wrong credentials')
            }

            const userForToken = {
                username: existingUser.username,
                id: existingUser._id
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
            const currentUser = await User.findById(decodedToken.id).populate('friends')
            return { currentUser }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
