import { createContext, useContext, useReducer } from "react";
import produce from 'immer';

export const initialState = {
  authToken: null,
  isLoggedIn: false,
  offersLoaded: false,
  user: {},
  offers: [],
  claimedOffers: [],
};

export const reducer = produce((draft, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("authToken", action.payload.authToken);
      localStorage.setItem("localSignin", true);
      draft.authToken = action.payload.authToken;
      draft.user = action.payload.user;
      draft.isLoggedIn = true;
      break;
    case "LOGOUT":
      localStorage.removeItem("authToken");
      localStorage.removeItem("localSignin");
      draft.authToken = null;
      draft.offersLoaded = false;
      draft.user = {};
      draft.isLoggedIn = false;
      break;
    case "SET_OFFERS":
      draft.offers = [];
      action.payload.offers.forEach(offer => {
        draft.offers.push(offer);
      })
      draft.offersLoaded = true;
      break;
    default:
      break;
  }
  console.log("new draft: ", JSON.stringify(draft))
});

export const AppStateContext = createContext(initialState);

export const useAppStateContext = () => {
  return useContext(AppStateContext);
}

export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppStateContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}