const { FORBIDDEN } = require("../constants/httpStatus");
const { dtoFail } = require("../utils/dto");

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role.role_id === 1) {
    next();
  } else {
    dtoFail(res, "You are not admin!", FORBIDDEN);
  }
};

const isVendor = (req, res, next) => {
  if (req.user && req.user.role.role_id === 2) {
    next();
  } else {
    dtoFail(res, "You are not vendor!", FORBIDDEN);
  }
};

module.exports = { isAdmin, isVendor };
