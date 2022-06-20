import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from './reducer';

// TAMBAHKAN SETUP REDUX PERSIST
// ...

let store = createStore(
  rootReducer,
  applyMiddleware(promiseMiddleware, logger),
);
let persistor = 'TESTING';

export default {store, persistor};
