const express = require('express');
const router = express.Router();
const portofolioController = require('../controller/portofolios');
// const {validate} = require('../middleware/common')
const {protect} = require('../middleware/auth')
const upload = require('../middleware/upload')

router.get("/",  portofolioController.getAllPortofolio);
// create
router.post("/", protect, upload.single('photo'), portofolioController.createPortofolio);
// // memanggil data secara spesifik sesuai id
router.get("/:id", portofolioController.getDetailPortofolio);
// // update
router.put("/:id", protect, upload.single('photo'), portofolioController.updatePortofolio);
// // delete
router.delete("/:id", portofolioController.deletePortofolio);

module.exports = router;