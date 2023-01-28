const { gql } = require('apollo-server-express')

const typeDefs = gql `

    type User {
        _id: ID!
        name: String!
        email: String
        password: String
    }

    type Pet {
        _id: ID!
        name: String
        breed: String
        sex: String
        age: Int
        vaccination: Boolean
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User!]!
        user(userId: ID!): User
        me: User
        pets(name: String): [Pet]
        
    }

    type Mutation {
        addUser(name: String!, email:String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        updateUser(username: String, email: String, password: String): User
        updatePet(_id: ID!, name: String, breed, String, sex, String, age: Int, vaccination: Boolean)
    }

`;

module.exports = typeDefs;