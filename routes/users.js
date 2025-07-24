const express = require("express");
const passport = require("passport");
const authorizeRole = require("../middlewares/authorizeRole");

const {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/UserController");

const router = express.Router();

// Registrar usuario (público)
router.post("/register", registerUser);

// Obtener todos los usuarios (solo admin)
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("admin"),
  getAllUsers
);

// Obtener un usuario por ID (admin)
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("admin"),
  getUserById
);

// Actualizar usuario (admin)
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("admin"),
  updateUser
);

// Eliminar usuario (admin)
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("admin"),
  deleteUser
);

module.exports = router;
