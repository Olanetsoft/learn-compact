# Type Casting

Type casting converts values from one type to another using the syntax `e as T`.

> **Note:** TypeScript-style casts of the form `<T>e` are **not supported** in Compact.

## Basic Casting Syntax

```text
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
| `Uint<0..m>` | static     | 3            | conversion | 7          |
| `enum type`  | conversion | conversion   | no         | no         |
| `Boolean`    | conversion | 4            | —          | no         |
| `Bytes<m>`   | 5          | 9            | no         | 6          |

> **Note:** Numbers in the table refer to the notes below. `no` means the cast is not allowed.

### Important Notes

1. **Field → Boolean:** Conversion. `0` converts to `false`, all other values to `true`.

2. **Field → Bytes\<n\>:** Conversion to little-endian bytes. **Runtime error if value doesn't fit in n bytes.**

3. **Uint\<0..m\> → Uint\<0..n\>:** Static if `m ≤ n`, otherwise checked (**fails at runtime if value > n**).

4. **Boolean → Uint\<0..n\>:** Conversion. `false` → 0, `true` → 1. If `n` is 0, checked (fails on `true`).

5. **Bytes\<m\> → Field:** Conversion from little-endian bytes. **Runtime error if result exceeds max Field value.**

6. **Bytes\<m\> → Bytes\<n\>:** Only allowed if `m == n` (static cast).

7. **Uint\<0..m\> → Bytes\<n\>:** Works as a direct conversion to little-endian bytes (verified with toolchain 0.31.1; older docs marked this as not allowed).

8. **Integer → enum:** A **checked** cast — compiles and runs, but fails at runtime if the value exceeds the last variant index (e.g., `5 is greater than maximum enum value 2`).

9. **Bytes\<m\> → Uint\<0..n\>:** Works as a little-endian conversion (verified with toolchain 0.31.1; older docs marked this as not allowed).

> ⚠️ **Important:** Casts marked with notes 2 and 5 can **fail at runtime** even though they're conversions.

## Common Conversions

### Integer Size Conversion

```compact
export pure circuit resize(): Uint<32> {
    const small: Uint<32> = 100;
    const big: Uint<64> = small as Uint<64>;  // ✅ Static cast (widening)

    const large: Uint<64> = 100;
    const smaller: Uint<32> = large as Uint<32>;  // ⚠️ Checked (may fail at runtime)
    return smaller;
}
```

### Integer to Field

```compact
export pure circuit intToField(): Field {
    const amount: Uint<64> = 1000;
    const amountField: Field = amount as Field;  // Static cast
    return amountField;
}
```

### Field to Bytes

```compact
export pure circuit fieldToBytes(): Bytes<32> {
    const fieldValue: Field = 42;
    const bytes: Bytes<32> = fieldValue as Bytes<32>;  // Conversion (little-endian)
    // ⚠️ Runtime error if fieldValue doesn't fit in 32 bytes!
    return bytes;
}
```

## Uint to Bytes

`Uint` casts directly to `Bytes<n>` as a little-endian conversion (verified with toolchain 0.31.1 — e.g., `42` becomes `0x2a00…00`). Going through `Field` first also works but is not required:

```compact
export pure circuit uintToBytes(): Bytes<32> {
    const amount: Uint<64> = 100;

    // ✅ Direct cast (little-endian)
    const bytes: Bytes<32> = amount as Bytes<32>;

    // ✅ Equivalent two-step cast through Field
    const bytes2: Bytes<32> = (amount as Field) as Bytes<32>;

    return bytes;
}
```

## Boolean Conversions

```compact
export pure circuit boolCasts(): Field {
    const flag: Boolean = true;

    // Boolean to Uint (conversion - note 4)
    const flagInt: Uint<8> = flag as Uint<8>;  // true → 1, false → 0

    // Or use conditional for clarity
    const value: Uint<8> = flag ? 1 : 0;

    // Boolean to Field (conversion): true → 1, false → 0
    const flagField: Field = flag as Field;

    return flagField;
}
```

> **Note:** `Boolean → Field` is a **conversion** cast per the official table (verified with toolchain 0.31.1): `false` → 0, `true` → 1. Going through `Uint` first also works, but is not required.

## Enum to Field

```compact
export enum Choice { a, b, c }

export pure circuit choiceIndex(): Field {
    const choice: Choice = Choice.b;
    const index: Field = choice as Field;  // 1 (conversion)
    return index;
}
```

## Best Practices

1. **Understand cast types** - Know whether a cast is static, conversion, or checked
2. **Check ranges** - Checked casts can fail at runtime
3. **Use Field as intermediate** - When direct cast isn't allowed
4. **Handle potential failures** - Checked casts may raise runtime exceptions

## Exercises

Practice type casting in the type exercises.
