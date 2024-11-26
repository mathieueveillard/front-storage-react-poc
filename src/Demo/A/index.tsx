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
    console.log("[A] User clicks the 'Increment' button");
    const state = updateState((n) => n + 1);
    console.log("[A] New (synchronous) value for a: ", state);
    console.log(
      "[A] Any business action based on the updated state, e.g. mutating the server"
    );
  };

  useEffect(() => {
    console.log("[A] Component renders");
  });

  return (
    <div>
      <div>a: {state}</div>
      <button onClick={increment}>Increment a</button>
    </div>
  );
};

export default Component;
