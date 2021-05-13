import { call, put, takeEvery } from "redux-saga/effects";
import { INGREDIENTS, STATUS } from "../types/food";
import { ERROR_RESPONSES, API } from '../../configs'
import axios from "axios";

function getFoodIngredients() {
  return axios
    .get(`${API.URL}/ingredients`)
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
}

function addNewFoodIngredient(name) {
  return axios
    .post(`${API.URL}/ingredients`, { name })
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
}

function updateFoodIngredient(ingredients) {
  return axios
    .put(`${API.URL}/ingredients`, { ingredients })
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
}

function* fetchIngredients(action) {
  try {
    const ingredients = yield call(getFoodIngredients);
    yield put({ type: INGREDIENTS + STATUS.SUCCESS, ingredients });
  } catch (error) {
    yield put({ type: INGREDIENTS + STATUS.FAIL, message: error.message });
  }
}

function* handleDropIngredient(action) {
  try {
    yield call(updateFoodIngredient, action.payload);
    yield put({
      type: INGREDIENTS + STATUS.SUCCESS,
      ingredients: action.payload,
    });
  } catch (error) {
    yield put({ type: INGREDIENTS + STATUS.FAIL, message: error.message });
  }
}

function* addNewIngredient(action) {
  try {
    if(action.payload) {
      const ingredient = yield call(addNewFoodIngredient, action.payload);
      yield put({
        type: INGREDIENTS + STATUS.ADD_NEW + STATUS.SUCCESS,
        ingredient,
      });
    } else {
      yield put({ type: INGREDIENTS + STATUS.FAIL, message: ERROR_RESPONSES.EMPTY_INGREDIENT });
    }
    
  } catch (error) {
    yield put({ type: INGREDIENTS + STATUS.FAIL, message: error.message });
  }
}

function* foodSaga() {
  yield takeEvery(INGREDIENTS + STATUS.FETCHING, fetchIngredients);
  yield takeEvery(INGREDIENTS + STATUS.HANDLE_DROP, handleDropIngredient);
  yield takeEvery(INGREDIENTS + STATUS.ADD_NEW, addNewIngredient);
}

export default foodSaga;
