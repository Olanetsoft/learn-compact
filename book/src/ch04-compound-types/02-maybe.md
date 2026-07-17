# Maybe Type

The `Maybe<T>` type represents an optional value—either a value of type `T` exists, or it doesn't.

## Structure Definition

The standard library defines `Maybe<T>` with these fields (note the snake_case `is_some`):

```text
struct Maybe<T> {
    is_some: Boolean;
    value: T;
}
```

_Source: [Standard library structs](https://docs.midnight.network/develop/reference/compact/compact-std-library/exports#structs). Field names verified against compiler 0.31.1 — `isSome` does not exist._

## Creating Maybe Values

Use the `some()` and `none()` constructor functions:

```compact
export pure circuit makeMaybes(): Maybe<Uint<64>> {
    // Create a Maybe with a value
    const hasValue: Maybe<Uint<64>> = some<Uint<64>>(42);

    // Create an empty Maybe (must specify type)
    const noValue: Maybe<Uint<64>> = none<Uint<64>>();

    return hasValue;
}
```

## Checking for Values

Always check `is_some` before accessing `value`:

```compact
export circuit processOptional(opt: Maybe<Uint<64>>): Uint<64> {
    if (opt.is_some) {
        return opt.value;
    }
    return 0;  // Default value
}
```

> ⚠️ **Important:** If `is_some` is `false`, the `value` field contains a default value (0 for numeric types). Accessing it without checking `is_some` won't cause an error but may lead to incorrect logic.

## Common Use Cases

### Optional Parameters

Use `Maybe` for optional circuit parameters:

```compact
export circuit transfer(
    sender: Bytes<32>,
    to: Bytes<32>,
    amount: Uint<64>,
    memo: Maybe<Bytes<64>>
): [] {
    // Transfer logic...
    if (memo.is_some) {
        // Process the memo
    }
}
```

> **Note:** `from` is a reserved keyword in Compact and cannot be used as a parameter name — hence `sender` above.

### Optional Return Values

Use `Maybe` when a circuit might not have a meaningful result:

```compact
export circuit findValue(id: Uint<32>): Maybe<Uint<64>> {
    // Return some(value) if found, none<Uint<64>>() if not
    if (id == 0) {
        return none<Uint<64>>();
    }
    return some<Uint<64>>(((id as Uint<64>) * 100) as Uint<64>);
}
```

> **Note:** Multiplication widens the result type, so the product must be cast back to `Uint<64>` before passing it to `some<Uint<64>>()`.

## Default Values

The default value of `Maybe<T>` is equivalent to `none<T>()`:

- `is_some` = `false`
- `value` = default value of `T`

_Source: [Default values](https://docs.midnight.network/develop/reference/compact/lang-ref#default-values)_

## TypeScript Representation

In TypeScript, `Maybe<T>` is represented as (verified against compiler 0.31.1 generated types):

```typescript
interface Maybe<T> {
  is_some: boolean;
  value: T; // T's TypeScript equivalent
}
```

Example:

```typescript
// Compact: Maybe<Uint<64>>
// TypeScript: { is_some: boolean; value: bigint }
```

_Source: [Representations in TypeScript](https://docs.midnight.network/develop/reference/compact/lang-ref#representations-in-typescript)_

## Exercises

Complete [`exercises/04_compound/02_maybe/`](https://github.com/Olanetsoft/learn-compact/tree/main/exercises/04_compound/02_maybe).
