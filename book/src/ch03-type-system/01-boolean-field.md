# Boolean and Field Types

## Boolean

The `Boolean` type represents true/false values.

```compact
const isActive: Boolean = true;
const isComplete: Boolean = false;
```

### Boolean Operations

```compact
// Logical AND
const both = a && b;

// Logical OR
const either = a || b;

// Logical NOT
const opposite = !a;
```

### Boolean in Conditionals

```compact
if (isActive) {
    // do something
}

const result = condition ? valueIfTrue : valueIfFalse;
```

## Field

The `Field` type represents scalar field elements - the native type for ZK operations.

```compact
const x: Field = 42;
```

### Why Field?

Zero-knowledge proofs operate on mathematical field elements. When you need maximum efficiency in ZK circuits, use `Field`.

### Converting to Field

Use `as Field` to convert other types:

```compact
const amount: Uint<64> = 100;
const amountAsField = amount as Field;
```

### When to Use Field vs Uint

| Use Case                 | Recommended Type         |
| ------------------------ | ------------------------ |
| Amounts, counts          | `Uint<64>`               |
| Cryptographic operations | `Field`                  |
| Hashing inputs           | Often `Field` or `Bytes` |
| General arithmetic       | `Uint<N>`                |

## Exercises

Complete the exercises in `exercises/02_types/01_boolean/` and `exercises/02_types/04_field/`.
