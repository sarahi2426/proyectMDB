const asyncHandler = require('express-async-handler')
const Product = require('../models/productsModel')


const getAllProducts = asyncHandler(async(req,res) =>{
    const products = await Product.find()
    res.status(200).json(products)
})

const getProducts = asyncHandler(async(req,res) =>{
    const product = await Product.find({user: req.user.id})
    res.status(200).json(product)
})

const createProducts = asyncHandler(async(req,res) =>{
    const{producto , color , precio} = req.body
    if(!producto || !color || !precio){
        res.status(400)
        throw new Error ("Faltan datos")
    }
   
   const product= await Product.create({
    producto,
    color ,
    precio,
    user:req.user.id
   })


   res.status(201).json(product)
})

const updateProducts = asyncHandler(async(req,res) =>{

    const product = await Product.findById(req.params.id)

    if(!product){
        res.status(400)
        throw new Error ('El producto no existe')
    }
     if(product.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("Usuario no autorizado");
        
     }else{
        const productUpdate = await Product.findByIdAndUpdate(req.params.id , req.body,{new:true})
        res.status(200).json(productUpdate)
     }


})

const deleteProducts = asyncHandler(async(req,res) =>{

    const product = await Product.findById(req.params.id)

    if(!product){
        res.status(400)
        throw new Error ('El producto no existe')
    }

    if(product.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("Usuario no autorizado");
        
     }else{
        await product.deleteOne()

         res.status(200).json({id: req.params.id})
     }
    
})


module.exports ={
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts,
    getAllProducts
}