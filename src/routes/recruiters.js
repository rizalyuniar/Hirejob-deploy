const express = require('express');
const router = express.Router();
const recruiterController = require('../controller/recruiters');
// const {validate} = require('../middleware/common')
const {protect} = require('../middleware/auth')
// const upload = require('../middleware/upload')

router.get("/", recruiterController.getAllRecruiter);
// create
router.post("/", protect, recruiterController.createRecruiter);
// // memanggil data secara spesifik sesuai id
router.get("/:id", recruiterController.getDetailRecruiter);
// // update
router.put("/:id", protect, recruiterController.updateRecruiter);
// // delete
router.delete("/:id", recruiterController.deleteRecruiter);

module.exports = router;