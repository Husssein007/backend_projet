const express = require ('express')
const app = express()
const cors = require('cors')
const port = 4000
const connectdb= require('./config/connectdb')
const contactRoute= require('./routes/contactRoutes')
const authRoute = require('./routes/auth')
const produitsRoute = require('./routes/productRoutes');
const categuorieRoute = require('./routes/categoryRoutes');
const messageRoute = require('./routes/messages')
const brandRoute = require ('./routes/brandRoutes')
const brandProduitRoute = require('./routes/brandProduitRoute')

require('dotenv').config()

app.use(cors())
connectdb()

app.use(express.json())

//partie categuorie et produits 
app.use('/api/categories', categuorieRoute);
app.use('/api/products', produitsRoute);

//authentification 
app.use('/contact',contactRoute)
app.use('/auth',authRoute)


//partie message 
app.use('/api/message',messageRoute)


//partie brand 
app.use('/api/brands', brandRoute);
app.use('/', brandProduitRoute);

app.listen(port,err=>{
    err?console.log(err):console.log(`go to the port=>${port}`)
})

