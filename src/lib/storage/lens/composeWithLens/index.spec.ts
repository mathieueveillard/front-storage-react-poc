import { composeWithLens } from ".";
import { Lens } from "../Lens";

type A = number;

type B = {
  a: A;
  other: "other";
};

const lens: Lens<B, A> = {
  get: ({ a }) => a,
  set: (b, a) => ({ ...b, a }),
};

describe("Test of composeWithLens()", () => {
  test("A lens should allow to reduce the whole state with a focused reducer", () => {
    // Given
    const b: B = {
      a: 42,
      other: "other",
    };
    const reducer = composeWithLens(lens, (a: number) => a + 1);

    // When
    const actual = reducer(b);

    // Then
    const expected: B = {
      a: 43,
      other: "other",
    };
    expect(actual).toEqual(expected);
  });
});
