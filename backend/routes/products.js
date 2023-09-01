const User = require('../models/User');
const Products = require('../models/Products');
const express = require('express');
const router= express.Router();
const fetchUser = require('../middleware/fetchUser')

//All Products

router.get('/all', async function(req, res){
    const products= await Products.find({});
    res.json(products)
})


//Categories

router.get('/dealsOfDay', async function(req, res){
    const products = await Products.find({major_category:"dealsOfDay"}).select('-product_reviews');
    res.json(products)
})

//Filters


module.exports = router;
