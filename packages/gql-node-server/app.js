import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { schema, schema2 } from "./query/index.js";
import { rootValue, rootValue2 } from "./response/index.js";

var app = express();

const graphiql = true;

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql,
  })
);

app.use(
  "/graphql2",
  graphqlHTTP({
    schema: schema2,
    rootValue: rootValue2,
    graphiql,
  })
);

const port = 4000;

app.listen(port, () => console.log("now broswe to localhost:4000/graphql"));
