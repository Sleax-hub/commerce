const mongoose = require("mongoose");
const dotenv =require("dotenv");
const cors = require("cors");
const express = require("express");
const dbConnect = require("./utils/dbconnection");



const app = express();

app.use(cors());
app.use(express.json());

//url encoding
app.use(express.urlencoded({ extended: true}));

dotenv.config({
    path: "./.env",
})

const port = process.env.PORT || 8000;
const db =process.env.MONGO_URL;


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
});

// log in browser
app.get("/", (req, res) => {
  res.send("Hello World!");
});


//database connection
dbConnect();

//routes
const userroutes = require("./routes/UserRoute");

app.use("/api/v1", userroutes);