const { AuthenticationError } = require('apollo-server-express');
const { User, Thought } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) = {
            // first create the user
            const user = await User.create( { username, email, password });
            // reduce friction for the user - sign in json webtoken
            const token = signToken(user)

        }
    }
}

module.exports = resolvers