const { AuthenticationError } = require('apollo-server-express');
const { User, Pets } = require('../models');
const { signToken } = require('../utils/auth')

const resolver = {
    // query is the single call 
    Query: {
        users: async () => {
            return User.find();
        },

        user: async () => {
            return User.findOne({ _id: userID })
        },

        pet: async () => {
            return Pets.find();
        }

    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const profile = await User.findOne( {email });

            if (!profile) {
                throw new AuthenticationError('No profile with this email found')
            }
            
            const correctPw = await profile.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }

            const token = signTaken(profile);
            return { token, profile };
            },
        
        addUser: async ({parent, email, password}) => {
            const user = await User.create({name, email, password});
            const token = signToken(user);

            return { token, user}

            },

        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findIdAndUpdate(context.user._id, args, { new: true });
            }

            throw new AuthenticationError('Not logged in')
        }

    }


}



module.exports = resolver;