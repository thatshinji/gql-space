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

安装依赖

```shell
npx lerna@latest bootstrap
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

### NOTE:

当 gql-node-server 中 graphql 的版本 > 15.8.0, 会在 graphiql 中出现类型报错，所暂时锁定 graphql 版本为 15.8.0
