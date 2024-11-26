# Proof of Concept

## The problem it solves

In the Redux ecosystem, reducers implement business rules. We believe reducers should live outside of Redux, which is a global state storage in the first place. In other words, we want to enforce a separation of concerns between business and storage.

## An example

This is the only setup required. `connect` creates a global store and makes it available through a `useGlobalState` hook.

```typescript
// index.tsx
import { connect } from "./lib/react-connect";

export type ApplicationState = {
  a: number;
  b: number;
};

export const useGlobalState = connect<ApplicationState>({ a: 0, b: 0 });
```

A component interacts with the global state as follows:

```typescript
// ComponentA.tsx
import React, { useEffect } from "react";
import { ApplicationState, useGlobalState } from "../..";
import { createLens } from "../../lib/utils/Lens";

// A lens allows you to focus on a given part of the global state
const lens = createLens<ApplicationState, number>(
  ({ a }) => a,
  (state, a) => ({ ...state, a })
);

const Component: React.FunctionComponent = () => {
  // state and updateState are focused according to the lens
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
      <div>{state}</div>
      <button onClick={increment}>Increment a</button>
    </div>
  );
};
```

## Getting started

```
git clone https://github.com/mathieueveillard/front-storage-react-poc.git
npm install
npm start
```
