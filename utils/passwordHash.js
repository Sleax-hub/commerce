const bcryptjs = require("bcryptjs");

const hashPassword = async (password) => {
  try {
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);
    return hash;
  } catch (error) {
    console.log(error);
  }
};

module.exports = hashPassword;