import { body, check } from "express-validator";

export const FoodIngredientInsertValidationSchema = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("You must supply a name to create a ingredient"),
];

export const FoodIngredientUpdateValidationSchema = [
    check('ingredients')
    .isArray()
    .withMessage("Ingredients must contain its ID")
];
