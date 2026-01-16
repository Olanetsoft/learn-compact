# Counter Type

The `Counter` is a ledger ADT for tracking numeric values that can be incremented and decremented.

## Declaration

```compact
export ledger counter: Counter;
export ledger score: Counter;
```

## Operations (All Available in Circuits)

| Operation        | Signature                        | Description            |
| ---------------- | -------------------------------- | ---------------------- |
| `increment`      | `(amount: Uint<16>): []`         | Add to counter         |
| `decrement`      | `(amount: Uint<16>): []`         | Subtract from counter  |
| `read`           | `(): Uint<64>`                   | Get current value      |
| `lessThan`       | `(threshold: Uint<64>): Boolean` | Compare with threshold |
| `resetToDefault` | `(): []`                         | Reset to zero          |

## Example Usage

```compact
export ledger counter: Counter;

// Increment by 1
export circuit increment(): [] {
    counter.increment(1);
}

// Increment by specific amount
export circuit add(amount: Uint<16>): [] {
    counter.increment(amount);
}

// Decrement by 1
export circuit decrement(): [] {
    counter.decrement(1);
}

// Read current value
export circuit get_count(): Uint<64> {
    return counter.read();
}

// Check if below threshold
export circuit is_below(threshold: Uint<64>): Boolean {
    return counter.lessThan(threshold);
}

// Reset to zero
export circuit reset(): [] {
    counter.resetToDefault();
}
```

## Use Cases

- **Vote counting:** Track number of votes
- **Round tracking:** Count game rounds or turns
- **Rate limiting:** Track action counts
- **Scoring:** Maintain scores in games

## TypeScript Access

From TypeScript, you can read the counter value directly:

```typescript
const currentValue = contractState.counter;
console.log(`Counter: ${currentValue}`);
```

## Exercises

Complete [`exercises/10_ledger/02_counter/`](https://github.com/Olanetsoft/learn-compact/tree/main/exercises/10_ledger/02_counter) to practice:

1. Building a click counter
2. Implementing a scoring system
3. Creating a rate limiter
