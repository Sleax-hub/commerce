const express = require("express");
const {createdUser} = require("../controller/UserController");
const router = express.Router();

//url encoding
router.use(express.urlencoded({ extended: true}));

router.post("/auth/create-user", createdUser);

module.exports =router;