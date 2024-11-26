import { createStore } from ".";
import { createLens } from "./lens";

type State = {
  count: number;
  other: "other";
};

const initialState: State = {
  count: 0,
  other: "other",
};

describe("Test of createStore", () => {
  test("It should allow to update a state without focusing", () => {
    // Given
    const store = createStore<State>(initialState);

    // When
    store.updateState((state) => ({ ...state, count: state.count + 1 }));
    const actual = store.getState();

    // Then
    const expected: State = { count: 1, other: "other" };
    expect(actual).toEqual(expected);
  });

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
});
