const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

const protect = asyncHandler(async(req, res , next) => {
    console.log(req.headers)
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token , process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')

            next()

        } catch (error) {
            
            res.status(401)
            throw new Error('Acceso denegado')
        }
    }

    if(!token){
        res.status(401)
        throw new Error ('Acceso no autorizado , no se proporciono ningun token ')
    }
})

module.exports={
    protect
}