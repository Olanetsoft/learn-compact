# Exercise: Counter Operations

## Goal

Master the Counter ledger type and its operations.

## Instructions

1. Open `exercise.compact`
2. Create the circuits as described

## Counter Operations

- `counter.increment(n)` - Add n to the counter
- `counter.decrement(n)` - Subtract n from the counter
- `counter.resetToDefault()` - Reset to zero

## ⚠️ Important

`counter.value()` is **NOT** available inside circuits! You can only read the counter value from the TypeScript SDK.

## Verify

```bash
compactc exercise.compact
```
