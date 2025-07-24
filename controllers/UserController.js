const UserRepository = require("../repository/UserRepository");

const registerUser = async (req, res) => {
  try {
    const user = await UserRepository.createUser(req.body);
    res.status(201).json({ message: "Usuario registrado", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al registrar", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserRepository.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await UserRepository.getUserById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};

const updateUser = async (req, res) => {
  try {
    const updated = await UserRepository.updateUser(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await UserRepository.deleteUser(req.params.id);
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
