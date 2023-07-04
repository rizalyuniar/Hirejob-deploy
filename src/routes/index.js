const express = require('express')
const router = express.Router()
const userRouter = require('../routes/users')
const menuRouter = require('../routes/menuPelatihan')
const pelatihanRouter = require('../routes/pelatihan')

router.use('/users', userRouter);
router.use('/menu', menuRouter);
router.use('/pelatihan', pelatihanRouter);

module.exports = router