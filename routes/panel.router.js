const ProductRepository = require("../repository/ProductRepository");
const express = require("express");
const authorizeRole = require("../middlewares/authorizeRole");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/admin", authorizeRole("admin"), async (req, res) => {
  res.render("admin", { user: req.user });
});

router.post("/products", authorizeRole("admin"), async (req, res) => {
  const { title, description, price } = req.body;
  await ProductRepository.create({ title, description, price });
  res.redirect("/admin");
});

router.get("/user", authorizeRole("user"), async (req, res) => {
  const productos = await ProductRepository.getAll();
  res.render("user", { user: req.user, productos, cartId: req.user.cart });
});

module.exports = router;
