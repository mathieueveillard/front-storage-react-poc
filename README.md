# front-storage-react-poc

## The problem it solves

In the Redux ecosystem, reducers implement business rules. We believe reducers should live outside of Redux, which is a global state storage in the first place. In other words, we want to enforce a separation of concerns between business and storage.

## Demo

![Screen capture as a demo](/assets/images/front-storage-react-poc-screen-capture.png)

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
  };

  useEffect(() => {
    console.log("[A] Component renders\n---------------------------");
  });

  return (
    <div>
      <H2>Component A</H2>
      <div className="flex gap-2">
        <Code>a: {state}</Code>
        <Button onClick={increment}>Increment a</Button>
      </div>
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
