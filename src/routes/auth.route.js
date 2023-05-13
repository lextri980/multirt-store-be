const express = require("express");
const router = express.Router();
const {
  login,
  register,
  sendMailReset,
  resetPassword,
} = require("../controllers/auth.controller");

router.post("/login", login);

router.post("/register", register);

router.post("/send-mail", sendMailReset);

router.post("/reset-password", resetPassword);

module.exports = router;
