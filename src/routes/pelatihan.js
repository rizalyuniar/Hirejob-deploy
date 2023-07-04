const express = require('express');
const router = express.Router();
const pelatihanController = require('../controller/pelatihan');
// const {validate} = require('../middleware/common')
const {protect} = require('../middleware/auth')
const upload = require('../middleware/upload')

router.get("/",  pelatihanController.getAllPelatihan);
router.get("/detail",  protect, pelatihanController.getPelatihan);
// create
router.post("/:id_menu", protect, pelatihanController.createPelatihan);
// // memanggil data secara spesifik sesuai id
router.get("/:id", pelatihanController.getDetailPelatihan);
// // // update
router.put("/:id", protect, pelatihanController.updatePelatihan);
// // // delete
router.delete("/:id", pelatihanController.deletePelatihan);

module.exports = router;