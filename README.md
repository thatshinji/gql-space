# gql-space

### 一些 GraphQL 的 demo 示例，包括：

1. 基于 React 使用 axios 或者 swr 进行前端请求
2. 基于 express 的 grqphql 的 node 服务

### 如何使用

#### 安装项目

clone

```shell
git clone https://github.com/thatshinji/gql-space.git
```

#### gql-react-web 配合 gql-node-server 使用

```shell
>> cd packages/gql-node-server
>> npm run start
```

打开浏览器，通过 graphiql ui 来体验 graphql

或者

```shell
>> cd packages/gql-react-web
>> npm run dev
```

将会自动打开浏览器 localhost:5173, 可在打开控制面板具体查看请求细节，gql-react-web 提供了基于 axios 和 swr 两种请求方式

