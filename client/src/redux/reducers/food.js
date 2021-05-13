import { INGREDIENTS, STATUS } from "../types/food";

export const initialState = {
  ingredients: [], // this will store all the ingredients
  fetching: false, // this will store fetching event
  error: null, // this will store error responses
};

export const food = (state = initialState, action) => {
  switch (action.type) {
    case INGREDIENTS + STATUS.FETCHING: // Fetching ingredients
      return {
        ...state,
        fetching: true,
      };
    case INGREDIENTS + STATUS.SUCCESS: // Fetching ingredients success
      return {
        ...state,
        fetching: false,
        ingredients: action.ingredients,
      };
    case INGREDIENTS + STATUS.FAIL: // Fetching ingredients failed
      return {
        ...state,
        fetching: false,
        error: action.message,
      };
    case INGREDIENTS + STATUS.ADD_NEW + STATUS.SUCCESS: // Add new ingredient
        return {
            ...state,
            ingredients: [...state.ingredients, action.ingredient],
        };
    default:
      return state;
  }
};
