const { gql } = require('apollo-server');

module.exports = gql`
    type Post {
        id: ID!
        title: String!
        body: String!
        username: String!
        createdAt: String!
    }
    type Users{
        id: ID!
        username: String!
        email: String!
        createdAt: String!
    }
    type User {
        id: ID!
        username: String!
        email: String!
        token: String!
        createdAt: String!
    }
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query {
        getPosts: [Post],
        getUsers: [Users]
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
    }
`