const bodyParser = require("body-parser");
const express = require("express");
const bcrypt = require('bcrypt');
require('dotenv').config()
const connectDB = require('./db');
const Products = require("./models/Products")

const  cors = require('cors')


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
const port =5000;
connectDB();



app.get('/', function(req, res){

    res.send("Home")
})

app.get('/dealsProducts', async function(req, res){
    const dealProducts= await Products.find({}).limit(5)
    res.json(dealProducts)
})



app.use('/auth', require('./routes/auth') );

app.use('/products', require('./routes/products'));

app.use('/cart', require('./routes/cart'));

app.use('/wishlist', require('./routes/wishlist'));

app.listen(port, function(){
    console.log(`listing on port ${port}`)
})