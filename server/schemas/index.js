const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const createApolloServer = (app) => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            // Add any authentication logic here if needed
        }
    });

    server.applyMiddleware({ app });
};

module.exports = createApolloServer;

