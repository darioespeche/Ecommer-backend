// managers/CartManager.js
const Cart = require("../models/Cart");

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
  async addProductToCart(cartId, productId) {
    const cart = await Cart.findById(cartId);
    if (!cart) return null;

    const existingProduct = cart.products.find((p) =>
      p.product.equals(productId)
    );

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.products.push({ product: productId });
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
}

module.exports = CartManager;
