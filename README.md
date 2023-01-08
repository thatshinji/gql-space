# gql-space

基于 koa + express + react + mongodb + apollo 的一系列 graphql demo 集合

### 一些 GraphQL 的 demo 示例，包括：

1. 基于 React 使用 axios 或者 swr 进行前端请求
2. 基于 express 的 grqphql 的 node 服务

### 如何使用

#### 克隆项目

```shell
git clone https://github.com/thatshinji/gql-space.git
```

#### 安装依赖

packages 子目录安装 npm 依赖

#### Demo1

##### gql-react-web 配合 gql-node-server 使用

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

将会自动打开浏览器 `localhost:5173`, 可在打开控制面板具体查看请求细节，gql-react-web 提供了基于 axios 和 swr 两种请求方式

#### Demo2

##### gql-apollo-client 配合 gql-apollo-server 使用

启动服务端

```shell
>> cd packages/gql-apollo-server
```

1. `npm run app` 可以了解基础的 apollo-server 用法
2. `npm run chain` 可以了解 apollo-server 中 Resolvers chain 的用法
3. `npm run mongo` 可以通过 apollo-server 直接查询 mongodb 数据库
4. `npm run dataSources` 可以通过 dataSources 的方式进行数据库数据查询
   可在 `localhost:4000` 体验 apollo graphiql 工具
   启动 gql-apollo-client 客户端

```shell
>> cd packages/gql-apollo-client
>> npm run dev
```

会自动打开浏览器 `localhost:5173`
gql-apollo-client 使用 react + apollo-client 进行数据交互， 前提是需要启动 gql-apollo-server 服务

### TODOS:

- [ ] apollo-server + apollo-client-vue
- [ ] data fetching from RESTful API
- [ ] 基于 Go 的 graphql server 解决方案

### 其他

1. 暂时移除了 lerna 包管理
2. 有问题欢迎提 issue
3. 欢迎解决 TODOS
