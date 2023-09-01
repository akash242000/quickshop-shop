const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const User = require('../models/User');
const Products = require('../models/Products');


router.get('/',fetchUser, async function(req, res){

    try {
        const wishlist= (await User.findById(req.id).select('wishlist'));
        res.json(wishlist)
    } catch (error) {
        res.status(400).json("Error")   
    }
})

router.post('/addItem',fetchUser, async function(req, res){

})

router.delete('/deleteItem',fetchUser, async function(req, res){

})


module.exports= router;