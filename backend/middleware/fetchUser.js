const jwt= require("jsonwebtoken");
require('dotenv').config()

const fetchUser= async (req, res, next)=>{

    const authtoken = req.header('auth-token');



    if(!authtoken){
        return res.send("Error")
    }


    try {
        const data = jwt.verify(authtoken, process.env.JWT_SECRET);
        req.id= data.id
        next();
    } catch (error) {
        res.send("Error Occured")
    }

}

module.exports= fetchUser;