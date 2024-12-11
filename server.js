const express = require ('express')
const app = express()
const cors = require('cors')
const port = 4000
const connectdb= require('./config/connectdb')
const contactRoute= require('./routes/contactRoutes')
const authRoute = require('./routes/auth')
const messageRoute = require('./routes/messages')
const router = require('./routes/productRoutes')
const categuorieRoute = require('./routes/categoryRoutes')

require('dotenv').config()

app.use(cors())
connectdb()

app.use(express.json())

//partie categuorie et produits 
app.use('/categories', categuorieRoute);

app.use('/product', router);

//authentification 
app.use('/contact',contactRoute)
app.use('/auth',authRoute)


//partie message 
app.use('/api/message',messageRoute)



app.listen(port,err=>{
    err?console.log(err):console.log(`go to the port=>${port}`)
})

