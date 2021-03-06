const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const { MONGODB } = require('./config');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers/index');

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, { useNewUrlParser:true })
    .then(() => {
        console.log('DB connected successfully!!');
        return server.listen({port:5000});
    }).then( res => {
    console.log(`Server is running on ${res.url}`);
})