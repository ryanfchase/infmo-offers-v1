import { createContext, Dispatch, useReducer } from "react";
import produce from 'immer';

export const initialState = {
  authToken: null,
  user: {},
  isLoggedIn: false,
};

export const reducer = produce((draft, action) => {
  // TODO - additionally store authToken in localStorage
  console.log("REDUCER::action: ", action)
  switch (action.type) {
    case "LOGIN":
      draft.authToken = action.payload.authToken;
      draft.user = action.payload.user;
      draft.isLoggedIn = true;
      break;
    case "LOGOUT":
      draft.authToken = null;
      draft.username = null;
      draft.isLoggedIn = false;
      break;
    default:
      break;
  }
});

export const AppStateContext = createContext(initialState);

export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppStateContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}