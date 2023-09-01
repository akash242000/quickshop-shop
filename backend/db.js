const mongoose = require("mongoose");
require('dotenv').config()


mongoose.set("strictQuery", false);
const mongoDB = `mongodb+srv://rahulrathore252000:${process.env.DB_PASSWORD}@ecom-cluster.tw4tujw.mongodb.net/myShop?retryWrites=true&w=majority`


const connectDB=async()=>{
    main().catch((err) => console.log(err));
        async function main() {
            try{
                await mongoose.connect(mongoDB);
                console.log("Database Connected!");
            }
            catch{
                console.log("Database Connection Error");
            }
        
        }
}

module.exports =connectDB;