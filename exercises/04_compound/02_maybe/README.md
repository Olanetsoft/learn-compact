# Exercise: Maybe Type

## Objectives

In this exercise, you'll practice:

- Creating `Maybe` values with `some()` and `none()`
- Checking `isSome` before accessing values
- Using `Maybe` with Map lookups

## Task

Complete the contract in `exercise.compact`:

1. **Implement `createSome`** - wraps a value in `some()`
2. **Implement `createNone`** - returns `none<Uint<64>>()`
3. **Implement `unwrapOr`** - returns the value if present, otherwise returns a default
4. **Implement `getBalance`** - looks up a balance from the ledger map, returns 0 if not found
5. **Implement `hasBalance`** - returns true if the address exists in the map

## Hints

- Creating: `some(value)` and `none<T>()`
- Checking: `maybe.isSome`
- Accessing: `maybe.value` (only when `isSome` is true)
- Map lookup: `map.lookup(key)` returns `Maybe<V>`

## Running the Exercise

```bash
compact compile exercise.compact
```

## Solution

When you're ready, check `solutions/04_compound/02_maybe.compact`
