// controllers/CartController.js
const CartManager = require("../managers/CartManager");
const cartManager = new CartManager();

const createCart = async (req, res) => {
  try {
    const cart = await cartManager.createCart();
    res.status(201).json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al crear carrito", error: err.message });
  }
};

const getCartById = async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.id);
    if (!cart)
      return res.status(404).json({ message: "Carrito no encontrado" });
    res.json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener carrito", error: err.message });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await cartManager.addProductToCart(
      req.params.id,
      productId,
      quantity
    );
    if (!cart)
      return res.status(404).json({ message: "Carrito no encontrado" });
    res.json(cart);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Error al agregar producto al carrito",
        error: err.message,
      });
  }
};

const removeProductFromCart = async (req, res) => {
  try {
    const cart = await cartManager.removeProductFromCart(
      req.params.id,
      req.params.productId
    );
    if (!cart)
      return res
        .status(404)
        .json({ message: "Carrito o producto no encontrado" });
    res.json(cart);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Error al eliminar producto del carrito",
        error: err.message,
      });
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await cartManager.clearCart(req.params.id);
    if (!cart)
      return res.status(404).json({ message: "Carrito no encontrado" });
    res.json({ message: "Carrito vaciado" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al vaciar carrito", error: err.message });
  }
};

const updateProductQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await cartManager.updateProductQuantity(
      req.params.id,
      productId,
      quantity
    );
    if (!cart)
      return res
        .status(404)
        .json({ message: "Carrito o producto no encontrado" });
    res.json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al actualizar cantidad", error: err.message });
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
