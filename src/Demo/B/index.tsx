import React, { useEffect } from "react";
import { ApplicationState, useGlobalState } from "../..";
import { createLens } from "../../lib/utils/Lens";
import Code from "../utils/Code";
import Button from "../utils/Button";
import H2 from "../utils/H2";

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
  };

  useEffect(() => {
    console.log("[B] Component renders\n---------------------------");
  });

  return (
    <div>
      <H2>Component B</H2>
      <div className="flex gap-2">
        <Code>b: {state}</Code>
        <Button onClick={increment}>Increment b</Button>
      </div>
    </div>
  );
};

export default Component;
