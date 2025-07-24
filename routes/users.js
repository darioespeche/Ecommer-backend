const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");

// Obtener todos los usuarios (protegido)
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const users = await User.find().select("-password");
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener usuarios" });
    }
  }
);

// Obtener un usuario por ID (protegido)
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      if (!user)
        return res.status(404).json({ message: "Usuario no encontrado" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener usuario" });
    }
  }
);

// Actualizar un usuario (protegido)
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar usuario" });
    }
  }
);

// Eliminar un usuario (protegido)
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: "Usuario eliminado" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar usuario" });
    }
  }
);

module.exports = router;
