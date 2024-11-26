import React, { useEffect } from "react";
import { ApplicationState, useGlobalState } from "../..";
import { createLens } from "../../lib/utils/Lens";

const lens = createLens<ApplicationState, number>(
  ({ a }) => a,
  (state, a) => ({ ...state, a })
);

const Component: React.FunctionComponent = () => {
  const { state, updateState } = useGlobalState(lens);

  const increment = (): void => {
    const state = updateState((n) => n + 1);
    console.log("New (synchronous) value for a: ", state);
    // Meaning you can base business actions on this value, e.g. mutating the server
  };

  useEffect(() => {
    console.log("Component A renders");
  });

  return (
    <div>
      <div>a: {state}</div>
      <button onClick={increment}>Increment a</button>
    </div>
  );
};

export default Component;
