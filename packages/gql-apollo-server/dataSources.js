import http from "http";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { koaMiddleware } from "@as-integrations/koa";

import { User } from "./modles/index.js";
import Users from "./data-sources/Users.js";

const typeDefs = `#graphql
  type User {
    _id: ID!
    name: String!
    age: Int
  }

  type Query {
    users: [User!]
    user(id: ID!): User
  }
  
  input inputUser {
    name: String!
    age: Int!
  }

  type AddUserResp {
    success: Boolean!
  }

  type Mutation {
    addUser(user: inputUser!): AddUserResp
  }
`;

const resolvers = {
  Query: {
    users: async (parent, args, { dataSources }) => {
      const users = await dataSources.users.getUsers()
      return users;
    },
    user: async (parent, { id }, { dataSources }) => {
      const user = await dataSources.users.getUser(id);
      return user;
    },
  },

  Mutation: {
    addUser: async (parent, { user: { name, age }}, { dataSources }) => {
      const resp =  await dataSources.users.addUser({ name, age })
      if (resp._id) {
        return {
          success: true
        }
      }
      return { success: false }
    }
  }
};

const app = new Koa();
const httpServer = http.createServer(app.callback());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(cors());
app.use(bodyParser());
app.use(
  koaMiddleware(server, {
    context: async ({ ctx }) => ({
      token: ctx.headers.token,
      dataSources:  {
        users: new Users(User)
      },
    }),
  })
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000`);
