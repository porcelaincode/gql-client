// all user
export const SET_USER = "SET_USER";
export const REMOVE_USER = "REMOVE_USER";

export async function saveToStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export async function removeFromStorage(key: string) {
  localStorage.removeItem(key);
}

export const setUser = (user: any, save: boolean) => (dispatch: any) => {
  if (save) {
    saveToStorage("jwtToken", user.token).then(() => {
      saveToStorage("refreshToken", user.refreshToken);
    });
  }
  dispatch({
    type: SET_USER,
    payload: user,
  });
};

export const removeUser = () => (dispatch: any) => {
  removeFromStorage("jwtToken").then(() => {
    removeFromStorage("refreshToken");
  });
  dispatch({
    type: REMOVE_USER,
  });
};
