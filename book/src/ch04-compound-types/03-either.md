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

### Error Handling

Use `Either` to return either a success value or an error:

```compact
// Left = error code, Right = success value
export circuit divide(
    a: Uint<64>,
    b: Uint<64>
): Either<Uint<8>, Uint<64>> {
    if (b == 0) {
        return left(1);  // Error code 1: division by zero
    }
    return right(a / b);
}
```

### Alternative Results

Return different types based on conditions:

```compact
// Left = not found (default value), Right = found value
export circuit lookup(
    key: Bytes<32>
): Either<Boolean, Uint<64>> {
    const result = data.lookup(key);
    if (result.isSome) {
        return right(result.value);
    }
    return left(false);  // Indicate not found
}
```

### Type-Safe Unions

Model data that can be one of two types:

```compact
// A payment can be either a token ID or a direct amount
struct Payment {
    value: Either<Bytes<32>, Uint<64>>;  // Left = tokenId, Right = amount
}
```

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
```

Example:

```typescript
// Compact: Either<Uint<64>, Boolean>
// TypeScript: { isLeft: boolean; left: bigint; right: boolean }
```

_Source: [Representations in TypeScript](https://docs.midnight.network/develop/reference/compact/lang-ref#representations-in-typescript)_

## Either vs Maybe

| Aspect       | `Maybe<T>`                   | `Either<A, B>`              |
| ------------ | ---------------------------- | --------------------------- |
| Purpose      | Optional value               | One of two types            |
| Indicator    | `isSome: Boolean`            | `isLeft: Boolean`           |
| Value fields | 1 (`value: T`)               | 2 (`left: A`, `right: B`)   |
| Use case     | Map lookups, optional params | Error handling, type unions |

## Exercises

Complete [`exercises/04_compound/03_either/`](https://github.com/Olanetsoft/learn-compact/tree/main/exercises/04_compound/03_either).
