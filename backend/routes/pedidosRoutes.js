const express = require ('express')
const router = express.Router()
const {getOrders, createOrders} = require('../controllers/pedidosControllers')
const {protect} = require('../middleware/authMiddleware')

router.get('/',protect, getOrders)
router.post('/', protect,createOrders)
module.exports = router