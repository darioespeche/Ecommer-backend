// controllers/CartController.js
const CartManager = require("../managers/CartManager");
const cartManager = new CartManager();
const CartRepository = require("../repository/CartRepository");

const createCart = async (req, res) => {
  try {
    const cart = await CartRepository.createCart();
    res.status(201).json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al crear carrito", error: err.message });
  }
};

const getCartById = async (req, res) => {
  try {
    const cart = await CartRepository.getCartById(req.params.cid); // <-- corregido
    if (!cart)
      return res.status(404).json({ message: "Carrito no encontrado" });
    res.json(cart);
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener carrito",
      error: err.message,
    });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await CartRepository.addProductToCart(
      req.params.cid, // ID del carrito
      req.params.pid, // ID del producto
      quantity || 1 // Cantidad, por defecto 1
    );
    if (!cart)
      return res.status(404).json({ message: "Carrito no encontrado" });
    res.json(cart);
  } catch (err) {
    res.status(500).json({
      message: "Error al agregar producto al carrito",
      error: err.message,
    });
  }
};

const removeProductFromCart = async (req, res) => {
  try {
    const cart = await CartRepository.removeProductFromCart(
      req.params.cid, // <-- corregido
      req.params.pid
    );
    if (!cart)
      return res
        .status(404)
        .json({ message: "Carrito o producto no encontrado" });
    res.json(cart);
  } catch (err) {
    res.status(500).json({
      message: "Error al eliminar producto del carrito",
      error: err.message,
    });
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await CartRepository.clearCart(req.params.cid); // <-- corregido
    if (!cart)
      return res.status(404).json({ message: "Carrito no encontrado" });
    res.json({ message: "Carrito vaciado" });
  } catch (err) {
    res.status(500).json({
      message: "Error al vaciar carrito",
      error: err.message,
    });
  }
};

// CartController.js
const updateProductQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await CartRepository.updateProductQuantity(
      req.params.cid,
      req.params.pid,
      quantity
    );
    if (!cart)
      return res
        .status(404)
        .json({ message: "Carrito o producto no encontrado" });
    res.json(cart);
  } catch (err) {
    res.status(500).json({
      message: "Error al actualizar cantidad",
      error: err.message,
    });
  }
};

module.exports = {
  createCart,
  getCartById,
  addProductToCart,
  removeProductFromCart,
  clearCart,
  updateProductQuantity,
};
