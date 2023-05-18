const express = require('express');
const router = express.Router();
const productController = require('../controller/products');
// const {validate} = require('../middleware/common')
const {protect} = require('../middleware/auth')
const upload = require('../middleware/upload')

router.get("/",  productController.getAllProduct);
// create
router.post("/", protect, upload.single('photo'), productController.createProduct);
// memanggil data secara spesifik sesuai id
router.get("/:id", protect, productController.getDetailProduct);
// update
router.put("/:id", protect, upload.single('photo'), productController.updateProduct);
// delete
router.delete("/:id", protect, productController.deleteProduct);

module.exports = router;