// controllers/ProductController.js
const ProductManager = require("../managers/ProductManager");
const productManager = new ProductManager();

const getAllProducts = async (req, res) => {
  try {
    const products = await productManager.getAllBasic();
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener productos", error: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productManager.getById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener producto", error: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await productManager.addProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al crear producto", error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updated = await productManager.updateProduct(req.params.id, req.body);
    if (!updated)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al actualizar producto", error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleted = await productManager.deleteProduct(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ message: "Producto eliminado" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al eliminar producto", error: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
