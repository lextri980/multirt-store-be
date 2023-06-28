const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { dtoFail } = require("../utils/dto");
const { UNAUTHORIZED } = require("../constants/httpStatus");

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
      if (error.expiredAt) {
        return dtoFail(
          res,
          "Your session is expired! Please login again.",
          UNAUTHORIZED
        );
      } else {
        return dtoFail(res, "Invalid token.", UNAUTHORIZED);
      }
    }
  } else {
    return dtoFail(res, "Access token is not found", UNAUTHORIZED);
  }
};

module.exports = protectedRoute;
