const mongoose= require('mongoose')

const Schema= mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cartItems:{
        type:Array
    },
    wishlist:{
        type:Array
    }
});

UserSchema.index({ email: 1 }, { unique: true });

const User= mongoose.model("user", UserSchema)
// User.createIndex({ email: 1 }, { unique: true });
module.exports= User
