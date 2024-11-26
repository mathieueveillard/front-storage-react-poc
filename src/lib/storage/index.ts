import { composeWithLens, Lens } from "./lens";
import { Reducer } from "./reducer";

type Store<State, SubState> = {
  getState: () => SubState;
  updateState: (reducer: Reducer<SubState>) => void;
  focus: <Focus>(lens: Lens<State, Focus>) => Store<State, Focus>;
};

const _createStore = <State, SubState = State>(
  initialState: State,
  lens: Lens<State, SubState>
): Store<State, SubState> => {
  let state = initialState;

  const getState = (): SubState => lens.get(state);

  const updateState = (reducer: Reducer<SubState>): void => {
    state = composeWithLens(lens, reducer)(state);
  };

  const focus = <Focus>(lens: Lens<State, Focus>): Store<State, Focus> =>
    _createStore<State, Focus>(state, lens);

  return {
    getState,
    updateState,
    focus,
  };
};

export const createStore = <State>(initialState: State): Store<State, State> =>
  _createStore(initialState, {
    get: (state) => state,
    set: (_, state) => state,
  });
