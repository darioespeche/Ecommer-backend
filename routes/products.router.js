const { Router } = require("express");
const productController = require("../controllers/ProductController");
const authorizeRole = require("../middlewares/authorizeRole");
const passport = require("passport");

const router = Router();

// GET públicos
router.get("/", productController.getAllProducts);
router.get("/:pid", productController.getProductById);

// Protegidas solo admin
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("admin"),
  productController.createProduct
);

router.put(
  "/:pid",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("admin"),
  productController.updateProduct
);

router.delete(
  "/:pid",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("admin"),
  productController.deleteProduct
);

module.exports = router;
