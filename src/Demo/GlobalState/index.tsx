import React from "react";
import { useGlobalState } from "../..";
import { NO_FOCUS } from "../../lib/utils/Lens";

const Component: React.FunctionComponent = () => {
  const { state } = useGlobalState(NO_FOCUS());

  // Should you want to update only a given part of the global state
  // const { updateState } = useGlobalState(lens);

  const { a, b } = state;

  return <div>{`Global state: { a: ${a}, b: ${b} }`}</div>;
};

export default Component;
