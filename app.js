// file:///G:/[webformyself]%20FullStack-%D0%9C%D0%B0%D1%81%D1%82%D0%B5%D1%80/videokurs/part4/part5.html


const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const mykeys = require('./config/mykeys')
const app = express()



mongoose.connect(mykeys.mongoURIAzure, { useNewUrlParser: true } )
    .then(() => console.log('MongoDB connected. '))
    .catch(error => console.log(error))


app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(cors = require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors = require('cors')())



app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)



module.exports = app