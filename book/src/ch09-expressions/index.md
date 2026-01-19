# Expressions & Operators

Expressions in Compact produce values and have static types. Every expression either evaluates to a value or raises an exception.

## Expression Categories

Compact supports several categories of expressions:

| Category        | Examples                    |
| --------------- | --------------------------- |
| **Literals**    | `42`, `true`, `"hello"`     |
| **Arithmetic**  | `a + b`, `x - y`, `n * m`   |
| **Comparison**  | `a == b`, `x < y`, `n >= m` |
| **Logical**     | `a && b`, `x \|\| y`        |
| **Conditional** | `cond ? a : b`              |
| **Type Cast**   | `value as Uint<64>`         |

## Evaluation Rules

Expressions evaluate their subexpressions in order. If any subexpression raises an exception, the entire expression stops and raises that exception.

```text
// Type errors are caught at compile time
const x: Uint<0..255> = 300;  // Error: 300 exceeds range 0..255

// Runtime exceptions propagate up
const result = checked_operation();  // May fail at runtime
```

## In This Chapter

- [Arithmetic Operators](./01-arithmetic.md) - Addition, subtraction, multiplication and type widening
- [Comparison & Boolean](./02-comparison-boolean.md) - Relational operators and logical expressions
- [Type Conversions](./03-type-conversions.md) - The `as` cast operator and its rules
