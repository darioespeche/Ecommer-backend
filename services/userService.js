const bcrypt = require("bcrypt");
const User = require("../models/User");

const createUser = async ({ first_name, last_name, email, age, password }) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = new User({
    first_name,
    last_name,
    email,
    age,
    password: hashedPassword,
  });
  return await user.save();
};

module.exports = { createUser };
