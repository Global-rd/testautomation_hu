const users = [
    { id: '1', name: 'Alice', email: 'alice@example.com', nick: 'Ally' },
    { id: '2', name: 'Bob', email: 'bob@example.com', nick: null },
];

import { ApolloServer } from '@apollo/server';
import cors from 'cors';
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';

const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    nick: String
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!, nick: String): User
  }
`;

const resolvers = {
    Query: {
        users: () => users,
    },
    Mutation: {
        createUser: (_, { name, email, nick }) => {
            const newUser = {
                id: (users.length + 1).toString(),
                name,
                email,
                nick,
            };
            users.push(newUser);
            return newUser;
        },
    },
};

async function startServer() {
    const app = express();
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    app.use((req, res, next) => {
        console.log(`[${req.method}] ${req.url}`);
        next();
    });
    app.use(cors());
    app.use(express.json());
    app.use('/graphql', expressMiddleware(server));
    app.listen(4000, () => {
        console.log('GraphQL mock running at http://localhost:4000/graphql');
    });
}

startServer();