const bcrypt = require("bcrypt");
const UserDAO = require("../dao/UserDAO");

class UserRepository {
  async createUser({ first_name, last_name, email, age, password }) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const userData = {
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword,
    };
    return await UserDAO.create(userData);
  }

  async getUserByEmail(email) {
    return await UserDAO.findByEmail(email);
  }

  async getUserById(id) {
    return await UserDAO.findById(id);
  }

  async getAllUsers() {
    return await UserDAO.findAll();
  }

  async updateUser(id, data) {
    return await UserDAO.update(id, data);
  }

  async deleteUser(id) {
    return await UserDAO.delete(id);
  }
}

module.exports = new UserRepository();
