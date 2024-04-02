const UserRepository = require("../repository/userRepository");
const UserService = require("../service/userService");
const Database = require("../util/database");

class UseFactory {
  static async createInstance(instance) {
    const db = new Database({ connectionString: 'mongodb://localhost:3000/test'})
    const dbConnection = await db.connect();
    const userRepository = new UserRepository({ dbConnection });
    const useService = new UserService({ userRepository });
  }
}

module.exports = UseFactory;