const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');
const { v4: uuidv4 } = require('uuid');

router.get('/', function(req, res){
    res.send("Register")
})

router.post('/register',[body("email").isEmail(),
                body('password').isLength({min:6}),
                body('username').isLength({min:3})],
             async function(req, res){

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }

                try{
                    const user= await User.create({
                        username:req.body.username,
                        password:bcrypt.hashSync(req.body.password, 5),
                        email:req.body.email,
                        cartItems:[],
                        wishlist:[],
                        user_id:uuidv4()
                    })
                    const authtoken=jwt.sign({id:user.id}, process.env.JWT_SECRET);
                    
                    res.json(authtoken)
                }
                catch{
                       return res.status(400).json({ errors: [{msg:"Internal Error", path:"Server"}] })};
                
             }

                
            
)

router.post("/login",[body('email').isEmail(),
                     body("password").exists()],
            async function(req,res){

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
            }

            const {email,password} = req.body;

            try{
                const user= await User.findOne({email});

                if(!user){
                    return res.status(400).json({ errors: [{msg:"User Does not Exists"}] })
                }
                
                const checkPassword= await bcrypt.compare(password, user.password);

                if(!checkPassword){
                    return res.status(400).json({ errors: [{msg:"User Does not Exists"}] })
                }

                const authtoken=jwt.sign({id:user.id}, process.env.JWT_SECRET);
                return res.json(authtoken)

            }catch(error){
                return res.status(400).json({ errors: [{msg:"User Does not Exists"}] });
            }

})

router.post("/getUser", fetchUser, async function(req, res){

    try{
        const user= await User.findById(req.id).select("-password");
        res.json(user)
    }catch{

    }

})

router.post('/getUserById/:userId', async(req, res)=>{
    try {
        const user = await User.findOne({user_id:req.params.userId}).select('username');
        res.json(user.username)
    } catch (error) {
        return res.status(400).json("Error");
    }
})

module.exports= router;


