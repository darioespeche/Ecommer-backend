// managers/CartManager.js
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const mongoose = require("mongoose");

class CartManager {
  // Crear un nuevo carrito vacío
  async createCart() {
    const newCart = new Cart({ products: [] });
    return await newCart.save();
  }

  // Obtener un carrito por ID y poblar los productos
  async getCartById(cartId) {
    return await Cart.findById(cartId).populate("products.product").lean();
  }

  // Agregar producto al carrito (o incrementar cantidad si ya existe)

  async addProductToCart(cartId, productId, quantity = 1) {
    const cart = await Cart.findById(cartId);
    if (!cart) return null;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      console.error("ID inválido:", productId);
      throw new Error("ID de producto inválido");
    }

    console.log("Buscando producto con ID:", productId);
    const product = await Product.findById(productId);
    if (!product) throw new Error("Producto no encontrado");

    const existingProduct = cart.products.find((p) =>
      p.product.equals(productId)
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    return cart;
  }

  // Eliminar un producto del carrito
  async removeProductFromCart(cartId, productId) {
    const cart = await Cart.findById(cartId);
    if (!cart) return null;

    cart.products = cart.products.filter((p) => !p.product.equals(productId));
    await cart.save();
    return cart;
  }
  // Limpiar el carrito (eliminar todos los productos)
  async clearCart(cartId) {
    const cart = await Cart.findById(cartId);
    if (!cart) return null;
    cart.products = [];
    await cart.save();
    return cart;
  }
  // Actualizar la cantidad de un producto en el carrito
  async updateProductQuantity(cartId, productId, quantity) {
    const cart = await Cart.findById(cartId);
    if (!cart) return null;

    const product = cart.products.find((p) => p.product.equals(productId));
    if (!product) return null;

    product.quantity = quantity;
    await cart.save();
    return cart;
  }
}

module.exports = CartManager;
