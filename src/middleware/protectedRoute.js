const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { dtoSc, dtoFail, dtoServer, dto } = require("../utils/dto");

const protectedRoute = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      return dto(res, 403, false, "Invalid token");
    }
  } else {
    return dtoFail(res, "Access token is not found");
  }
};

module.exports = protectedRoute;
