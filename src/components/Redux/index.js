import { legacy_createStore as createStore, combineReducers, applyMiddleware} from "redux"
import { cashReducer } from "./cashReducer";
import {customerReducer} from "./customerReduser"
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReduser = combineReducers({
    cash: cashReducer,
    customers: customerReducer,
})

export const store = createStore(rootReduser, composeWithDevTools(applyMiddleware())); //редьюсер передается в стор