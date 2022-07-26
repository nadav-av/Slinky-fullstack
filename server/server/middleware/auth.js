const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  console.log("passs");
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  try {
    const decoded = jwt.verify(token, "jwtPrivateKey");
    req.tokenData = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

module.exports = auth;
