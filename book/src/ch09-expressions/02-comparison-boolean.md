# Comparison and Boolean

Compact provides relational operators for comparing values and logical operators for combining Boolean expressions.

> **Note:** The official Midnight documentation uses bounded notation like `Uint<0..n>` to describe types. In code examples, we use the shorthand `Uint<64>`, which is equivalent to `Uint<0..2^64-1>`.

## Relational Operators

| Operator | Name                   | Returns   |
| -------- | ---------------------- | --------- |
| `==`     | Equals                 | `Boolean` |
| `!=`     | Not equals             | `Boolean` |
| `<`      | Less than              | `Boolean` |
| `>`      | Greater than           | `Boolean` |
| `<=`     | Less than or equals    | `Boolean` |
| `>=`     | Greater than or equals | `Boolean` |

## Equality Comparisons

`==` and `!=` work on any comparable types:

```compact,editable
pragma language_version >= 0.16 && <= 0.18;

export circuit equalityExamples(): Boolean {
  const a: Uint<64> = 42;
  const b: Uint<64> = 42;
  const c: Uint<64> = 100;

  const equal: Boolean = a == b;      // true
  const notEqual: Boolean = a != c;   // true

  return equal && notEqual;
}
```

## Ordering Comparisons

`<`, `>`, `<=`, `>=` require unsigned integer operands:

```compact,editable
pragma language_version >= 0.16 && <= 0.18;

export circuit orderingExamples(): Boolean {
  const x: Uint<64> = 10;
  const y: Uint<64> = 20;

  const less: Boolean = x < y;         // true
  const greater: Boolean = y > x;      // true
  const lessEq: Boolean = x <= 10;     // true
  const greaterEq: Boolean = y >= 20;  // true

  return less && greater;
}
```

## Logical Operators

| Operator | Name        | Behavior                              |
| -------- | ----------- | ------------------------------------- |
| `&&`     | Logical AND | Short-circuit: stops if left is false |
| `\|\|`   | Logical OR  | Short-circuit: stops if left is true  |

Both operators require `Boolean` operands and return `Boolean`.

## Short-Circuit Evaluation

Logical operators use **short-circuit evaluation**:

- `a && b` - If `a` is `false`, `b` is not evaluated
- `a || b` - If `a` is `true`, `b` is not evaluated

```compact,editable
pragma language_version >= 0.16 && <= 0.18;

export circuit shortCircuit(): Boolean {
  const x: Uint<64> = 0;

  // Safe: second condition not evaluated when x == 0
  const safe: Boolean = x != 0 && x > 5;

  // OR short-circuits on first true
  const quick: Boolean = true || false;

  return safe || quick;
}
```

## Conditional Expressions

Compact supports the ternary conditional operator `? :`:

```compact,editable
pragma language_version >= 0.16 && <= 0.18;

export circuit max(a: Uint<64>, b: Uint<64>): Uint<64> {
  return a > b ? a : b;
}

export circuit min(a: Uint<64>, b: Uint<64>): Uint<64> {
  return a < b ? a : b;
}

export circuit absDiff(a: Uint<64>, b: Uint<64>): Uint<64> {
  return a > b ? (a - b) as Uint<64> : (b - a) as Uint<64>;
}
```

## Combining Conditions

```compact,editable
pragma language_version >= 0.16 && <= 0.18;

export circuit inRange(value: Uint<64>, minVal: Uint<64>, maxVal: Uint<64>): Boolean {
  return value >= minVal && value <= maxVal;
}

export circuit isValid(amount: Uint<64>, limit: Uint<64>): Boolean {
  const nonZero: Boolean = amount > 0;
  const withinLimit: Boolean = amount <= limit;
  return nonZero && withinLimit;
}
```

## Key Points

1. **All comparisons return `Boolean`**
2. **Ordering operators (`<`, `>`, `<=`, `>=`) only work on unsigned integers**
3. **Logical operators short-circuit** - right side may not execute
4. **Conditional expression** `a ? b : c` - both branches must have compatible types
