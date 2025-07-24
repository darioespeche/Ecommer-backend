const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const UserDTO = require("../dto/UserDTO");
const UserRepository = require("../repository/UserRepository");

const router = express.Router();

// 🔐 Registro de usuario
router.post("/register", async (req, res) => {
  try {
    const { email } = req.body;

    const userExist = await UserRepository.getUserByEmail(email);
    if (userExist) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const user = await UserRepository.createUser(req.body);
    const userDTO = new UserDTO(user);

    res
      .status(201)
      .json({ message: "Usuario registrado correctamente", user: userDTO });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al registrar usuario", error: err.message });
  }
});

// 🔐 Login de usuario
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserRepository.getUserByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login exitoso", token });
  } catch (err) {
    res.status(500).json({ message: "Error en el login", error: err.message });
  }
});

// 🔒 Ruta protegida: /api/sessions/current
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userDTO = new UserDTO(req.user);
    res.json({ user: userDTO });
  }
);

module.exports = router;
