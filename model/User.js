const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
  
    },
    isVerified: {
        type: Boolean,
        default: false,
        
    },
    verificationToken: {
        type: String,
        default: null,
        
    },
    resetToken: {
        type: String,
        default: null,
        
    },
    resetTokenExpiry: {
        type: Date,
        default: null,
        
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User =mongoose.model("User", userSchema);
module.exports = User;