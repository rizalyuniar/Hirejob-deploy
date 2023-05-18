const express = require('express');
const router = express.Router();
const workerController = require('../controller/workers');
// const {validate} = require('../middleware/common')
const {protect} = require('../middleware/auth')
// const upload = require('../middleware/upload')

router.get("/", workerController.getAllWorker);
// create
router.post("/", protect, workerController.createWorker);
// // memanggil data secara spesifik sesuai id
// router.get("/:id", workerController.getDetailWorker);
// // update
router.put("/:id", workerController.updateWorker);
// // delete
router.delete("/:id", workerController.deleteWorker);


router.get("/allworker", workerController.getDetailValue);
router.get("/allworker/:id", workerController.getValueDetail);

module.exports = router;