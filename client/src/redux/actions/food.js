import { INGREDIENTS, STATUS } from "../types/food";

// get ingredients action
export function getIngredients(ingredients) {
  return {
    type: INGREDIENTS + STATUS.FETCHING,
    payload: ingredients,
  };
}

// handle ingredient drop action
export function handleIngredientDrop(ingredients){
  return {
    type: INGREDIENTS + STATUS.HANDLE_DROP,
    payload: ingredients,
  };
}

// add new ingredient action
export function addNewIngredient(name){
  return {
    type: INGREDIENTS + STATUS.ADD_NEW,
    payload: name,
  };
}
