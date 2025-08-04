const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({
    path: "./.env"
});

const dburl = process.env.MONGO_URL;

const dbConnect = async () =>{
    try{
        await mongoose.connect(dburl);
        console.log("Database connected");

    } catch (error){
        console.log("Database connection error". error);

    }
};

module.exports = dbConnect;