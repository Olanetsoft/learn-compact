# Unsigned Integers

Compact provides sized unsigned integer types for representing non-negative whole numbers.

## Uint<N> Types

The `N` specifies the bit width:

| Type        | Range                | Use Case                         |
| ----------- | -------------------- | -------------------------------- |
| `Uint<8>`   | 0 to 255             | Small counters, enum-like values |
| `Uint<16>`  | 0 to 65,535          | Medium values                    |
| `Uint<32>`  | 0 to ~4 billion      | Timestamps, IDs                  |
| `Uint<64>`  | 0 to ~18 quintillion | Balances, amounts                |
| `Uint<128>` | Very large           | High-precision values            |
| `Uint<256>` | Extremely large      | Cryptographic values             |

## Declaration

```compact
const age: Uint<8> = 25;
const balance: Uint<64> = 1000000;
const bigNumber: Uint<256> = 0;
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

## Bounded Integers

Compact also supports bounded integers with `Uint<0..N>`:

```compact
const percentage: Uint<0..100> = 75;  // Value must be 0-100
```

## Type Casting

Convert between integer sizes:

```compact
const small: Uint<32> = 100;
const big: Uint<64> = small as Uint<64>;
```

## Exercises

Complete `exercises/02_types/02_integers/`.
