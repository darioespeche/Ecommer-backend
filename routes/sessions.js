const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const UserDTO = require("../dto/UserDTO");
const UserRepository = require("../repository/UserRepository");
const { sendRecoveryEmail } = require("../services/mailService");

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

// 🔐 Recuperación de contraseña
router.post("/recover", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserRepository.getUserByEmail(email);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    await sendRecoveryEmail(email, token);
    res.json({ message: "Correo enviado con instrucciones" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al enviar email", error: error.message });
  }
});
// 🔐 Restablecimiento de contraseña
router.get("/reset-password", (req, res) => {
  const { token } = req.query;
  res.render("resetPassword", { token });
});
router.post("/reset-password", async (req, res) => {
  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserRepository.getUserByEmail(decoded.email);

    if (!user) return res.status(404).send("Usuario no encontrado");

    const samePassword = bcrypt.compareSync(password, user.password);
    if (samePassword)
      return res
        .status(400)
        .send("La contraseña no puede ser igual a la anterior");

    const hashedPassword = bcrypt.hashSync(password, 10);
    await UserRepository.updateUser(user._id, { password: hashedPassword });

    res.send("Contraseña actualizada exitosamente");
  } catch (error) {
    res.status(400).send("Token inválido o expirado");
  }
});

module.exports = router;
