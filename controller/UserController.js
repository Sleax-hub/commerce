const User = require("../model/User");
const crypto = require("crypto");
const hashPassword = require("../utils/passwordHash");
const sendEmail = require("../utils/sendmail");

const createdUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //check existing
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //hashPassword
    const hashedPassword = await hashPassword(password);

    //create verification token using crypto
    const verification = crypto.randomBytes(32).toString("hex");

    //send verification email

    const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${verification}`;
    const htmlContent = `
      <p>Click the link below to verify your email:</p>
      <a target="_blank" href="${verificationLink}">Verify Email</a>
    `;

    //save the user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      verificationToken: verification,
    });

    res.status(200).json({ message: "User created successfully", user });
    sendEmail(user.email, "Verify Account", htmlContent);
    console.log(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//verify token or user
const verifyAccount = async (req, res) => {
  try {
    const { token } = req.params;

    // check token validity
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      res.status(401).json({ message: "Invalid verification token" });
    } else {
      user.isVerified = true;
      user.verificationToken = "";
      await user.save();
      res.status(200).json({ message: "Account verified successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createdUser,
  verifyAccount,
};
