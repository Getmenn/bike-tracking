import { legacy_createStore as createStore, combineReducers, applyMiddleware} from "redux"
import { mainReducer } from "./firstReducer"
import { reportsReducer } from "./reportsReducer"
import { composeWithDevTools } from "redux-devtools-extension";
//import thunk from "redux-thunk";

const rootReduser = combineReducers({
    main: mainReducer,
    reports: reportsReducer
})

export const store = createStore(rootReduser, composeWithDevTools(applyMiddleware())); //редьюсер передается в стор