// src/store/client/reducer.js
import { SET_LANGUAGE, SET_ROLES, SET_THEME, SET_USER } from "../actionTypes";

const initialState = {
  user: null,              // {id, name, email, ...}
  addressList: [],         // [{...}]
  creditCards: [],         // [{...}]
  roles: [],               // [{id, name, code}]
  theme: "light",
  language: "tr",
};

export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_ROLES:
      return { ...state, roles: action.payload };
    case SET_THEME:
      return { ...state, theme: action.payload };
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    default:
      return state;
  }
}
