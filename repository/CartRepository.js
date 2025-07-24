// repository/CartRepository.js
const CartManager = require("../managers/CartManager");
const cartManager = new CartManager();

class CartRepository {
  async createCart() {
    return await cartManager.createCart();
  }

  async getCartById(id) {
    return await cartManager.getCartById(id);
  }

  async addProductToCart(cartId, productId) {
    return await cartManager.addProductToCart(cartId, productId);
  }

  async removeProductFromCart(cartId, productId) {
    return await cartManager.removeProductFromCart(cartId, productId);
  }
}

module.exports = new CartRepository();
