import { createStore } from "redux";
import { IAction } from "../actions";
import { AppReducer, AppState } from "../reducers";

const AppStore = createStore<AppState, IAction, {}, {}>(AppReducer);

export default AppStore;
