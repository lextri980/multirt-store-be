const dto = (res, status, success, message) => {
  return res.status(status).json({
    success: success,
    message: message,
  });
};

const dtoSc = (res, object) => {
  return res.status(200).json(object);
};

const dtoFail = (res, message) => {
  return res.status(400).json({
    success: false,
    message: message,
  });
};

const dtoServer = (res) => {
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

module.exports = { dto, dtoSc, dtoFail, dtoServer };
