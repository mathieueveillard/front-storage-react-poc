// https://react.dev/reference/react/useSyncExternalStore

import { useSyncExternalStore } from "react";
import { createStore } from "../storage";
import { Lens } from "../utils/Lens";

export const connect = <State,>(initialState: State) => {
  const store = createStore(initialState);

  const useGlobalState = <Focus,>(lens: Lens<State, Focus>) => {
    const focusedStore = store.focus(lens);

    const { subscribe, getState, updateState } = focusedStore;

    const state = useSyncExternalStore(subscribe, getState);

    return {
      state,
      updateState,
    };
  };

  return useGlobalState;
};
