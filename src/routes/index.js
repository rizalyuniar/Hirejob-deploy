const express = require('express')
const router = express.Router()
const workerRouter = require('../routes/workers')
const recruiterRouter = require('../routes/recruiters')
const portofolioRouter = require('../routes/portofolios')
const productRouter = require('../routes/products')
const userRouter = require('../routes/users')

router.use('/workers', workerRouter);
router.use('/recruiters', recruiterRouter);
router.use('/portofolios', portofolioRouter);
router.use('/products', productRouter);
router.use('/users', userRouter);

module.exports = router