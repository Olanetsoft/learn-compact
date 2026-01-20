# Conditionals

## If Statements

Two forms:

```text
if (condition)
  <statement>

if (condition)
  <statement>
else
  <statement>
```

The condition must be `Boolean`. Only the taken branch executes.

_Source: [Statements](https://docs.midnight.network/develop/reference/compact/lang-ref#statements)_

### Example

```compact
pragma language_version >= 0.16 && <= 0.18;

import CompactStandardLibrary;

export ledger status: Uint<8>;

export circuit updateStatus(value: Uint<8>): [] {
    if (disclose(value) > (10 as Uint<8>)) {
        status = 1 as Uint<8>;
    } else {
        status = 0 as Uint<8>;
    }
}
```

## Conditional Expressions

Compact has a ternary conditional expression:

```text
e0 ? e1 : e2
```

- `e0` must be `Boolean`
- `e1` and `e2` must have compatible types
- Only the selected branch is evaluated

_Source: [Conditional expressions](https://docs.midnight.network/develop/reference/compact/lang-ref#conditional-expressions)_

### Example

```compact
pragma language_version >= 0.16 && <= 0.18;

import CompactStandardLibrary;

export pure circuit max(a: Uint<64>, b: Uint<64>): Uint<64> {
    return a > b ? a : b;
}

export pure circuit clamp(value: Uint<64>, minVal: Uint<64>, maxVal: Uint<64>): Uint<64> {
    return value < minVal ? minVal : (value > maxVal ? maxVal : value);
}
```

## Return

Every control-flow path must end in a `return`, unless the return type is `[]`.

```text
// For [] return type
return;

// For other return types
return <expr>;
```

_Source: [Circuits](https://docs.midnight.network/develop/reference/compact/lang-ref#circuits)_

## Next Steps

- [Loops](02-loops.md) - bounded `for` loops
- [Assertions](03-assertions.md) - enforce conditions in circuits
