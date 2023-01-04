import { buildSchema } from "graphql";

// use graphql schema build schema
const schema = buildSchema(`
  # Query 对象, 特殊的查询对象, 是所有查询的入口
  # 标量: String, Int, Float, Boolean, ID, 其中ID比较特殊

  type Eva {
    name: String!
    age: Int
    isAdult: Boolean
    height: Float
    id: ID
    hobbies: [String!]! # hobbies 可以为空，当不为空时，就必须要有具体的数据
  }
  
  type Query {
    eva: Eva
  }
`);

const schema2 = buildSchema(`

  # 普通的数据结构对象
  type Article {
    id: String!
    title: String!
    content: String!
    tags: [String!]
  }
  
  # 查询 Query
  type Query {
    articles: [Article]
    article(id: ID!): Article
  }

  # 修改 Mutation

  # input 参数对象必须使用 input 类型
  input createArticleInput {
    title: String!
    content: String!
    tags: [String!]
  }

  input updateArticleInput {
    title: String!
    content: String!
  }

  type Deletion {
    success: Boolean
  }

  type Mutation {
    # createArticle(title: String!, content: String!): Article
    createArticle(article: createArticleInput): Article
    updateArticle(id: ID!, article: updateArticleInput): Article
    deleteArticle(id: ID!): Deletion
  }
`);

export { schema, schema2 };
