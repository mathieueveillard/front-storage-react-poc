import { Lens } from "../Lens";

export const compose2Lenses = <T3, T2, T1>(
  ...[first, second]: [Lens<T3, T2>, Lens<T2, T1>]
): Lens<T3, T1> => ({
  get: (w) => second.get(first.get(w)),
  set: (w, u) => first.set(w, second.set(first.get(w), u)),
});

export const compose3Lenses = <T4, T3, T2, T1>(
  ...[first, second, third]: [Lens<T4, T3>, Lens<T3, T2>, Lens<T2, T1>]
): Lens<T4, T1> => compose2Lenses(first, compose2Lenses(second, third));

// compose4Lenses, compose5Lenses and so on…

export const composeLenses = compose2Lenses;
