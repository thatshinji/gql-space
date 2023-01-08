import { MongoDataSource } from 'apollo-datasource-mongodb';

export default class Users extends MongoDataSource {
  getUser(userId) {
    return this.model.findById(userId)
  }

  getUsers() {
    return this.model.find();
  }
}
