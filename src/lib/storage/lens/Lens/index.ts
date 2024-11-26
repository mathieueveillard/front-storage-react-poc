type Getter<V, U> = (v: V) => U;

type Setter<V, U> = (v: V, u: U) => V;

export type Lens<V, U> = {
  get: Getter<V, U>;
  set: Setter<V, U>;
};
