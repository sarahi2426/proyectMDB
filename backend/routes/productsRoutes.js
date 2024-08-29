const express = require ('express')
const router = express.Router()
const {getProducts, createProducts, updateProducts, deleteProducts,getAllProducts} = require('../controllers/productsControllers')
const {protect,adminAccess} = require('../middleware/authMiddleware')

router.get('/', getAllProducts)

router.get('/up', protect,adminAccess, getProducts)

router.post('/', protect,adminAccess,createProducts)

router.put('/:id', protect,adminAccess,updateProducts)

router.delete('/:id',protect,adminAccess, deleteProducts)

module.exports = router