import React, { createContext, useReducer } from "react";

import jwtDecode from "jwt-decode";

const initialUser = { user: null };
const userToken = localStorage.getItem("jwtToken");
if (userToken) {
  const decodedUserToken = jwtDecode(userToken);
  if (decodedUserToken.exp * 1000 <= Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialUser.user = decodedUserToken;
  }
}

const UserContext = createContext({
  user: null,
  login: userData => {},
  logout: () => {}
});

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload
      };
    case "LOGOUT":
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};

const UserProvider = props => {
  const [state, dispatch] = useReducer(userReducer, initialUser);

  const login = userData => {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData
    });
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <UserContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { UserContext, UserProvider };
