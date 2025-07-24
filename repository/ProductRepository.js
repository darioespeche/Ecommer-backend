// repository/ProductRepository.js
const ProductManager = require("../managers/ProductManager");
const productManager = new ProductManager();

class ProductRepository {
  async getAllBasic() {
    return await productManager.getAllBasic();
  }

  async getById(id) {
    return await productManager.getById(id);
  }

  async addProduct(data) {
    return await productManager.addProduct(data);
  }

  async updateProduct(id, data) {
    return await productManager.updateProduct(id, data);
  }

  async deleteProduct(id) {
    return await productManager.deleteProduct(id);
  }

  async getFiltered(options) {
    return await productManager.getFiltered(options);
  }
}

module.exports = new ProductRepository();
