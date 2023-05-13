const express = require("express");
const uploadCloud = require("../config/cloudinary");
const {
  getUser,
  getUserDetail,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  updatePassword,
  updateAvatar,
  deleteAvatar,
} = require("../controllers/user.controller");
const idMatch = require("../middleware/idMatch");
const isAdmin = require("../middleware/isAdmin");
const protectedRoute = require("../middleware/protectedRoute");
const router = express.Router();

router.get("/list", protectedRoute, isAdmin, getUser);

router.get("/detail/:id", idMatch, protectedRoute, isAdmin, getUserDetail); //User._id

router.post("/update/:id", idMatch, protectedRoute, isAdmin, updateUser); //User._id

router.delete("/delete/:id", idMatch, protectedRoute, isAdmin, deleteUser); //User._id

router.get("/profile", protectedRoute, getUserProfile);

router.post("/profile/update", protectedRoute, updateUserProfile);

router.post("/profile/change-password", protectedRoute, updatePassword);

router.post(
  "/profile/change-avatar",
  protectedRoute,
  uploadCloud.single("avatar"),
  updateAvatar
);

router.put("/profile/delete-avatar", protectedRoute, deleteAvatar);

module.exports = router;
