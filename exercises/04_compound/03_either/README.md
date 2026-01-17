# Exercise: Either Type

## Objectives

In this exercise, you'll practice:

- Creating `Either` values with `left()` and `right()`
- Checking `isLeft` to determine which value is present
- Using `Either` for conditional result patterns

## Task

Complete the contract in `exercise.compact`:

1. **Implement `createLeft`** - wraps a value as a left value
2. **Implement `createRight`** - wraps a value as a right value
3. **Implement `validatePositive`** - returns `left(errorCode)` if value is 0, `right(value)` otherwise
4. **Implement `isSuccess`** - returns true if the Either contains a right value
5. **Implement `extractOrDefault`** - extracts the right value if present, otherwise returns a default

## Hints

- Creating: `left(value)` and `right(value)`
- Checking: `either.isLeft`
- Accessing: `either.left` or `either.right` based on `isLeft`
- Convention: `Left` = error/failure, `Right` = success

## Running the Exercise

```bash
compact compile exercise.compact
```

## Solution

When you're ready, check `solutions/04_compound/03_either.compact`
