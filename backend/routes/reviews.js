const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const User = require('../models/User');
const Products = require('../models/Products');

router.post('/addReview/:productID',fetchUser ,async function(req, res){
    

    const productReview= (await Products.findOne({product_id:req.params.productID}).select('product_reviews')).product_reviews

    const userID= (await User.findById(req.id).select('user_id')).user_id;

    const review={
        user_id:userID,
        comment:req.body.comment,
        rating:req.body.rating
    }

    productReview.push(review);


    try {
        await Products.findOneAndUpdate({product_id:req.params.productID}, {product_reviews:productReview})
        res.json((await Products.findOne({product_id:req.params.productID}).select('product_reviews')).product_reviews)
    } catch (error) {
        return res.status(400).json("Error")
    }


})

module.exports= router;