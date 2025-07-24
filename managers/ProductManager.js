// managers/ProductManager.js
const Product = require("../models/Product");

class ProductManager {
  // Obtener todos los productos sin filtros
  async getAllBasic() {
    return await Product.find().lean();
  }

  // Obtener productos con filtros, paginación y orden
  async getFiltered({ filter = {}, sort = {}, skip = 0, limit = 10 }) {
    return await Product.find(filter).sort(sort).skip(skip).limit(limit).lean();
  }

  // Obtener un producto por ID
  async getById(id) {
    return await Product.findById(id).lean();
  }

  // Crear un nuevo producto
  async addProduct(data) {
    const newProduct = new Product({
      title: data.title,
      description: data.description,
      code: data.code,
      price: data.price,
      status: data.status !== undefined ? data.status : true,
      stock: data.stock,
      category: data.category,
      thumbnails: Array.isArray(data.thumbnails) ? data.thumbnails : [],
    });
    return await newProduct.save();
  }

  // Actualizar un producto por ID
  async updateProduct(id, updatedFields) {
    delete updatedFields._id;
    delete updatedFields.id;

    return await Product.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    }).lean();
  }

  // Eliminar un producto por ID
  async deleteProduct(id) {
    const result = await Product.findByIdAndDelete(id);
    return result !== null;
  }

  // Contar productos (para paginación)
  async countDocuments(filter = {}) {
    return await Product.countDocuments(filter);
  }
}

module.exports = ProductManager;
