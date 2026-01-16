# Boolean and Field Types

## Boolean

The `Boolean` type is a primitive type with only two values: `true` and `false`.

```compact
const isActive: Boolean = true;
const isComplete: Boolean = false;
```

### Boolean Operations

Compact supports standard boolean operators:

```compact
// Logical AND
const both = a && b;

// Logical OR
const either = a || b;

// Logical NOT
const opposite = !a;
```

> **Note:** The boolean operators `&&`, `||`, `!` follow standard semantics. The `&&` and `||` operators use short-circuit evaluation.

### Boolean in Conditionals

Booleans are used in `if` statements and conditional expressions:

```compact
if (isActive) {
    // do something
}

// Conditional expression: e0 ? e1 : e2 where e0 is Boolean
const result = condition ? valueIfTrue : valueIfFalse;
```

## Field

The `Field` type is "the type of elements in the scalar prime field of the zero-knowledge proving system."

```compact
const x: Field = 42;
```

### Converting to Field

Casting from `Uint<0..m>` to `Field` is a **static** cast (allowed, no runtime cost):

```compact
const amount: Uint<64> = 100;
const amountAsField = amount as Field;
```

### When to Use Field vs Uint

> **Note:** The following is usage guidance for this tutorial, not official documentation.

| Use Case                 | Recommended Type         |
| ------------------------ | ------------------------ |
| Amounts, counts          | `Uint<64>`               |
| Cryptographic operations | `Field`                  |
| Hashing inputs           | Often `Field` or `Bytes` |
| General arithmetic       | `Uint<n>`                |

## Exercises

Complete the exercises in [`exercises/02_types/01_boolean/`](https://github.com/Olanetsoft/learn-compact/tree/main/exercises/02_types/01_boolean) and [`exercises/02_types/04_field/`](https://github.com/Olanetsoft/learn-compact/tree/main/exercises/02_types/04_field).
