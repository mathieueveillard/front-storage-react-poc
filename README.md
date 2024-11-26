# Proof of Concept

## Reducer

```typescript
type Reducer<State> = (state: State) => State;
```

## Lens

```typescript
type Getter<V, U> = (v: V) => U;

type Setter<V, U> = (v: V, u: U) => V;

type Lens<V, U> = {
  get: Getter<V, U>;
  set: Setter<V, U>;
  focus: <X>(lens: Lens<U, X>) => Lens<V, X>;
  reduce: (reducer: Reducer<U>) => Reducer<V>;
};

const createLens = <V, U>(get: Getter<V, U>, set: Setter<V, U>): Lens<V, U> => {
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
```

## Store

```typescript
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
    state = lens.reduce(reducer)(state);
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
  _createStore(
    initialState,
    createLens(
      (state) => state,
      (_, state) => state
    )
  );
```

The corresponding use case:

```typescript
type State = {
  count: number;
  other: "other";
};

const initialState: State = {
  count: 0,
  other: "other",
};

test("It should allow to update a state with focusing", () => {
  // Given
  const lens = createLens<State, number>(
    ({ count }) => count,
    (state, count) => ({ ...state, count })
  );
  const store = createStore<State>(initialState).focus(lens);

  // When
  store.updateState((count) => count + 1);
  const actual = store.getState();

  // Then
  const expected: number = 1;
  expect(actual).toEqual(expected);
});
```
