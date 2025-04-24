
import { loginReducer } from "./loginReducer";
import { userReducer } from "./userReducer";
import { combineReducers } from "redux";

const finalReducer = combineReducers({
  auth: loginReducer,
  user: userReducer,
 
});

export default finalReducer;