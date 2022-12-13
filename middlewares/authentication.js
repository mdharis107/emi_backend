const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  const token = req.headers?.authorization;

  if (!token) {
    return res.send("Please Login again");
  }

  const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
  const { email } = decoded;

  if (decoded) {
    req.body.email = email;
    next();
  } else {
    res.send("Please Login");
  }
};

module.exports = {
  authentication
};
