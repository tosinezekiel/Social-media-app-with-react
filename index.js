const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Post = require('./models/Post');
const { MONGODB } = require('./config');

const typeDefs = gql`
    type Post {
        id: ID!,
        title: String!,
        body: String!,
        username: String!,
        createdAt: String!
    }
    type Query {
        getPosts: [Post]
    }
`

const resolvers = {
    Query: {
        async getPosts() {
            try{
                const posts = await Post.find();
                return posts;
            }catch(err){
                throw new err(err);
            }
        }
    }
}

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