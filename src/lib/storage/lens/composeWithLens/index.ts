import { Reducer } from "../../reducer";
import { Lens } from "../Lens";

export const composeWithLens =
  <V, U>({ get, set }: Lens<V, U>, reducer: Reducer<U>): Reducer<V> =>
  (v: V) =>
    set(v, reducer(get(v)));
