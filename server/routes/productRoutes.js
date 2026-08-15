const express = require("express");

const {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();


// Get all products
router.get("/", getProducts);


// Get single product
router.get("/:id", getProductById);


// Admin: Add product
router.post("/", protect, adminOnly, addProduct);


// Admin: Update product
router.put("/:id", protect, adminOnly, updateProduct);


// Admin: Delete product
router.delete("/:id", protect, adminOnly, deleteProduct);


module.exports = router;