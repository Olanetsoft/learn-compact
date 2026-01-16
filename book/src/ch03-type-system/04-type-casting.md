# Type Casting

Type casting converts values from one type to another using the syntax `e as T`.

> **Note:** TypeScript-style casts of the form `<T>e` are **not supported** in Compact.

## Basic Casting Syntax

```compact
const result = value as TargetType;
```

## Cast Types

The Compact docs define three kinds of casts:

- **static:** Only changes the static type, no runtime effect
- **conversion:** Always succeeds but converts between representations
- **checked:** Checked at runtime and can fail

## Official Casting Table

Based on the [Compact language reference](https://docs.midnight.network/develop/reference/compact/lang-ref#type-cast-expressions):

| FROM → TO    | `Field`    | `Uint<0..n>` | `Boolean`  | `Bytes<n>` |
| ------------ | ---------- | ------------ | ---------- | ---------- |
| `Field`      | static     | checked      | 1          | 2          |
| `Uint<0..m>` | static     | 3            | conversion | no         |
| `enum type`  | conversion | no           | no         | no         |
| `Boolean`    | conversion | 4            | —          | no         |
| `Bytes<m>`   | 5          | no           | no         | 6          |

> **Note:** Numbers in the table refer to the notes below. `no` means the cast is not allowed.

### Important Notes

1. **Field → Boolean:** Conversion. `0` converts to `false`, all other values to `true`.

2. **Field → Bytes\<n\>:** Conversion to little-endian bytes. **Runtime error if value doesn't fit in n bytes.**

3. **Uint\<0..m\> → Uint\<0..n\>:** Static if `m ≤ n`, otherwise checked (**fails at runtime if value > n**).

4. **Boolean → Uint\<0..n\>:** Conversion. `false` → 0, `true` → 1. If `n` is 0, checked (fails on `true`).

5. **Bytes\<m\> → Field:** Conversion from little-endian bytes. **Runtime error if result exceeds max Field value.**

6. **Bytes\<m\> → Bytes\<n\>:** Only allowed if `m == n` (static cast).

> ⚠️ **Important:** Casts marked with notes 2 and 5 can **fail at runtime** even though they're conversions.

## Common Conversions

### Integer Size Conversion

```compact
const small: Uint<32> = 100;
const big: Uint<64> = small as Uint<64>;  // ✅ Static cast (widening)

const large: Uint<64> = 100;
const smaller: Uint<32> = large as Uint<32>;  // ⚠️ Checked (may fail at runtime)
```

### Integer to Field

```compact
const amount: Uint<64> = 1000;
const amountField: Field = amount as Field;  // Static cast
```

### Field to Bytes

```compact
const fieldValue: Field = 42;
const bytes: Bytes<32> = fieldValue as Bytes<32>;  // Conversion (little-endian)
// ⚠️ Runtime error if fieldValue doesn't fit in 32 bytes!
```

## ⚠️ Two-Step Casting

Uint to Bytes requires going through Field first (Uint → Bytes is "no" in the table):

```compact
// ❌ Direct cast not allowed
const amount: Uint<64> = 100;
// const bytes: Bytes<32> = amount as Bytes<32>;  // Error!

// ✅ Two-step cast through Field
const amount: Uint<64> = 100;
const bytes: Bytes<32> = (amount as Field) as Bytes<32>;
```

## Boolean Conversions

```compact
const flag: Boolean = true;

// Boolean to Uint (conversion - note 4)
const flagInt: Uint<8> = flag as Uint<8>;  // true → 1, false → 0

// Or use conditional for clarity
const value: Uint<8> = flag ? 1 : 0;
```

> ⚠️ **Note:** `Boolean → Field` is **NOT** a valid cast in the official table. If you need a Field from a Boolean, go through Uint first:

```compact
const flag: Boolean = true;
const flagInt: Uint<0..1> = flag as Uint<0..1>;  // Boolean → Uint (note 4)
const flagField: Field = flagInt as Field;       // Uint → Field (static)
```

## Enum to Field

```compact
export enum Choice { A, B, C }

const choice: Choice = Choice.B;
const index: Field = choice as Field;  // 1 (conversion)
```

## Best Practices

1. **Understand cast types** - Know whether a cast is static, conversion, or checked
2. **Check ranges** - Checked casts can fail at runtime
3. **Use Field as intermediate** - When direct cast isn't allowed
4. **Handle potential failures** - Checked casts may raise runtime exceptions

## Exercises

Practice type casting in the type exercises.
