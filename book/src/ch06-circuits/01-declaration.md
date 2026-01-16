# Circuit Declaration

## Basic Syntax

```compact
export circuit name(): [] {
    // circuit body
}
```

Let's break this down:

| Part      | Meaning                               |
| --------- | ------------------------------------- |
| `export`  | Makes the circuit publicly callable   |
| `circuit` | Keyword declaring a circuit           |
| `name`    | The circuit's identifier              |
| `()`      | Parameter list (empty here)           |
| `[]`      | Return type (empty tuple = no return) |
| `{ }`     | Circuit body                          |

## ⚠️ Critical: Return Type Syntax

Circuits that don't return a value use `[]` (empty tuple), **NOT** `Void`:

```compact
// ✅ CORRECT
export circuit doSomething(): [] {
    counter.increment(1);
}

// ❌ WRONG - Will not compile
export circuit doSomething(): Void {
    counter.increment(1);
}
```

## Visibility

### Exported Circuits

Use `export` to make circuits callable from TypeScript:

```compact
// Can be called from TypeScript
export circuit publicAction(): [] {
    // ...
}
```

### Internal Circuits

Without `export`, circuits are internal (callable only within Compact):

```compact
// Only callable from other circuits
circuit internalHelper(): Field {
    return 42;
}
```

## Complete Example

```compact
pragma language_version >= 0.16 && <= 0.18;

import CompactStandardLibrary;

export ledger balance: Counter;

// Public circuit - callable from TypeScript
export circuit deposit(amount: Uint<64>): [] {
    balance.increment(amount);
}

// Internal circuit - helper for other circuits
circuit getMinimum(): Uint<64> {
    return 10;
}

// Public circuit using internal helper
export circuit depositMinimum(): [] {
    const min = getMinimum();
    balance.increment(min);
}
```

## Exercises

Complete [`exercises/03_circuits/01_basic_circuit/`](https://github.com/Olanetsoft/learn-compact/tree/main/exercises/03_circuits/01_basic_circuit).
