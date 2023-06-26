const express = require("express");
const {
  getProduct,
  getProductEachUser,
  getProductDetail,
  createProduct,
  GetProductTop,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const {isAdmin} = require("../middleware/roleGuard");
const protectedRoute = require("../middleware/protectedRoute");
const idMatch = require("../middleware/idMatch");
const uploadCloud = require("../config/cloudinary");
const router = express.Router();

router.get("/list", getProduct);

router.get("/my-list", protectedRoute, isAdmin, getProductEachUser);

router.get("/detail/:id", idMatch, getProductDetail); //Product._id

router.get("/top", GetProductTop);

router.post(
  "/create",
  protectedRoute,
  isAdmin,
  uploadCloud.single("image"),
  createProduct
);

router.post(
  "/update/:id",
  idMatch,
  protectedRoute,
  isAdmin,
  uploadCloud.single("image"),
  updateProduct
); //Product._id

router.delete("/delete/:id", idMatch, protectedRoute, isAdmin, deleteProduct); //Product._id

router.get("/:id/review/list", idMatch); //Product._id

router.post("/:id/review/create", idMatch, protectedRoute, isAdmin); //Product._id - Review._id

router.post("/:id/review/update/:id2", idMatch, protectedRoute, isAdmin); //Product._id - Review._id

router.delete("/:id/review/delete/:id2", idMatch, protectedRoute, isAdmin); //Product._id - Review._id

module.exports = router;
