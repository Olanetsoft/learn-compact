# Unsigned Integers

Compact defines **one unsigned integer type constructor, `Uint`**, with two equivalent forms for expressing the same family of types.

## Two Forms, One Type Family

### 1. Sized Form: `Uint<n>`

The sized form specifies how many **bits** the integer can use:

```compact
ledger value: Uint<64>;  // 64-bit unsigned integer
```

| Type        | Bits | Range                | Use Case                         |
| ----------- | ---- | -------------------- | -------------------------------- |
| `Uint<8>`   | 8    | 0 to 255             | Small counters, enum-like values |
| `Uint<16>`  | 16   | 0 to 65,535          | Medium values                    |
| `Uint<32>`  | 32   | 0 to ~4 billion      | Timestamps, IDs                  |
| `Uint<64>`  | 64   | 0 to ~18 quintillion | Balances, amounts                |
| `Uint<128>` | 128  | Very large           | High-precision values            |
| `Uint<256>` | 256  | Extremely large      | Cryptographic values             |

### 2. Bounded Form: `Uint<0..n>`

The bounded form specifies the **upper bound** directly (inclusive):

```compact
circuit f(x: Uint<0..100>): [] {
    // x is guaranteed to be between 0 and 100 inclusive
}
```

> **Note:** The lower bound must currently be `0`.

### They're the Same Type!

`Uint<n>` is **exactly equivalent** to `Uint<0..(2^n - 1)>`:

```compact
// These two declarations are the SAME type:
let a: Uint<8>;       // Sized form: 8 bits
let b: Uint<0..255>;  // Bounded form: 0 to (2^8 - 1)
```

The sized form is just a convenience notation—any `Uint<n>` can be rewritten as `Uint<0..m>`.

## Declaration

```compact
const age: Uint<8> = 25;
const balance: Uint<64> = 1000000;
const percentage: Uint<0..100> = 75;  // Bounded: 0 to 100 inclusive
```

## Arithmetic Operations

```compact
const a: Uint<64> = 100;
const b: Uint<64> = 50;

// Addition
const sum = a + b;  // 150

// Subtraction
const diff = a - b;  // 50

// Multiplication
const product = a * b;  // 5000
```

> ⚠️ **Note:** Division is NOT available in circuits. If you need division, compute it off-chain and pass the result as a witness.

## Comparison Operations

```compact
const a: Uint<32> = 100;
const b: Uint<32> = 50;

a == b  // false (equal)
a != b  // true  (not equal)
a > b   // true  (greater than)
a >= b  // true  (greater or equal)
a < b   // false (less than)
a <= b  // false (less or equal)
```

## When to Use Which Form?

| Use Case                         | Recommended Form     | Example         |
| -------------------------------- | -------------------- | --------------- |
| Standard storage (balances, IDs) | Sized `Uint<n>`      | `Uint<64>`      |
| Percentage or constrained value  | Bounded `Uint<0..n>` | `Uint<0..100>`  |
| Matching specific bit-width      | Sized `Uint<n>`      | `Uint<256>`     |
| Domain-specific limits           | Bounded `Uint<0..n>` | `Uint<0..1000>` |

## Type Casting

Convert between integer sizes:

```compact
const small: Uint<32> = 100;
const big: Uint<64> = small as Uint<64>;
```

## Exercises

Complete `exercises/02_types/02_integers/`.
