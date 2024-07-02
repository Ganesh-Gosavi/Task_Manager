const jwt = require("jsonwebtoken");

const verifyJwtToken = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized user",
        success: false,
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    req.body.userId = decode.userId;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid Token",
      success: false,
    });
  }
};

module.exports = verifyJwtToken;
