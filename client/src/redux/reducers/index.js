import { combineReducers } from 'redux';
import * as foodReducer from './food';

const appReducer = combineReducers({
    food: foodReducer.food,
});

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer;