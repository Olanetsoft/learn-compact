# Unsigned Integers

Compact defines **one unsigned integer type constructor, `Uint`**, with two equivalent forms for expressing the same family of types.

## Two Forms, One Type Family

### 1. Sized Form: `Uint<n>`

The sized form specifies how many **bits** the integer can use:

```compact
export ledger value: Uint<64>;  // 64-bit unsigned integer
```

| Type        | Bits | Range                | Use Case _(guidance)_            |
| ----------- | ---- | -------------------- | -------------------------------- |
| `Uint<8>`   | 8    | 0 to 255             | Small counters, enum-like values |
| `Uint<16>`  | 16   | 0 to 65,535          | Medium values                    |
| `Uint<32>`  | 32   | 0 to ~4 billion      | Timestamps, IDs                  |
| `Uint<64>`  | 64   | 0 to ~18 quintillion | Balances, amounts                |
| `Uint<128>` | 128  | Very large           | High-precision values            |
| `Uint<248>` | 248  | Maximum width        | Largest supported sized integer  |

> **Note:** The "Use Case" column is guidance—the docs define the types and semantics, but don't prescribe these specific patterns.
>
> ⚠️ **Maximum width:** `Uint<248>` is the largest valid sized integer — `Uint<249>` and above (including `Uint<256>`) fail to compile (verified with toolchain 0.31.1).

### 2. Bounded Form: `Uint<0..n>`

The bounded form specifies the **upper bound** directly. ⚠️ The upper bound is **exclusive** — `Uint<0..n>` holds values `0` to `n-1` (verified with toolchain 0.31.1: a literal `100` does not fit `Uint<0..100>`, whose largest value is `99`):

```compact
circuit f(x: Uint<0..100>): [] {
    // x is guaranteed to be between 0 and 99 (upper bound exclusive)
}
```

> **Note:** The lower bound must currently be `0`.

### They're the Same Type!

`Uint<n>` is **exactly equivalent** to `Uint<0..2^n>` (exclusive upper bound). For example, `Uint<8>` is the same type as `Uint<0..256>`, **not** `Uint<0..255>` — verified with toolchain 0.31.1, where a `Uint<8>` value assigns to `Uint<0..256>` but is a type mismatch against `Uint<0..255>`:

```compact
export pure circuit sameType(x: Uint<8>): Uint<0..256> {
    // Uint<8> and Uint<0..256> are the SAME type (upper bound exclusive)
    return x;
}
```

The sized form is just a convenience notation—any `Uint<n>` can be rewritten as `Uint<0..2^n>`.

## Declaration

```compact
export pure circuit declarations(): Uint<64> {
    const age: Uint<8> = 25;
    const balance: Uint<64> = 1000000;
    const percentage: Uint<0..101> = 75;  // Bounded: holds 0-100 (upper bound exclusive)
    return balance;
}
```

## Arithmetic Operations

Compact supports three arithmetic operators for unsigned integers: `+`, `-`, `*`.

```compact
export pure circuit arithmetic(): Field {
    const a: Uint<64> = 100;
    const b: Uint<64> = 50;

    // Addition
    const sum = a + b;  // 150

    // Subtraction
    const diff = a - b;  // 50

    // Multiplication
    const product = a * b;  // 5000

    return product as Field;
}
```

### Important Behavior

According to the official docs:

- **Addition/Multiplication:** Cannot overflow—the result type automatically widens to accommodate the result
- **Subtraction:** Causes a **runtime error** if the result would be negative (right operand > left operand)

```compact
export pure circuit subtract(a: Uint<64>, b: Uint<64>): Uint<64> {
    // ⚠️ Runtime error if b > a!
    const diff = (a - b) as Uint<64>;  // Fails if b is greater than a
    return diff;
}
```

> ⚠️ **Note:** Compact has no division operator — `/` is a parse error (verified with toolchain 0.31.1; the docs list only `+`, `-`, `*` as binary arithmetic operators). If you need division, compute it off-chain and pass the result in as a witness, then constrain it in the circuit.

## Comparison Operations

Compact provides six relational operators:

| Operator | Name                   |
| -------- | ---------------------- |
| `==`     | equals                 |
| `!=`     | not equals             |
| `<`      | less than              |
| `>`      | greater than           |
| `<=`     | less than or equals    |
| `>=`     | greater than or equals |

_Source: [Relational expressions](https://docs.midnight.network/develop/reference/compact/lang-ref#relational-expressions)_

```compact
export pure circuit comparisons(): Boolean {
    const a: Uint<32> = 100;
    const b: Uint<32> = 50;

    const eq = a == b;   // false (equal)
    const ne = a != b;   // true  (not equal)
    const gt = a > b;    // true  (greater than)
    const ge = a >= b;   // true  (greater or equal)
    const lt = a < b;    // false (less than)
    const le = a <= b;   // false (less or equal)

    return ne && gt && ge;
}
```

> **Note:** The `<`, `>`, `<=`, `>=` operators require both operands to have unsigned integer types.

## When to Use Which Form? _(guidance)_

This table is **usage advice**, not from the docs. The docs only define the types and their semantics.

| Use Case                         | Recommended Form     | Example         |
| -------------------------------- | -------------------- | --------------- |
| Standard storage (balances, IDs) | Sized `Uint<n>`      | `Uint<64>`      |
| Percentage or constrained value  | Bounded `Uint<0..n>` | `Uint<0..101>`  |
| Matching specific bit-width      | Sized `Uint<n>`      | `Uint<128>`     |
| Domain-specific limits           | Bounded `Uint<0..n>` | `Uint<0..1000>` |

## Type Casting

Convert between integer sizes:

```compact
export pure circuit widen(): Uint<64> {
    const small: Uint<32> = 100;
    const big: Uint<64> = small as Uint<64>;
    return big;
}
```

## Exercises

Complete [`exercises/02_types/02_integers/`](https://github.com/Olanetsoft/learn-compact/tree/main/exercises/02_types/02_integers).
