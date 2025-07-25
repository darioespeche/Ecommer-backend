// routes/views.router.js
const express = require("express");
const passport = require("passport");
const router = express.Router();
const UserRepository = require("../repository/UserRepository");
const bcrypt = require("bcrypt");
const ProductRepository = require("../repository/ProductRepository");

//Vita principal
router.get("/", (req, res) => {
  res.render("home", { title: "Inicio" });
});
// Vista login
router.get("/login", (req, res) => {
  res.render("login", { title: "Iniciar sesión" });
});

// Vista post-login (redirige por rol)
router.post(
  "/sessions/login",
  express.urlencoded({ extended: true }),
  async (req, res) => {
    const { email, password } = req.body;

    const user = await UserRepository.getUserByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send("Credenciales incorrectas");
    }

    req.login(user, async (err) => {
      if (err) return res.status(500).send("Error en el login");

      try {
        const productos = await ProductRepository.getAllProducts();
        if (user.role === "admin") {
          res.render("admin", { user, productos });
        } else {
          res.render("user", { user, productos });
        }
      } catch (error) {
        res.status(500).send("Error al cargar productos");
      }
    });
  }
);
//logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

module.exports = router;
