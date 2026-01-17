# Maybe Type

The `Maybe<T>` type represents an optional value—either a value of type `T` exists, or it doesn't.

## Structure Definition

```compact
struct Maybe<T> {
    isSome: Boolean;
    value: T;
}
```

_Source: [Standard library structs](https://docs.midnight.network/develop/reference/compact/compact-std-library/exports#structs)_

## Creating Maybe Values

Use the `some()` and `none()` constructor functions:

```compact
// Create a Maybe with a value
const hasValue: Maybe<Uint<64>> = some(42);

// Create an empty Maybe (must specify type)
const noValue: Maybe<Uint<64>> = none<Uint<64>>();
```

## Checking for Values

Always check `isSome` before accessing `value`:

```compact
export circuit processOptional(opt: Maybe<Uint<64>>): Uint<64> {
    if (opt.isSome) {
        return opt.value;
    } else {
        return 0;  // Default value
    }
}
```

> ⚠️ **Important:** If `isSome` is `false`, the `value` field contains a default value (0 for numeric types). Accessing it without checking `isSome` won't cause an error but may lead to incorrect logic.

## Common Use Cases

### Optional Parameters

Use `Maybe` for optional circuit parameters:

```compact
export circuit transfer(
    from: Bytes<32>,
    to: Bytes<32>,
    amount: Uint<64>,
    memo: Maybe<Bytes<64>>
): [] {
    // Transfer logic...
    if (memo.isSome) {
        // Process the memo
    }
}
```

### Optional Return Values

Use `Maybe` when a circuit might not have a meaningful result:

```compact
export circuit findValue(id: Uint<32>): Maybe<Uint<64>> {
    // Return some(value) if found, none<Uint<64>>() if not
    if (id == 0) {
        return none<Uint<64>>();
    }
    return some(id as Uint<64> * 100);
}
```

## Default Values

The default value of `Maybe<T>` is equivalent to `none<T>()`:

- `isSome` = `false`
- `value` = default value of `T`

_Source: [Default values](https://docs.midnight.network/develop/reference/compact/lang-ref#default-values)_

## TypeScript Representation

In TypeScript, `Maybe<T>` is represented as:

```typescript
interface Maybe<T> {
  isSome: boolean;
  value: T; // T's TypeScript equivalent
}
```

Example:

```typescript
// Compact: Maybe<Uint<64>>
// TypeScript: { isSome: boolean; value: bigint }
```

_Source: [Representations in TypeScript](https://docs.midnight.network/develop/reference/compact/lang-ref#representations-in-typescript)_

## Exercises

Complete [`exercises/04_compound/02_maybe/`](https://github.com/Olanetsoft/learn-compact/tree/main/exercises/04_compound/02_maybe).
