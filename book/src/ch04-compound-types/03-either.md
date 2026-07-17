# Either Type

The `Either<A, B>` type represents a value that can be one of two possible types—either type `A` (left) or type `B` (right).

## Structure Definition

The standard library defines `Either<A, B>` with these fields (note the snake_case `is_left`):

```text
struct Either<A, B> {
    is_left: Boolean;
    left: A;
    right: B;
}
```

_Source: [Standard library structs](https://docs.midnight.network/develop/reference/compact/compact-std-library/exports#structs). Field names verified against compiler 0.31.1 — `isLeft` does not exist._

## Creating Either Values

Use the `left()` and `right()` constructor functions with explicit type parameters:

```compact
export pure circuit makeEithers(): Either<Uint<64>, Boolean> {
    // Create a left value (type A) - must specify both types
    const leftVal: Either<Uint<64>, Boolean> = left<Uint<64>, Boolean>(42);

    // Create a right value (type B) - must specify both types
    const rightVal: Either<Uint<64>, Boolean> = right<Uint<64>, Boolean>(true);

    return leftVal;
}
```

## Checking Which Value

Check `is_left` to determine which value is present:

```compact
export circuit processEither(e: Either<Uint<64>, Boolean>): Uint<64> {
    if (e.is_left) {
        return e.left;
    }
    if (e.right) {
        return 1;
    }
    return 0;
}
```

> ⚠️ **Important:** Like `Maybe`, both fields contain values, but only one is meaningful based on `is_left`. The other contains a default value.

## Common Use Cases

### Conditional Results

Use `Either` to return one of two different result types based on a condition:

```compact
// Left = error code, Right = success value
export pure circuit validateAmount(
    amount: Uint<64>
): Either<Uint<8>, Uint<64>> {
    if (amount == 0) {
        return left<Uint<8>, Uint<64>>(1);  // Error code 1: zero amount
    }
    return right<Uint<8>, Uint<64>>(amount);
}
```

### Type-Safe Unions

Model data that can be one of two types:

```compact
// A value can be either a small number or a large number
struct NumberValue {
    value: Either<Uint<8>, Uint<64>>;  // Left = small, Right = large
}

export pure circuit createSmall(n: Uint<8>): NumberValue {
    return NumberValue { value: left<Uint<8>, Uint<64>>(n) };
}

export pure circuit createLarge(n: Uint<64>): NumberValue {
    return NumberValue { value: right<Uint<8>, Uint<64>>(n) };
}
```

### Binary Choice

Represent a choice between two options:

```compact
// Left = option A chosen, Right = option B chosen
export pure circuit chooseOption(
    selectA: Boolean,
    valueA: Uint<64>,
    valueB: Uint<64>
): Either<Uint<64>, Uint<64>> {
    if (selectA) {
        return left<Uint<64>, Uint<64>>(valueA);
    }
    return right<Uint<64>, Uint<64>>(valueB);
}
```

## Default Values

The default value of `Either<A, B>` is:

- `is_left` = `false`
- `left` = default value of `A`
- `right` = default value of `B`

_Source: [Default values](https://docs.midnight.network/develop/reference/compact/lang-ref#default-values)_

## TypeScript Representation

In TypeScript, `Either<A, B>` is represented as (verified against compiler 0.31.1 generated types):

```typescript
interface Either<A, B> {
  is_left: boolean;
  left: A; // A's TypeScript equivalent
  right: B; // B's TypeScript equivalent
}
```

Example:

```typescript
// Compact: Either<Uint<64>, Boolean>
// TypeScript: { is_left: boolean; left: bigint; right: boolean }
```

_Source: [Representations in TypeScript](https://docs.midnight.network/develop/reference/compact/lang-ref#representations-in-typescript)_

## Either vs Maybe

| Aspect       | `Maybe<T>`         | `Either<A, B>`            |
| ------------ | ------------------ | ------------------------- |
| Purpose      | Optional value     | One of two types          |
| Indicator    | `is_some: Boolean` | `is_left: Boolean`        |
| Value fields | 1 (`value: T`)     | 2 (`left: A`, `right: B`) |

_Source: [Standard library structs](https://docs.midnight.network/develop/reference/compact/compact-std-library/exports#structs)_

## Exercises

Complete [`exercises/04_compound/03_either/`](https://github.com/Olanetsoft/learn-compact/tree/main/exercises/04_compound/03_either).
