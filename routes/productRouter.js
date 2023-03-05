import express from "express";
import { isAdmin, requireSignIn } from "./../middleware/authMiddleware.js";
import {
  createProductController,
  getAllProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
  deleteProductController,
  filterProductController,
  countProductController,
  productListController,
  searchProductController,
  relatedProductCaregory,
  productCategoryController,
  braintreeTokenController,
  braintreePaymentController,
} from "./../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//Create Product Router
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//Get All Product Router
router.get("/get-all-product", getAllProductController);

//Get a Single Product Router
router.get("/get-single-product/:slug", getSingleProductController);

//Get a Photo Router
router.get("/product-photo/:pid", productPhotoController);

//Update Product Router
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//Delete Product Router
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

//Filter Product Router
router.post("/product-filter", filterProductController);

//Count Product Router
router.get("/product-count", countProductController);

//Count Product Per Page
router.get("/product-list/:page", productListController);

//Search Product
router.get("/search/:keyword", searchProductController);

//Related Product
router.get("/related-product/:pid/:cid", relatedProductCaregory);

//Category wise product
router.get("/product-category/:slug", productCategoryController);

//Payment Routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;
