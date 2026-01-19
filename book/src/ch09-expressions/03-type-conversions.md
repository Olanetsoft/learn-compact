# Type Conversions

Compact uses the `as` keyword for type casts. The cast rules determine when conversions are allowed and whether they may fail at runtime.

> **Note:** The official Midnight documentation uses bounded notation like `Uint<0..n>` to describe types. In code examples, we use the shorthand `Uint<64>`, which is equivalent to `Uint<0..2^64-1>`.

## Cast Syntax

```text
expression as Type
```

TypeScript-style casts like `<Type>expression` are **not** supported.

## Cast Categories

The documentation defines three behaviors for allowed casts:

| Category       | Description                      | Runtime Effect  |
| -------------- | -------------------------------- | --------------- |
| **Static**     | Changes only the static type     | None            |
| **Conversion** | Converts between representations | Always succeeds |
| **Checked**    | Validates at runtime             | May fail        |

## Allowed Casts Reference

The following table summarizes the allowed casts between types:

| From         | To                         | Behavior                                             |
| ------------ | -------------------------- | ---------------------------------------------------- |
| `Uint<0..m>` | `Uint<0..n>` where `m ≤ n` | Static                                               |
| `Uint<0..m>` | `Uint<0..n>` where `m > n` | Checked (fails if value > n)                         |
| `Uint<0..m>` | `Field`                    | Static                                               |
| `Field`      | `Uint<0..n>`               | Checked                                              |
| `Field`      | `Boolean`                  | Conversion (0→false, others→true)                    |
| `Field`      | `Bytes<n>`                 | Conversion (runtime error if doesn't fit)            |
| `Bytes<m>`   | `Field`                    | Conversion (LSB first, checked if exceeds max Field) |
| `Bytes<m>`   | `Bytes<n>` where `m == n`  | Static                                               |
| `enum type`  | `Field`                    | Conversion                                           |

**Not allowed:**

- `enum type` → `Uint<0..n>` (explicitly disallowed)
- `Bytes<m>` → `Bytes<n>` where `m ≠ n`

## Upcasts (Always Safe)

Upcasts—casts from a type to a supertype—are always allowed and never result in a static or runtime error.

For `Uint` types, casting from a smaller range to a larger range is a static cast:

```compact,editable
pragma language_version >= 0.16 && <= 0.18;

export circuit upcast_example(): Field {
  const small: Uint<32> = 100;

  // Uint<32> to Uint<64>: static cast (range fits)
  const bigger: Uint<64> = small as Uint<64>;

  // Uint to Field: static cast
  const f: Field = bigger as Field;

  return f;
}
```

## Checked Casts (May Fail)

When casting from a larger range to a smaller range, the cast is checked at runtime:

```compact,editable
pragma language_version >= 0.16 && <= 0.18;

export circuit checked_cast_example(): Uint<32> {
  const big: Uint<64> = 50;

  // Uint<64> to Uint<32>: checked cast
  // Fails at runtime if value exceeds Uint<32> range
  const smaller: Uint<32> = big as Uint<32>;

  return smaller;
}
```

## Field Conversions

The cast rules for `Field`:

- `Uint<0..m>` → `Field`: **static** cast
- `Field` → `Uint<0..n>`: **checked** cast (may fail if value too large)
- `Field` → `Boolean`: **conversion** (0 becomes false, non-zero becomes true)

```compact,editable
pragma language_version >= 0.16 && <= 0.18;

export circuit field_to_uint(): Uint<64> {
  const f: Field = 42;

  // Field to Uint: checked cast
  const num: Uint<64> = f as Uint<64>;

  return num;
}
```

## Bytes and Field

The cast rules for `Bytes`:

- `Bytes<m>` → `Field`: **conversion** (LSB first, checked if exceeds max Field)
- `Field` → `Bytes<n>`: **conversion** (runtime error if doesn't fit)
- `Bytes<m>` → `Bytes<n>`: **static** only if `m == n`

```compact,editable
pragma language_version >= 0.16 && <= 0.18;

export circuit bytes_field(): Field {
  // Create Bytes using Bytes[...] syntax
  const b: Bytes<4> = Bytes[1, 2, 3, 4];

  // Bytes to Field: conversion (LSB first)
  const f: Field = b as Field;

  return f;
}
```

## Enum to Field

Enums can be cast to `Field`, but **not** directly to `Uint`:

```compact,editable
pragma language_version >= 0.16 && <= 0.18;

export enum Status { Pending, Active, Completed }

export circuit enum_to_field(): Field {
  const s: Status = Status.Active;

  // Enum to Field: conversion
  const f: Field = s as Field;

  return f;
}
```

> **Important:** The cast `enum` → `Uint<0..n>` is explicitly **not allowed** in Compact.

## Key Points

1. **Use `as` for all casts** — TypeScript-style `<T>` is not supported
2. **Upcasts are always safe** — Casting to a supertype never fails
3. **`Uint<0..m>` → `Uint<0..n>`** — Static if `m ≤ n`, checked otherwise
4. **`Uint` → `Field`** — Static cast
5. **`Field` → `Uint`** — Checked cast (may fail)
6. **`enum` → `Uint`** — Not allowed; use `enum` → `Field` instead
7. **Field conversions** - Uint to Field is safe; Field to Uint is checked
