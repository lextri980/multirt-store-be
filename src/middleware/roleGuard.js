const isAdmin = (req, res, next) => {
  if (req.user && req.user.role.role_id === 1) {
    next();
  } else {
    return res.status(400).json({
      success: false,
      message: "You are not admin!",
    });
  }
};

const isVendor = (req, res, next) => {
  if (req.user && req.user.role.role_id === 2) {
    next();
  } else {
    return res.status(400).json({
      success: false,
      message: "You are not vendor!",
    });
  }
};

module.exports = { isAdmin, isVendor };
