const express = require("express");
const {createdUser, verifyAccount} = require("../controller/UserController");
const router = express.Router();

//url encoding
router.use(express.urlencoded({ extended: true}));

router.post("/auth/create-user", createdUser);
router.post("/auth/verify-email/:token", verifyAccount);

module.exports =router;