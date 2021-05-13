import { createStore, applyMiddleware } from 'redux'; // import createStore and applyMiddleware from redux
import createSagaMiddleware from 'redux-saga'; // import createSagaMiddleware from redux saga
import rootSaga from './redux/sagas'; // import rootSaga from sagas

import reducer from './redux/reducers'; // import root reducer from the reducers

const sagaMiddleware = createSagaMiddleware(); // creating the saga middleware

const middleware = applyMiddleware(sagaMiddleware); // apply saga as middleware into store creation

const store = createStore(reducer, middleware); // creating the store using reducer and middlewares

sagaMiddleware.run(rootSaga); // after creating the store the saga middleware will start

export default store;