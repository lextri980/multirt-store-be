const {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
} = require("../constants/httpStatus");

const dto = (res, status, success, message) => {
  return res.status(status).json({
    success: success,
    message: message,
  });
};

const dtoSc = (res, object) => {
  return res.status(200).json(object);
};

const dtoFail = (res, message, failType = BAD_REQUEST) => {
  switch (failType) {
    case BAD_REQUEST:
      return res.status(400).json({
        success: false,
        message: message,
      });

    case UNAUTHORIZED:
      return res.status(401).json({
        success: false,
        message: message,
      });

    case FORBIDDEN:
      return res.status(403).json({
        success: false,
        message: message,
      });

    default:
      return;
  }
};

const dtoServer = (res) => {
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

module.exports = { dto, dtoSc, dtoFail, dtoServer };
