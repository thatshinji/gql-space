import http from "http";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { koaMiddleware } from "@as-integrations/koa";

const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type User {
    id: ID!
    name: String
  }

  type Query {
    books: [Book]
    numberSix: Int! # Should always return the number 6 when queried
    numberSeven: Int! # Should always return 7
    user(id: ID!): User
  }
`;

const users = [
  {
    id: "1",
    name: "Elizabeth Bennet",
  },
  {
    id: "2",
    name: "Fitzwilliam Darcy",
  },
];

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];
// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    books: () => books,
    numberSix() {
      return 6;
    },
    numberSeven() {
      return 7;
    },
    // args 代表客户传递请求的参数对象
    user(parent, args, contextValue, info) {
      // args: {id: 1}
      return users.find((user) => user.id === args.id);
    },
  },
};

const app = new Koa();
const httpServer = http.createServer(app.callback());

// Set up Apollo Server
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
    context: async ({ ctx }) => ({ token: ctx.headers.token }),
  })
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000`);
