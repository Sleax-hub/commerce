const User = require("../model/User");
const crypto = require("crypto");
const hashPassword = require("../utils/passwordHash");

const createdUser = async(req, res)=>{
    try {
        const {username, email, password} = req.body;

        //check existing 
        const existinguser = await User.findOne({email});
        if(existinguser){
            return res.status(400).json({message: "User already existis"});
        }

        //hashPassword
        const hashedPassword = await hashPassword(password);

        //create verification token using crypto
        const verification = crypto.randomBytes(32).toString("hex");

        //save the user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            verificationToken: verification
        })

        res.status(200).json({message: "User created successfully"})
        console.log(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
}

module.exports = {createdUser};