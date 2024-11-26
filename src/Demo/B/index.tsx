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
    console.log("[B] User clicks the 'Increment' button");
    const state = updateState((n) => n + 1);
    console.log("[B] New (synchronous) value for b: ", state);
    console.log(
      "[B] Any business action based on the updated state, e.g. mutating the server"
    );
  };

  useEffect(() => {
    console.log("[B] Component renders");
  });

  return (
    <div>
      <div>b: {state}</div>
      <button onClick={increment}>Increment b</button>
    </div>
  );
};

export default Component;
