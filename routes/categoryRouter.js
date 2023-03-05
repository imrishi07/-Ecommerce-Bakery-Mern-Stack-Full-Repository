import express from "express";
import {
  createCategoryController,
  updateCategoryController,
  allCategoryController,
  singleCategoryController,
  deleteCategoryController,
} from "../controllers/categoryController.js";
import { isAdmin, requireSignIn } from "./../middleware/authMiddleware.js";

const router = express.Router();

//routes
//Create Category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//Update Category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//Get All Category
router.get("/all-category", allCategoryController);

//Get a Single Category
router.get("/single-category/:slug", singleCategoryController);

//Delete a Category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
