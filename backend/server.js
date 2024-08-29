const express = require('express')
const color = require('colors')
const connectBD = require('./config/db')
const dotenv = require('dotenv').config()
const cors = require('cors')
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT 

connectBD()
const app = express()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({extended:false}))

app.use('/api/products', require('./routes/productsRoutes'))

app.use('/api/products/orders', require('./routes/pedidosRoutes'))

app.use('/api/users', require('./routes/usersRoutes'))

app.use(errorHandler)

app.listen(port, ()=> console.log (`servidor iniciado en el puerto ${port}`))