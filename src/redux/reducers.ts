import { SET_USER, REMOVE_USER, removeFromStorage } from "./actions";

import jwtDecode from "jwt-decode";

var userState = {
  user: null,
};

function getValueFor(key: string) {
  const t = localStorage.getItem(key);
  if (t) {
    return JSON.parse(t);
  } else {
    return t;
  }
}

const data = getValueFor("jwtToken");
if (data) {
  const decodedToken: any = jwtDecode(data);
  if (decodedToken.exp * 1000 < Date.now()) {
    removeFromStorage("jwtToken");
    removeFromStorage("refreshToken");
  } else {
    userState.user = { ...decodedToken, data };
  }
}

export function userReducer(state: any = userState, action: any) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}
