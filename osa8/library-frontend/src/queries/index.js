import { gql } from '@apollo/client'

export const ADD_BOOK = gql`
    mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
        addBook(title: $title, published: $published, author: $author, genres: $genres) {
            title
            published
            author
            genres
        }
    }
`

export const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
        }
    }
`

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            published
            author
        }
    }
`

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

const a = {
    errors: [
        {
            message: 'Cannot query field "setBornTo" on type "Author".',
            locations: [{ line: 4, column: 5 }],
            extensions: {
                code: 'GRAPHQL_VALIDATION_FAILED',
                exception: {
                    stacktrace: [
                        'GraphQLError: Cannot query field "setBornTo" on type "Author".',
                        '    at Object.Field (/Users/arttupennanen/Desktop/projects/fullstackopen2020/osa8/library-backend/node_modules/graphql/validation/rules/FieldsOnCorrectTypeRule.js:46:31)',
                        '    at Object.enter (/Users/arttupennanen/Desktop/projects/fullstackopen2020/osa8/library-backend/node_modules/graphql/language/visitor.js:323:29)',
                        '    at Object.enter (/Users/arttupennanen/Desktop/projects/fullstackopen2020/osa8/library-backend/node_modules/graphql/utilities/TypeInfo.js:370:25)',
                        '    at visit (/Users/arttupennanen/Desktop/projects/fullstackopen2020/osa8/library-backend/node_modules/graphql/language/visitor.js:243:26)',
                        '    at Object.validate (/Users/arttupennanen/Desktop/projects/fullstackopen2020/osa8/library-backend/node_modules/graphql/validation/validate.js:69:24)',
                        '    at validate (/Users/arttupennanen/Desktop/projects/fullstackopen2020/osa8/library-backend/node_modules/apollo-server-core/dist/requestPipeline.js:221:34)',
                        '    at Object.<anonymous> (/Users/arttupennanen/Desktop/projects/fullstackopen2020/osa8/library-backend/node_modules/apollo-server-core/dist/requestPipeline.js:118:42)',
                        '    at Generator.next (<anonymous>)',
                        '    at fulfilled (/Users/arttupennanen/Desktop/projects/fullstackopen2020/osa8/library-backend/node_modules/apollo-server-core/dist/requestPipeline.js:5:58)',
                        '    at processTicksAndRejections (node:internal/process/task_queues:93:5)'
                    ]
                }
            }
        }
    ]
}
