// src/store/index.js
import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk as thunkMiddleware } from "redux-thunk"; // ✅ named export (default değil)
import { createLogger } from "redux-logger";

import clientReducer from "./client/reducer";
import productReducer from "./product/reducer";
import cartReducer from "./cart/reducer";
import addressReducer from "./address/reducer"; // T20

const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: cartReducer,
  address: addressReducer,
});

const logger = createLogger({ collapsed: true });
const middleware = [thunkMiddleware, logger]; // ✅ thunkMiddleware kullan

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
