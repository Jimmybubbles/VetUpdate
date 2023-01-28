const express = require('express');
const { ApolloServer } = require('apollo-server-express')
const path = require('path')
const { authMiddleware } = require('./server/utils/auth')

// deconstruct the typedefs and resolvers 
const { typeDefs, resolvers } = require('./server/schemas');
const db = require('./server/config/connection');

const PORT = process.env.PORT || 3001;
// create a express server object
const app = express();

// create a NEW instantiation of apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// create a new instance of an Apollo server with GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http:/localhost:${PORT}${server.graphqlPath}`)
        })
    })

};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);