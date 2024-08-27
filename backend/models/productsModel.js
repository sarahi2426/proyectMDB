const mongoose = require ('mongoose')

const productsSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:'User'
    },
    producto:{
        type:String,
        required: [true,"Por favor teclea tu producto"]
    },
    color:{
        type:String,
        required:[true , " Por favor teclea tu color"],
       
    },
    precio: {
        type:String,
        required:[true , "Por favor teclea tu precio"]
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Product', productsSchema)