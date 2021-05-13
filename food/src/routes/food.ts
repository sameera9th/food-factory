import express from "express";
import {
  getIngredients,
  insertIngredient,
  updateIngredients,
} from "../controllers/food";
import {
  FoodIngredientInsertValidationSchema,
  FoodIngredientUpdateValidationSchema,
} from "../validation-schemas/food";
import { validateRequest } from "@sam9th/common-modules"; // common set of modules written by me to use thorughout micro-services

const router = express.Router();

// get all ingredients route
router.get("/ingredients", getIngredients);

// insert an ingredient route
router.post(
  "/ingredients",
  FoodIngredientInsertValidationSchema,
  validateRequest,
  insertIngredient
);

// update ingredients route
router.put(
  "/ingredients",
  FoodIngredientUpdateValidationSchema,
  validateRequest,
  updateIngredients
);

export { router as foodRouter };
