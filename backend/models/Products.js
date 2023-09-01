const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema= new Schema({
    product_id:{
        type:String,
        required:true,
        unique:true
    },

    product_category:{
        type:String,
        required:true,
        unique:true
    },

    product_name:{
        type:String,
        required:true
    },

    product_brand:{
        type:String,
        required:true
    },

    product_price:{
        type:String,
        required:true
    },

    discount:{
        type:String,
        required:true
    },

    mrp:{
        type:String,
        required:true
    },

    photos:{
        type:Array,
        required:true
    },

    product_reviews:{
        type:Array,
        required:true
    },
    major_category:{
        type:String
    }

});

module.exports= mongoose.model('Products',ProductSchema )