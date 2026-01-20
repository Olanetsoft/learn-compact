# Arithmetic Operators

Compact provides three arithmetic operators: addition, subtraction, and multiplication. Division is **not** supported.

> **Note:** The official Midnight documentation uses bounded notation like `Uint<0..n>` to describe types. In code examples, we use the shorthand `Uint<64>`, which is equivalent to `Uint<0..2^64-1>`.

## Available Operators

| Operator | Name           | Result Type (for `Uint<0..m>` and `Uint<0..n>`) |
| -------- | -------------- | ----------------------------------------------- |
| `+`      | Addition       | `Uint<0..m+n>`                                  |
| `-`      | Subtraction    | `Uint<0..m>` (left operand's bound)             |
| `*`      | Multiplication | `Uint<0..m*n>`                                  |

## Basic Arithmetic

```compact,editable
pragma language_version >= 0.16 && <= 0.18;

export circuit add(a: Uint<64>, b: Uint<64>): Uint<64> {
  return (a + b) as Uint<64>;
}

export circuit subtract(a: Uint<64>, b: Uint<64>): Uint<64> {
  return (a - b) as Uint<64>;
}

export circuit multiply(a: Uint<64>, b: Uint<64>): Uint<64> {
  return (a * b) as Uint<64>;
}
```

## Type Widening

When you perform arithmetic on unsigned integers, Compact computes a result type based on the operand bounds:

- For `Uint<0..m> + Uint<0..n>`, the result type is `Uint<0..m+n>`
- For `Uint<0..m> * Uint<0..n>`, the result type is `Uint<0..m*n>`
- For `Uint<0..m> - Uint<0..n>`, the result type is `Uint<0..m>`

If the computed bound exceeds the implementation's maximum unsigned integer, it is a **static type error**.

When the result type doesn't match the expected type, you may need a cast:

```compact,editable
pragma language_version >= 0.16 && <= 0.18;

export circuit sumExample(): Uint<64> {
  const a: Uint<64> = 100;
  const b: Uint<64> = 200;

  // The result of a + b has a wider type than Uint<64>
  // Cast to fit the return type
  const result: Uint<64> = (a + b) as Uint<64>;
  return result;
}
```

## Field Arithmetic

If either operand has type `Field`, the result type is `Field`. Field arithmetic uses modular arithmetic - overflow and underflow wrap modulo the field modulus:

```compact,editable
pragma language_version >= 0.16 && <= 0.18;

export circuit fieldMath(): Field {
  const a: Field = 100;
  const b: Field = 200;

  // Result type is Field
  const sum: Field = a + b;
  const product: Field = a * b;

  return product;
}
```

## Practical Example: Counter

```compact,editable
pragma language_version >= 0.16 && <= 0.18;

export ledger count: Uint<64>;

export circuit increment(): [] {
  count = (count + 1) as Uint<64>;
}

export circuit addAmount(amount: Uint<64>): [] {
  // Disclose parameter before using in ledger operation
  const dAmount = disclose(amount);
  count = (count + dAmount) as Uint<64>;
}

export circuit getCount(): Uint<64> {
  return count;
}
```

## Key Points

1. **No division operator** - Compact doesn't support `/`
2. **Result types are computed from bounds** - `+` and `*` produce wider types; casts may be needed depending on usage
3. **Field arithmetic wraps** - Overflow/underflow wrap modulo the field modulus
4. **Subtraction can underflow** - If `b > a` at runtime, `a - b` raises a runtime error (no wraparound for `Uint`)
