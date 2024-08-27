const express = require ('express')
const router = express.Router()
const {getProducts, createProducts, updateProducts, deleteProducts} = require('../controllers/productsControllers')
const {protect,adminAccess} = require('../middleware/authMiddleware')

router.get('/', getProducts)

router.post('/', protect,adminAccess,createProducts)

router.put('/:id', protect,adminAccess,updateProducts)

router.delete('/:id',protect,adminAccess, deleteProducts)

module.exports = router