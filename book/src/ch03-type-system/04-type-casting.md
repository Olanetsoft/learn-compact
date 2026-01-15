# Type Casting

Type casting converts values from one type to another.

## Basic Casting Syntax

```compact
const result = value as TargetType;
```

## Common Conversions

### Integer Size Conversion

```compact
const small: Uint<32> = 100;
const big: Uint<64> = small as Uint<64>;  // ✅ Works

const large: Uint<64> = 100;
const smaller: Uint<32> = large as Uint<32>;  // ⚠️ May truncate
```

### Integer to Field

```compact
const amount: Uint<64> = 1000;
const amountField: Field = amount as Field;
```

### Field to Bytes

```compact
const fieldValue: Field = 42;
const bytes: Bytes<32> = fieldValue as Bytes<32>;
```

## ⚠️ Two-Step Casting

Some conversions require going through `Field` first:

```compact
// ❌ Direct cast may not work
const amount: Uint<64> = 100;
// const bytes: Bytes<32> = amount as Bytes<32>;  // Error!

// ✅ Two-step cast through Field
const amount: Uint<64> = 100;
const bytes: Bytes<32> = (amount as Field) as Bytes<32>;
```

## Casting Table

| From      | To         | Direct?            |
| --------- | ---------- | ------------------ |
| `Uint<N>` | `Uint<M>`  | ✅ Yes             |
| `Uint<N>` | `Field`    | ✅ Yes             |
| `Field`   | `Bytes<N>` | ✅ Yes             |
| `Uint<N>` | `Bytes<M>` | ❌ Use Field first |
| `Boolean` | `Uint<N>`  | ❌ Use conditional |

## Boolean to Integer

Booleans can't be directly cast. Use a conditional:

```compact
const flag: Boolean = true;

// Convert to integer
const value: Uint<8> = flag ? 1 : 0;
```

## Enum to Integer

```compact
export enum Choice { A, B, C }

const choice: Choice = Choice.B;
const index: Field = choice as Field;  // 1
```

## Best Practices

1. **Be explicit** - Cast intentionally, not accidentally
2. **Check ranges** - Casting to smaller types may truncate
3. **Use Field as intermediate** - When direct cast fails
4. **Document unusual casts** - Help future readers understand why

## Exercises

Practice type casting in the type exercises.
