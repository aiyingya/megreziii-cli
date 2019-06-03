import {createAction} from "redux-actions";
import types from "./ActionTypes";

export const loadingStart = createAction(types.LOADINGSTART);
export const loadingEnd = createAction(types.LOADINGEND);
export const search = createAction(types.SEARCH);
export const setFormItems = createAction(types.SETFORMITEMS);
export const setDatas = createAction(types.SET_DATAS);
export const setSearchObj = createAction(types.SET_SEARCH_OBJ);
export const setParentList = createAction(types.SET_PARENT_LIST);
export const setBtnLoadingActive = createAction(types.BTN_LOADING_ACTIVE);
export const setBtnLoadingDisplay = createAction(types.BTN_LOADING_DISPLAY);
export const setBtnRequestActive = createAction(types.BTN_REQUEST_ACTIVE);
export const setBtnRequestDisplay = createAction(types.BTN_REQUEST_DISPLAY);