// routes/products.router.js
const { Router } = require("express");
const productController = require("../controllers/ProductController");

const router = Router();

// GET /api/products
router.get("/", productController.getAllProducts);

// GET /api/products/:pid
router.get("/:pid", productController.getProductById);

// POST /api/products
router.post("/", productController.createProduct);

// PUT /api/products/:pid
router.put("/:pid", productController.updateProduct);

// DELETE /api/products/:pid
router.delete("/:pid", productController.deleteProduct);

module.exports = router;
