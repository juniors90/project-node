const { gql } = require('apollo-server-express')
module.exports = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        birthday: String! 
        age: Int!
    }
    type Query {
        getUser(userID: ID!): User!
        getAllUser: [User]
    }
    type Mutation {
        userCreate(
            username: String!
            email: String!
            birthday: String!
        ): User!
        updateUser(
            userID: ID!
            username: String!
            email: String!
            birthday: String!
        ): User!
    }
`