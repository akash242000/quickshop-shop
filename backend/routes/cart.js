const User = require('../models/User');
const Products = require('../models/Products');
const express = require('express');
const router= express.Router();
const fetchUser = require('../middleware/fetchUser');


router.get('/', fetchUser, async function(req,res){

    const allProducts =await Products.find({}).select('-product_reviews');

    const cartItems = (await User.findById(req.id).select('cartItems'));

    const userCartItems =[];

    cartItems.cartItems.forEach((item)=>{
        allProducts.map(product=>{
            if(product.product_id==item.productId){
                userCartItems.push(product);
            }
        })
    })
    res.json(cartItems.cartItems)
});


router.post('/addItem/:productId', fetchUser, async function(req,res){
    let cartItems =(await User.findById(req.id).select('-password')).cartItems;

    let productPrice= (await Products.findOne({product_id:req.params.productId}).select('product_price'));
 
    if(cartItems.some(item=> item.productId===req.params.productId)){
        return res.status(400).json({error:"Product is Already in the Cart!"})
    }
    cartItems.push({productId:req.params.productId, quantity:1, price:productPrice.product_price});   

    await User.findOneAndUpdate({_id:req.id}, {cartItems:cartItems});
    res.json(cartItems)
})


router.post('/removeItem/:productId',fetchUser, async function(req, res){

    let cartItems =(await User.findById(req.id).select('-password')).cartItems;

    const productID= req.params.productId;

    try{
        cartItems=cartItems.filter(item=> item.productId!==productID);
        await User.findOneAndUpdate({_id:req.id}, {cartItems:cartItems});
        res.json(cartItems)
    }
    catch(error){
        res.send(error)
    }
})


router.post('/updateItems/:productId', fetchUser, async function(req, res){

    let cartItems = (await User.findById(req.id).select('-password')).cartItems;
    const productID= req.params.productId;

    const productQuantity= parseInt(req.body.item_quantity);

    try{
        cartItems = cartItems.map(item=>{
            if(item.productId===productID){
                return {
                    productId:productID,
                    quantity:productQuantity,
                    price:item.price
                }
            }
            return item
        })

        await User.findOneAndUpdate({_id:req.id}, {cartItems:cartItems});
        res.json(cartItems)
    }catch(error){
        res.status(400)
    }


})



module.exports= router;