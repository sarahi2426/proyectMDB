const getProducts = (req,res) =>{
    res.status(200).json({message:'Lista de productos'})
}

const createProducts = (req,res) =>{
    res.status(200).json({message:'crear un producto'})
}

const updateProducts = (req,res) =>{
    res.status(200).json({message:'Modificar un producto'})
}

const deleteProducts = (req,res) =>{
    res.status(200).json({message:'borrar un producto'})
}


module.exports ={
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts
}