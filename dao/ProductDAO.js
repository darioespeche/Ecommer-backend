// dao/ProductDAO.js
const Product = require("../models/Product");

class ProductDAO {
  async getAll() {
    return await Product.find().lean();
  }

  async getById(id) {
    return await Product.findById(id).lean();
  }

  async create(data) {
    return await Product.create(data);
  }

  async update(id, data) {
    return await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }

  async getFiltered({ filter = {}, sort = {}, skip = 0, limit = 10 }) {
    return await Product.find(filter).sort(sort).skip(skip).limit(limit).lean();
  }

  async count(filter = {}) {
    return await Product.countDocuments(filter);
  }
}

module.exports = new ProductDAO();
