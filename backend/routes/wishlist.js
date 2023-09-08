const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const User = require('../models/User');
const Products = require('../models/Products');


router.get('/',fetchUser, async function(req, res){

    try {
        const wishlist= (await User.findById(req.id).select('wishlist')).wishlist;
        res.json(wishlist)
    } catch (error) {
        res.status(400).json("Error")   
    }
})

router.post('/addItem/:productId',fetchUser, async function(req, res){
    const productId= req.params.productId;

    const wishlist = (await User.findById(req.id).select('wishlist')).wishlist;

    if(wishlist.includes(productId)){
        return res.status(400).json("Item Exists")
    }

    wishlist.push(productId);
    res.json(wishlist)

    await User.findOneAndUpdate({_id:req.id},{wishlist:wishlist})
    
})

router.delete('/deleteItem/:productId',fetchUser, async function(req, res){
    const productId= req.params.productId;

    let wishlist = (await User.findById(req.id).select('wishlist')).wishlist;

    wishlist= wishlist.filter((item)=> item!==productId)
    res.json(wishlist)

    await User.findOneAndUpdate({_id:req.id},{wishlist:wishlist})
})


module.exports= router;