require("dotenv").config();
const { createServer } = require('http');
const { ApolloServer, PubSub } = require('apollo-server-express');
const typeDefs = require('./graphql/typeDefs.js');
const resolvers = require('./graphql/resolvers/index.js');
const express = require("express");
const mongoose = require("mongoose");


// async function newServer() {
const newServer = async () => {
  const app = express();
  const port = 3000;
  const httpServer = createServer(app);
  const pubsub = new PubSub();
  const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({req}) => ({
          req, pubsub
      })
    });
  server.applyMiddleware({ app, path: '/graphql'});

  await mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("✔️ ¡Conectado con la base de datos!");
    })
    .catch((err) => {
      console.log("❌ ¡ERROR: No se pudo conectar con la base de datos!" + err);
      process.exit();
    });
    
   httpServer.listen(port, () => {
    console.log(`Estoy en http://localhost:${port}${server.graphqlPath}`);
  });
};

newServer();
