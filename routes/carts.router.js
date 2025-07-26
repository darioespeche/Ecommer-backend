const { Router } = require("express");
const cartController = require("../controllers/CartController");
const authorizeRole = require("../middlewares/authorizeRole");
const passport = require("passport");

const router = Router();

// Crear carrito
router.post("/", cartController.createCart); // pública

// Obtener carrito por ID
router.get("/:cid", cartController.getCartById); // pública

// Agregar producto al carrito
router.post(
  "/:cid/products/:pid",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("user"),
  cartController.addProductToCart
);

// Eliminar producto específico del carrito
router.delete(
  "/:cid/products/:pid",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("user"),
  cartController.removeProductFromCart
);

// Vaciar carrito completo
router.delete("/:cid", cartController.clearCart);

// Actualizar cantidad de un producto en el carrito
router.put("/:cid/products/:pid", cartController.updateProductQuantity);

// 👉 Ruta de compra: genera ticket, descuenta stock, etc.
router.post(
  "/:cid/purchase",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("user"),
  cartController.purchaseCart
);

module.exports = router;
