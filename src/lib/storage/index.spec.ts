import { createStore } from ".";
import { createLens } from "../utils/Lens";

type State = {
  count: number;
  other: "other";
};

const initialState: State = {
  count: 0,
  other: "other",
};

describe("Test of createStore", () => {
  describe("Without focusing", () => {
    test("It should allow to update the state", () => {
      // Given
      const store = createStore<State>(initialState);

      // When
      store.updateState((state) => ({ ...state, count: state.count + 1 }));
      const actual = store.getState();

      // Then
      const expected: State = { count: 1, other: "other" };
      expect(actual).toEqual(expected);
    });

    test("It should notify its subscribers", () => {
      // Given
      const store = createStore<State>(initialState);
      const subscriber = jest.fn();
      store.subscribe(subscriber);

      // When
      store.updateState((state) => ({ ...state, count: state.count + 1 }));

      // Then
      expect(subscriber).toHaveBeenCalled();
    });

    test("It should allow its subscribers to unsubscribe", () => {
      // Given
      const store = createStore<State>(initialState);
      const subscriber = jest.fn();
      const cleanUp = store.subscribe(subscriber);
      cleanUp();

      // When
      store.updateState((state) => ({ ...state, count: state.count + 1 }));

      // Then
      expect(subscriber).not.toHaveBeenCalled();
    });

    test("It should allow many subscribers to subscribe and unsubscribe", () => {
      // Given
      const store = createStore<State>(initialState);
      const first = jest.fn();
      const cleanUp = store.subscribe(first);
      const second = jest.fn();
      store.subscribe(second);
      cleanUp();

      // When
      store.updateState((state) => ({ ...state, count: state.count + 1 }));

      // Then
      expect(first).not.toHaveBeenCalled();
      expect(second).toHaveBeenCalled();
    });
  });

  describe("With focusing", () => {
    test("It should allow to update the state", () => {
      // Given
      const lens = createLens<State, number>(
        ({ count }) => count,
        (state, count) => ({ ...state, count })
      );
      const store = createStore<State>(initialState);
      const focusedStore = store.focus(lens);

      // When
      focusedStore.updateState((count) => count + 1);
      const actual = store.getState();

      // Then
      const expected: State = {
        count: 1,
        other: "other",
      };
      expect(actual).toEqual(expected);
    });

    test("It should notify its subscribers", () => {
      // Given
      const lens = createLens<State, number>(
        ({ count }) => count,
        (state, count) => ({ ...state, count })
      );
      const store = createStore<State>(initialState).focus(lens);
      const subscriber = jest.fn();
      store.subscribe(subscriber);

      // When
      store.updateState((count) => count + 1);

      // Then
      expect(subscriber).toHaveBeenCalled();
    });

    test("It should notify its subscribers (bis)", () => {
      // Given
      const lens = createLens<State, number>(
        ({ count }) => count,
        (state, count) => ({ ...state, count })
      );
      const store = createStore<State>(initialState);
      const subscriber = jest.fn();
      store.subscribe(subscriber);
      const focusedStore = store.focus(lens);

      // When
      focusedStore.updateState((count) => count + 1);

      // Then
      expect(subscriber).toHaveBeenCalled();
    });
  });
});
