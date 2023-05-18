const express = require('express');
const router = express.Router();
const userController = require('../controller/users');
const {protect} = require('../middleware/auth')
const upload = require('../middleware/upload')

router.post("/register", userController.register);
router.post("/registerRecruiter", userController.registerRecruiter);

router.post("/login", userController.login);
router.post("/refresh-token", userController.refreshToken);

router.get("/profile", protect, userController.profile);
router.get("/profileRecruiter", protect, userController.profileRecruiter);

router.put("/workers/:id", upload.single('photo'), userController.updateUserWorker);
router.put("/recruiters/:id", userController.updateUserRecruiter);


// create
// router.post("/", userController.createUser);
// // memanggil data secara spesifik sesuai id
// router.get("/:id", userController.getDetailUser);
// // update
// router.put("/:id", userController.updateUser);
// // delete
// router.delete("/:id", userController.deleteUser);

module.exports = router