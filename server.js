const express = require('express');
const bodyParser = require('body-parser');
// exports a valid middleware function 
// takes incoming requests and funnels them to parse to right resolvers.
const { graphqlHTTP } = require('express-graphql');
// import destructured data from graphql

const { buildSchema } = require('graphql')

// create a express server object
const app = express();
// create port variable to be parsed to listen
const PORT = 3001;

// body parser middleware
app.use(bodyParser.json())

// test route hello world
// app.get('/', (req, res, next) => {
//     res.send('hello world!');
// })

// graphql has one end point where requests are sent
// build schema, imported from graphql to
// build a template literal string to pass to javascript objects later
// queries = fetch data
// mutation = change data (CRUD)
app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`

        type RootQuery {
            events: [String!]!
        }

        type RootMutation {
            createEvent(name: String): String

        }


        schema { 
           query: RootQuery
           mutation: RootMutation
        }
    
    `),
    // bundles the resolvers 
    rootValue: {
        events: () => {
            return ['pet surgery', 'pet vaccination', 'pet checkup']
        },

        createEvent: (args) => {
            const eventName = args.name;
            return eventName;
        }

    },
    graphiql: true
})
);

app.listen(PORT, () =>
  console.log(`Listening for requests on port ${PORT}! 🏎️`)
);