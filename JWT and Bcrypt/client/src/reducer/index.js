import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import NavReducer from "./NavReducer";

export default combineReducers({
    AuthReducer: AuthReducer,
    NavReducer: NavReducer
});