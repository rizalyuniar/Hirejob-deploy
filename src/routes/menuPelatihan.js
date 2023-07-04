const express = require('express');
const router = express.Router();
const menuPelatihanController = require('../controller/menuPelatihan');
// const {validate} = require('../middleware/common')
const {protect} = require('../middleware/auth')
const upload = require('../middleware/upload')

router.get("/",  menuPelatihanController.getAllMenu);
// create
router.post("/", upload.single('photo'), menuPelatihanController.createMenu);
// // memanggil data secara spesifik sesuai id
router.get("/:id", menuPelatihanController.getDetailMenu);
// // update
router.put("/:id", upload.single('photo'), menuPelatihanController.updateMenu);
// // delete
router.delete("/:id", menuPelatihanController.deleteMenu);

module.exports = router;