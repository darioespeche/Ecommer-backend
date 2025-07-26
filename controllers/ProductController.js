// controllers/ProductController.js
const ProductRepository = require("../repository/ProductRepository");

const ProductDTO = require("../dto/ProductDTO");

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductRepository.getAllBasic();
    const productsDTO = products.map((p) => new ProductDTO(p));
    res.json(productsDTO);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener productos", error: err.message });
  }
};

const getProductById = async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await ProductRepository.getById(pid);
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json(new ProductDTO(product));
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener producto", error: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await ProductRepository.addProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al crear producto", error: err.message });
  }
};

const updateProduct = async (req, res) => {
  const { pid } = req.params;
  try {
    const updated = await ProductRepository.updateProduct(pid, req.body);
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
  const { pid } = req.params;
  try {
    const deleted = await ProductRepository.deleteProduct(pid);
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
