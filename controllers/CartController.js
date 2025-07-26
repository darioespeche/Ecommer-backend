// controllers/CartController.js
const CartManager = require("../managers/CartManager");
const cartManager = new CartManager();
const CartRepository = require("../repository/CartRepository");
const ProductRepository = require("../repository/ProductRepository");
const CartDTO = require("../dto/CartDTO");
const Ticket = require("../models/Ticket");
const { v4: uuidv4 } = require("uuid");

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
    const cart = await CartRepository.getCartById(req.params.cid);
    if (!cart)
      return res.status(404).json({ message: "Carrito no encontrado" });
    res.json(new CartDTO(cart));
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener carrito", error: err.message });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await CartRepository.addProductToCart(
      req.params.cid,
      req.params.pid,
      quantity || 1
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
      req.params.cid,
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
    const cart = await CartRepository.clearCart(req.params.cid);
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

const purchaseCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await CartRepository.getCartById(cartId);

    if (!cart) return res.status(404).send("Carrito no encontrado");

    const purchasedProducts = [];
    const failedProducts = [];
    let totalAmount = 0;

    for (const item of cart.products) {
      const product = await ProductRepository.getProductById(item.product);

      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await product.save();

        purchasedProducts.push({
          product: product._id,
          quantity: item.quantity,
        });

        totalAmount += product.price * item.quantity;
      } else {
        failedProducts.push({
          product: product.title,
          reason: "Stock insuficiente",
        });
      }
    }

    const ticket = await Ticket.create({
      code: uuidv4(),
      amount: totalAmount,
      purchaser: req.user?.email || "usuario_no_logueado",
      products: purchasedProducts,
    });

    res.status(200).json({
      message: failedProducts.length
        ? "Compra realizada parcialmente"
        : "Compra realizada con éxito",
      ticket,
      failedProducts,
    });
  } catch (error) {
    console.error("Error al procesar la compra:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = {
  createCart,
  getCartById,
  addProductToCart,
  removeProductFromCart,
  clearCart,
  updateProductQuantity,
  purchaseCart,
};
