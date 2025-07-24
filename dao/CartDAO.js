// dao/CartDAO.js
const Cart = require("../models/Cart");

class CartDAO {
  async createCart() {
    return await Cart.create({ products: [] });
  }

  async getCartById(id) {
    return await Cart.findById(id).populate("products.product").lean();
  }

  async addProductToCart(cartId, productId) {
    const cart = await Cart.findById(cartId);
    const existingProduct = cart.products.find(
      (p) => p.product.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: productId });
    }

    return await cart.save();
  }

  async removeProduct(cartId, productId) {
    const cart = await Cart.findById(cartId);
    cart.products = cart.products.filter(
      (p) => p.product.toString() !== productId
    );
    return await cart.save();
  }
}

module.exports = new CartDAO();
