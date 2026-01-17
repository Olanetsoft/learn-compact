# Exercise: Maybe Type

## Objectives

In this exercise, you'll practice:

- Creating `Maybe` values with `some()` and `none()`
- Checking `isSome` before accessing values
- Using `Maybe` for optional values

## Task

Complete the contract in `exercise.compact`:

1. **Implement `createSome`** - wraps a value in `some()`
2. **Implement `createNone`** - returns `none<Uint<64>>()`
3. **Implement `unwrapOr`** - returns the value if present, otherwise returns a default
4. **Implement `findById`** - returns `some(value)` if id > 0, otherwise `none()`
5. **Implement `doubleIfPresent`** - doubles the value if present, otherwise returns `none()`

## Hints

- Creating: `some(value)` and `none<T>()`
- Checking: `maybe.isSome`
- Accessing: `maybe.value` (only when `isSome` is true)

## Running the Exercise

```bash
compact compile exercise.compact
```

## Solution

When you're ready, check `solutions/04_compound/02_maybe.compact`
