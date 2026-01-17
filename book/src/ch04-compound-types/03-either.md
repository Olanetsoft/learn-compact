# Either Type

The `Either<A, B>` type represents a value that can be one of two possible types—either type `A` (left) or type `B` (right).

## Structure Definition

```compact
struct Either<A, B> {
    isLeft: Boolean;
    left: A;
    right: B;
}
```

_Source: [Standard library structs](https://docs.midnight.network/develop/reference/compact/compact-std-library/exports#structs)_

## Creating Either Values

Use the `left()` and `right()` constructor functions:

```compact
// Create a left value (type A)
const leftVal: Either<Uint<64>, Boolean> = left(42);

// Create a right value (type B)
const rightVal: Either<Uint<64>, Boolean> = right(true);
```

## Checking Which Value

Check `isLeft` to determine which value is present:

```compact
export circuit processEither(e: Either<Uint<64>, Boolean>): Uint<64> {
    if (e.isLeft) {
        return e.left;
    } else {
        if (e.right) {
            return 1;
        } else {
            return 0;
        }
    }
}
```

> ⚠️ **Important:** Like `Maybe`, both fields contain values, but only one is meaningful based on `isLeft`. The other contains a default value.

## Common Use Cases

### Conditional Results

Use `Either` to return one of two different result types based on a condition:

```compact
// Left = error code, Right = success value
export pure circuit validateAmount(
    amount: Uint<64>
): Either<Uint<8>, Uint<64>> {
    if (amount == 0) {
        return left(1);  // Error code 1: zero amount
    }
    return right(amount);
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
    return NumberValue { left(n) };
}

export pure circuit createLarge(n: Uint<64>): NumberValue {
    return NumberValue { right(n) };
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
        return left(valueA);
    }
    return right(valueB);
}
```

````

## Default Values

The default value of `Either<A, B>` is:

- `isLeft` = `false`
- `left` = default value of `A`
- `right` = default value of `B`

_Source: [Default values](https://docs.midnight.network/develop/reference/compact/lang-ref#default-values)_

## TypeScript Representation

In TypeScript, `Either<A, B>` is represented as:

```typescript
interface Either<A, B> {
  isLeft: boolean;
  left: A; // A's TypeScript equivalent
  right: B; // B's TypeScript equivalent
}
````

Example:

```typescript
// Compact: Either<Uint<64>, Boolean>
// TypeScript: { isLeft: boolean; left: bigint; right: boolean }
```

_Source: [Representations in TypeScript](https://docs.midnight.network/develop/reference/compact/lang-ref#representations-in-typescript)_

## Either vs Maybe

| Aspect       | `Maybe<T>`        | `Either<A, B>`            |
| ------------ | ----------------- | ------------------------- |
| Purpose      | Optional value    | One of two types          |
| Indicator    | `isSome: Boolean` | `isLeft: Boolean`         |
| Value fields | 1 (`value: T`)    | 2 (`left: A`, `right: B`) |

_Source: [Standard library structs](https://docs.midnight.network/develop/reference/compact/compact-std-library/exports#structs)_

## Exercises

Complete [`exercises/04_compound/03_either/`](https://github.com/Olanetsoft/learn-compact/tree/main/exercises/04_compound/03_either).
