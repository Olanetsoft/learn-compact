# TypeScript Implementation

Witnesses are declared in Compact but implemented in TypeScript. The implementation lives in a **separate TypeScript file**, not in your `.compact` file.

## Workflow

### Step 1: Declare the Witness in Compact

In your `.compact` file, declare what the witness looks like:

```compact
pragma language_version >= 0.16 && <= 0.18;

import CompactStandardLibrary;

// Declaration only - no body
witness getSecretKey(): Bytes<32>;

export ledger owner: Bytes<32>;

export circuit setOwner(): [] {
    const key = getSecretKey();
    owner = disclose(key);
}
```

### Step 2: Compile

```bash
compact compile my-contract.compact managed/my-contract
```

This generates TypeScript types in `managed/my-contract/`.

### Step 3: Implement in TypeScript

Create a `.ts` file with the actual implementation:

```typescript
export type MyPrivateState = {
  secretKey: Uint8Array;
};

export const witnesses = {
  getSecretKey: ({ privateState }) => {
    return [privateState, privateState.secretKey];
  },
};
```

### Step 4: Use in Your DApp

```typescript
import { witnesses, MyPrivateState } from "./witnesses";

const initialPrivateState: MyPrivateState = {
  secretKey: new Uint8Array(32),
};
```

## Project Structure

```
your-project/
├── contracts/
│   └── my-contract.compact       # Step 1: Compact code
├── contracts/managed/
│   └── my-contract/              # Step 2: Generated files (after compile)
│       ├── contract/
│       └── ...
└── src/
    └── witnesses.ts              # Step 3: Your TypeScript implementation
```

_Source: [Create MN App](https://docs.midnight.network/getting-started/create-mn-app)_

> **Note:** The Compact compiler only checks `.compact` syntax. To test the full witness flow, you need a complete DApp with the Midnight runtime.

## Generated API

When you compile, the TypeScript target generates a `Witnesses<T>` type. Each witness becomes a function:

```typescript
type Witness<PS> = (
  context: WitnessContext<any, PS>,
  ...rest: any[]
) => [PS, any];
```

_Source: [Witness type](https://docs.midnight.network/develop/reference/midnight-api/midnight-js/@midnight-ntwrk/midnight-js-types/type-aliases/Witness)_

`WitnessContext` provides:

- `ledger` - Current ledger state
- `privateState` - Your private state
- `contractAddress` - The contract's address

_Source: [WitnessContext](https://docs.midnight.network/develop/reference/midnight-api/compact-runtime/interfaces/WitnessContext)_

## Example from BBoard DApp

**Compact:**

```text
witness localSecretKey(): Bytes<32>;
```

**TypeScript:**

```typescript
export type BBoardPrivateState = {
  secretKey: Uint8Array;
};

export const witnesses = createBBoardWitnesses<BBoardPrivateState>({
  localSecretKey: ({ privateState }) => {
    return [privateState, privateState.secretKey];
  },
});
```

_Source: [BBoard DApp](https://docs.midnight.network/develop/tutorial/creating/bboard-dapp)_

## Key Points

1. First argument is `WitnessContext<Ledger, PrivateState>`
2. Return `[newPrivateState, result]`
3. Don't mutate `privateState` - return updated state

## Contracts Without Witnesses

If your contract has no witnesses, provide an empty object:

```typescript
export type CounterPrivateState = {
  privateCounter: number;
};

export const witnesses = {};
```

_Source: [Counter DApp](https://docs.midnight.network/develop/tutorial/building/dapp-details#the-contract-sub-project)_

## How the Runtime Uses Witnesses

When you instantiate the contract, you pass your witnesses. The runtime:

1. Calls the witness function when Compact code invokes it
2. Passes current `privateState` via `context.privateState`
3. Receives `[updatedPrivateState, value]` back
4. Threads the updated state through subsequent calls

_Source: [TypeScript target](https://docs.midnight.network/develop/reference/compact/lang-ref#typescript-target)_

## Next Steps

Now that you understand witnesses, learn about [Control Flow](../ch08-control-flow/index.md).
