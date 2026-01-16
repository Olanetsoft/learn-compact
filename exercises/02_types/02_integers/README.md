# Exercise: Unsigned Integers

## Goal

Work with Compact's unsigned integer types.

## Instructions

1. Open `exercise.compact`
2. Complete the circuits as described

## Uint Types

Compact has sized unsigned integers:

- `Uint<8>` - 0 to 255
- `Uint<16>` - 0 to 65,535
- `Uint<32>` - 0 to 4,294,967,295
- `Uint<64>` - 0 to 18,446,744,073,709,551,615
- `Uint<128>` and `Uint<256>` for larger values

## Verify

```bash
compact compile exercise.compact
```

## Hints

<details>
<summary>Hint 1</summary>
Arithmetic operators: +, -, * (no division in circuits)
</details>

<details>
<summary>Hint 2</summary>
Comparison operators: <, <=, >, >=, ==, !=
</details>
