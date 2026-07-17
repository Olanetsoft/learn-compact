# Boolean and Field Types

## Boolean

The `Boolean` type is a primitive type with only two values: `true` and `false`. Value bindings like these live inside circuits:

```compact
export pure circuit flags(): Boolean {
    const isActive: Boolean = true;
    const isComplete: Boolean = false;
    return isActive && !isComplete;
}
```

### Boolean Operations

Compact supports standard boolean operators:

```compact
export pure circuit logic(a: Boolean, b: Boolean): Boolean {
    // Logical AND
    const both = a && b;

    // Logical OR
    const either = a || b;

    // Logical NOT
    const opposite = !a;

    return both || either || opposite;
}
```

> **Note:** The boolean operators `&&`, `||`, `!` follow standard semantics. The `&&` and `||` operators use short-circuit evaluation.

### Boolean in Conditionals

Booleans are used in `if` statements and conditional expressions:

```compact
export pure circuit choose(
    condition: Boolean,
    valueIfTrue: Field,
    valueIfFalse: Field
): Field {
    if (condition) {
        // do something
    }

    // Conditional expression: e0 ? e1 : e2 where e0 is Boolean
    const result = condition ? valueIfTrue : valueIfFalse;
    return result;
}
```

## Field

The `Field` type is "the type of elements in the scalar prime field of the zero-knowledge proving system."

```compact
export pure circuit fieldExample(): Field {
    const x: Field = 42;
    return x;
}
```

### Converting to Field

Casting from `Uint<0..m>` to `Field` is a **static** cast (allowed, no runtime cost):

```compact
export pure circuit toField(): Field {
    const amount: Uint<64> = 100;
    const amountAsField = amount as Field;
    return amountAsField;
}
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
