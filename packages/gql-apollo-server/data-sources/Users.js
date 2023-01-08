import { MongoDataSource } from 'apollo-datasource-mongodb';
import { User } from '../modles/user.js'
export default class Users extends MongoDataSource {
  getUser(userId) {
    return this.model.findById(userId)
  }

  getUsers() {
    return this.model.find();
  }

  addUser({ name, age }) {
    const user = new User({
      name,
      age
    })

    return user.save()
  }
}
