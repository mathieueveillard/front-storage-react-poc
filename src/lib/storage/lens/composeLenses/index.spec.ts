import { compose2Lenses, compose3Lenses } from ".";
import { Lens } from "../Lens";

type A = number;

type B = {
  a: A;
};

type C = {
  b: B;
};

const b2a: Lens<B, A> = {
  get: ({ a }) => a,
  set: (b, a) => ({ ...b, a }),
};

const c2b: Lens<C, B> = {
  get: ({ b }) => b,
  set: (c, b) => ({ ...c, b }),
};

describe("Compose 2 lenses", () => {
  const lens = compose2Lenses(c2b, b2a);

  const c: C = { b: { a: 42 } };

  test("Read", () => {
    expect(lens.get(c)).toEqual(42);
  });

  test("Write", () => {
    expect(lens.get(lens.set(c, 0))).toEqual(0);
  });
});

type D = {
  c: C;
};

const d2c: Lens<D, C> = {
  get: ({ c }) => c,
  set: (d, c) => ({ ...d, c }),
};

describe("Compose 3 lenses", () => {
  const lens = compose3Lenses(d2c, c2b, b2a);

  const d: D = { c: { b: { a: 42 } } };

  test("Read", () => {
    expect(lens.get(d)).toEqual(42);
  });

  test("Write", () => {
    expect(lens.get(lens.set(d, 0))).toEqual(0);
  });
});
