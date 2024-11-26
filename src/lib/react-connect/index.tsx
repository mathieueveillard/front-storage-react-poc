import React, { createContext, useContext } from "react";
import { createStore, Store } from "../storage";

export const connect = <State,>(initialState: State) => {
  const store = createStore(initialState);

  const GlobalStateContext = createContext<Store<State, State>>(store);

  const useGlobalState = () => useContext(GlobalStateContext);

  const WithGlobalState: React.FunctionComponent<{
    children: React.ReactNode;
  }> = ({ children }) => (
    <GlobalStateContext.Provider value={store}>
      {children}
    </GlobalStateContext.Provider>
  );

  return {
    WithGlobalState,
    useGlobalState,
  };
};
