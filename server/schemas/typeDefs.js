const { gpl } = require('apollo-server-express')

const typeDefs = gql`

type User {
    _id: ID
    username: String
    email: String
    password: String
}


type Query {
    user: [User]
    user(username: String!): User
    pets(username: String)
    me: User

}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Th
    removeComment(thoughtId: ID!, commentId: ID!): Thought

}


`

module.exports = typeDefs;