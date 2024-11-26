import { Reducer } from "../reducer";

type Getter<V, U> = (v: V) => U;

type Setter<V, U> = (v: V, u: U) => V;

export type Lens<V, U> = {
  get: Getter<V, U>;
  set: Setter<V, U>;
  focus: <X>(lens: Lens<U, X>) => Lens<V, X>;
  reduce: (reducer: Reducer<U>) => Reducer<V>;
};

export const createLens = <V, U>(
  get: Getter<V, U>,
  set: Setter<V, U>
): Lens<V, U> => {
  // Composition of a lens with a lens
  const focus = <X>(lens: Lens<U, X>): Lens<V, X> =>
    createLens(
      (v) => lens.get(get(v)),
      (v, x) => set(v, lens.set(get(v), x))
    );

  // Composition of a lens with a reducer
  const reduce =
    (reducer: Reducer<U>): Reducer<V> =>
    (v: V) =>
      set(v, reducer(get(v)));

  return {
    get,
    set,
    focus,
    reduce,
  };
};

export const NO_FOCUS = <State>(): Lens<State, State> =>
  createLens(
    (state) => state,
    (_, state) => state
  );
