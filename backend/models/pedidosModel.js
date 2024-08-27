const mongoose = require ('mongoose')

const ordersSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:'User'
    },
    producto:{
        type:String,
        required: [true,"Por favor teclea tu producto"]
    },
    id:{
        type:String,
        required:[true , " Por favor teclea el id del procusto"],
       
    },
    direccion:{
        type:String,
        required:[true , " Por favor teclea tu dirección"],
    },
    cantidad:{
        type:String,
        required:[true , " Por favor teclea tu cantidad"],
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Order', ordersSchema)