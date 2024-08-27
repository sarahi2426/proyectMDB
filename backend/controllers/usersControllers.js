const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcryptjs')
const asyncHandler = require ('express-async-handler')
const User = require ('../models/usersModel')



const registrarUser = asyncHandler(async (req , res) =>{

    const{name , email , password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error ("Faltan datos")
    }

    const existeUsuario = await User.findOne({email})

    if(existeUsuario){
        res.status(400)
        throw new Error("El usuario ya existe")
    } else{

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash( password , salt)

        let role = 'user'
        if(email.includes("@admin") === true ){
            role = 'admin'
        }

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        })

        if(user){
            res.status(201).json({
                _id: user.id,
                name : user.name,
                email:user.email,
                role:user.role
            })
        }else{
            res.status(400)
            throw new Error ("No se pudo guardar el usuario")
        }
    } 
})

const loginUser = asyncHandler(async (req , res) =>{

    const {email , password} = req.body

    const user= await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){

        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role:user.role,
            token:generarToken(user._id)
        })

    }else{
        res.status(400)
        throw new Error("Contraseña o usario invalido")
    }

})

const generarToken =(id) =>{
    return jwt.sign({id},process.env.JWT_SECRET ,{ expiresIn:'30d'})
}


const dataUser =(req, res)=>{
    res.status(201).json(req.user)
}

module.exports ={
    registrarUser,
    loginUser,
    dataUser
}