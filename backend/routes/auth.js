const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

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
                        email:req.body.email
                    })
                    const authtoken=jwt.sign({id:user.id}, process.env.JWT_SECRET);
                    
                    res.json(authtoken)
                }
                catch{
                        res.send("Error")};
                console.log(req.body)
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
                    return res.send("User Does not Exists")
                }
                
                const checkPassword= await bcrypt.compare(password, user.password);

                if(!checkPassword){
                    return res.send("User Does not Exists")
                }

                const authtoken=jwt.sign({id:user.id}, process.env.JWT_SECRET);
                res.json(authtoken)

            }catch{
                res.send("Error");
            }

})

router.post("/getUser", fetchUser, async function(req, res){

    try{
        const user= await User.findById(req.id).select("-password");
        res.json(user)
    }catch{

    }

})

module.exports= router;


