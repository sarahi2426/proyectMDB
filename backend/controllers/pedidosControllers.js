const asyncHandler = require('express-async-handler')
const Order = require('../models/pedidosModel')
const Product = require('../models/productsModel')

const getOrders = asyncHandler(async(req,res) =>{
    const orders = await Order.find({user:req.user.id})
    res.status(200).json(orders)
})

const createOrders = asyncHandler(async(req,res) =>{
    const{producto , id , direccion,cantidad} = req.body
    if(!producto || !id || !direccion || !cantidad){
        res.status(400)
        throw new Error ("Faltan datos")
    }
    const product = await Product.findById(id);

    if (!product){
        res.status(404);
        throw new Error ("Producto no encontrado")
    }
   

     const orderNew = await Order.create({
        producto,
        id,
        direccion,
        cantidad,
        user:req.user.id
     })

    const ordersFinal = {
        ...orderNew._doc,
        product_info:product
    }
   

   res.status(201).json(ordersFinal)
})

module.exports ={
    getOrders,
    createOrders
}