import { createStore } from ".";
import { Lens } from "./lens";

type State = {
  count: number;
};

const initialState: State = {
  count: 0,
};

describe("Test of createStore", () => {
  test("It should allow to update a state without focusing", () => {
    // Given
    const store = createStore<State>(initialState);

    // When
    store.updateState(({ count }) => ({ count: count + 1 }));
    const actual = store.getState();

    // Then
    const expected: State = { count: 1 };
    expect(actual).toEqual(expected);
  });

  test("It should allow to update a state with focusing", () => {
    // Given
    const lens: Lens<State, number> = {
      get: ({ count }) => count,
      set: (_, count) => ({ count }),
    };
    const store = createStore<State>(initialState).focus(lens);

    // When
    store.updateState((count) => count + 1);
    const actual = store.getState();

    // Then
    const expected: number = 1;
    expect(actual).toEqual(expected);
  });
});
