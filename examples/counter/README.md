# Counter Example

A simple counter contract demonstrating the basics of Compact.

## Features

- Increment counter
- Decrement counter
- Add arbitrary amount
- Reset to zero

## Contract

See [contract.compact](./contract.compact) for the full implementation.

## Key Concepts Demonstrated

1. **Ledger State:** Using `Counter` type
2. **Circuits:** Basic circuit declaration
3. **State Operations:** `increment()`, `decrement()`, `resetToDefault()`

## Compile

```bash
compactc contract.compact
```

## Usage with TypeScript

```typescript
// After compilation, import the generated types
import { Counter } from "./contract";

// Deploy the contract
const deployed = await Counter.deploy(provider);

// Call circuits
await deployed.increment();
await deployed.add(10n);

// Read state
const currentValue = await deployed.ledger.counter;
console.log(`Counter value: ${currentValue}`);
```
