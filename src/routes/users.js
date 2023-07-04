const express = require('express');
const router = express.Router();
const userController = require('../controller/users');
const {protect} = require('../middleware/auth');
const upload = require('../middleware/upload')

router.post("/registerVerif", userController.registerVerif);
router.get("/verif/:id", userController.verifUser);
router.post("/login", userController.login);
router.post("/refresh-token", userController.refreshToken);

router.get("/", userController.getAllUser);
router.get("/profile", protect, userController.profile);
// get by id
router.get("/:id", userController.getDetailUser);
router.put("/:id", protect, upload.single('photo'), userController.updateUser);
// router.delete("/:id", userController.deleteUser);

module.exports = router