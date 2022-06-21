import {combineReducers} from "redux"
import credReducer from "./credReducer"
import userauthidReducer from "./userauthidReducer";

const rootReducers = combineReducers({
    credReducer,
    userauthidReducer
})

export default rootReducers;