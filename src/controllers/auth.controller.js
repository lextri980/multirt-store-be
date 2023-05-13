const User = require("../models/User");
const ResetToken = require("../models/ResetToken");
const {
  generateToken,
  generateRememberedToken,
} = require("../utils/generateToken");
const { emailRegex, passwordRegex } = require("../constants/regex");
const { dtoSc, dtoFail, dtoServer } = require("../utils/dto");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../utils/sendMail");

//! desc   Login
//! route  POST /auth/login
//! access Public
const login = async (req, res) => {
  const { email, password, remember } = req.body;
  const rememberBoolean = remember === "true"; //<remember> is returned in String => change to Boolean
  //Validate lack of field
  if (!email || !password) {
    return dtoFail(res, "Missing information");
  }
  try {
    const user = await User.findOne({ email, password }).select("-password");
    if (!user || !password) {
      return dtoFail(res, "Incorrect information");
    }
    return dtoSc(res, {
      success: true,
      message: "Login successfully",
      token: rememberBoolean
        ? generateRememberedToken(user._id)
        : generateToken(user._id),
      user,
    });
  } catch (error) {
    console.log(error);
    return dtoServer(res);
  }
};

//! desc   Register
//! route  POST /auth/register
//! access Public
const register = async (req, res) => {
  const { name, email, password } = req.body;
  //Validate lack of field
  if (!name || !email || !password) {
    return dtoFail(res, "Missing information");
  }
  //Validate email format
  if (emailRegex.test(email) === false) {
    return dtoFail(res, "Invalid email");
  }
  //Validate password format
  if (passwordRegex.test(password) === false) {
    return dtoFail(res, "Invalid password");
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      return dtoFail(res, "Email is already existed");
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    return dtoSc(res, {
      success: true,
      message: "Register successfully",
    });
  } catch (error) {
    console.log(error);
    return dtoServer(res);
  }
};

//! desc   Send mail reset
//! route  POST /auth/send-mail
//! access Public
const sendMailReset = async (req, res) => {
  const { email } = req.body;
  //Validate lack of field
  if (!email) {
    return dtoFail(res, "Missing information");
  }
  //Validate email format
  if (emailRegex.test(email) === false) {
    return dtoFail(res, "Invalid email");
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return dtoFail(res, "This email does not exist");
    }
    let resetToken = await ResetToken.findOne({ userId: user._id });
    if (!resetToken) {
      resetToken = await new ResetToken({
        userId: user._id,
        token: uuidv4(),
      }).save();
    }

    const linkReset = `${process.env.BASE_URL}/authentication?userId=${user._id}&token=${resetToken.token}`;
    await sendEmail(user.email, "Reset password", linkReset);

    return dtoSc(res, {
      success: true,
      message: "Send email successfully!",
    });
  } catch (error) {
    console.log(error);
    return dtoServer(res);
  }
};

//! desc   Reset password
//! route  PUT /auth/reset-password
//! access public

const resetPassword = async (req, res) => {
  const { password, userId, token } = req.body;
  //Validate lack of field
  if (!password) {
    return dtoFail(res, "Missing information");
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return dtoFail(res, "User is not found");
    }
    if (password === user.password) {
      return dtoFail(
        res,
        "Your new password must be different from your old password"
      );
    }
    const resetToken = await ResetToken.findOne({ userId, token });
    if (!resetToken) {
      return dtoFail(res, "Invalid or expired link");
    }

    user.password = password;
    await user.save();
    await resetToken.delete();

    return dtoSc(res, {
      success: true,
      message: "Change password successfully",
    });
  } catch (error) {
    console.log(error);
    return dtoServer(res);
  }
};

module.exports = { login, register, sendMailReset, resetPassword };
