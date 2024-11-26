import React, { useEffect } from "react";
import { ApplicationState, useGlobalState } from "../..";
import { createLens } from "../../lib/utils/Lens";

const lens = createLens<ApplicationState, number>(
  ({ b }) => b,
  (state, b) => ({ ...state, b })
);

const Component: React.FunctionComponent = () => {
  const { state, updateState } = useGlobalState(lens);

  const increment = (): void => {
    const state = updateState((n) => n + 1);
    console.log("New (synchronous) value for b: ", state);
    // Meaning you can base business actions on this value, e.g. mutating the server
  };

  useEffect(() => {
    console.log("Component B renders");
  });

  return (
    <div>
      <div>b: {state}</div>
      <button onClick={increment}>Increment b</button>
    </div>
  );
};

export default Component;
