import { createCollection } from "../utils/Collection";
import { Lens } from "../utils/Lens";
import { Reducer } from "../utils/reducer";

export type Subscriber = () => void;

export type CleanUpFunction = () => void;

type FocusedStore<Focus> = {
  getState: () => Focus;
  updateState: (reducer: Reducer<Focus>) => Focus;
  subscribe: (subscriber: Subscriber) => CleanUpFunction;
};

export type Store<State> = {
  getState: () => State;
  updateState: (reducer: Reducer<State>) => State;
  subscribe: (subscriber: Subscriber) => CleanUpFunction;
  focus: <Focus>(lens: Lens<State, Focus>) => FocusedStore<Focus>;
};

export const createStore = <State>(initialState: State): Store<State> => {
  let state = initialState;

  let subscribers = createCollection<Subscriber>();

  const getState = () => state;

  const updateState = (reducer: Reducer<State>) => {
    state = reducer(state);

    subscribers.forEach((subscriber) => {
      subscriber();
    });

    return state;
  };

  const subscribe = (subscriber: Subscriber) => {
    subscribers = subscribers.append(subscriber);

    return () => {
      subscribers = subscribers.remove(subscriber);
    };
  };

  const focus = <Focus>(lens: Lens<State, Focus>) => {
    return {
      getState: () => lens.get(state),
      updateState: (reducer: Reducer<Focus>) => {
        const state = updateState(lens.reduce(reducer));
        return lens.get(state);
      },
      subscribe,
    };
  };

  return {
    getState,
    updateState,
    subscribe,
    focus,
  };
};
