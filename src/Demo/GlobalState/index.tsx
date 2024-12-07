import React from "react";
import { useGlobalState } from "../..";
import { NO_FOCUS } from "../../lib/utils/Lens";
import Code from "../utils/Code";
import H2 from "../utils/H2";

const Component: React.FunctionComponent = () => {
  const { state } = useGlobalState(NO_FOCUS());

  // Should you want to update only a given part of the global state
  // const { updateState } = useGlobalState(lens);

  const { a, b } = state;

  return (
    <div>
      <H2>Global state</H2>
      <Code>{`{ a: ${a}, b: ${b} }`}</Code>
    </div>
  );
};

export default Component;
