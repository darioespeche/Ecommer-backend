// routes/carts.router.js
const { Router } = require("express");
const cartController = require("../controllers/CartController");

const router = Router();

// POST /api/carts
router.post("/", cartController.createCart);

// GET /api/carts/:cid
router.get("/:cid", cartController.getCartById);

// POST /api/carts/:cid/products/:pid
router.post("/:cid/products/:pid", cartController.addProductToCart);

// DELETE /api/carts/:cid/products/:pid
router.delete("/:cid/products/:pid", cartController.removeProductFromCart);

module.exports = router;
