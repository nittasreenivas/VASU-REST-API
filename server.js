const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv/config')
var bodyParser = require('body-parser')
const productsRoutes = require('./routes/productsRoutes')

app.use(express.json())
app.use(cors())
app.options('*',cors())
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api',productsRoutes)

app.get('/',(req,res) => {
    res.send(`welcome to home route`)
})

mongoose.connect(process.env.DB_CONNECTION).then(() => {
    console.log(`Database connected Succesfully`)
}).catch((err) => {
    console.log(`database got some error ${err}`)
})

const PORT = process.env.PORT_NO

app.listen(`${PORT}`,() => {
    console.log(`server is running on PORT ${PORT}`)
})