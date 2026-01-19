# Circuit Declaration

## Basic Syntax

```compact
circuit c(a: A, b: B): R {
    // circuit body
}

export circuit name(): [] {
    // exported circuit body
}
```

Each path through the body must end with a `return` unless the return type is `[]`.

_Source: [Circuits](https://docs.midnight.network/develop/reference/compact/lang-ref#circuits)_

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

_Source: [Exported circuits](https://docs.midnight.network/academy/module-5#exported-circuits)_

## Generic Circuits

Circuits can have type parameters, making them reusable with different types:

```compact
circuit id<T>(value: T): T {
    return value;
}

circuit first<A, B>(pair: [A, B]): A {
    return pair[0];
}
```

_Source: [Generic parameter references](https://docs.midnight.network/develop/reference/compact/lang-ref#generic-parameter-references)_

## Complete Example

```compact
pragma language_version >= 0.16 && <= 0.18;

import CompactStandardLibrary;

export ledger balance: Counter;

// Public circuit - callable from TypeScript
export circuit deposit(amount: Uint<16>): [] {
    balance.increment(disclose(amount));
}

// Internal circuit - helper for other circuits
circuit getMinimum(): Uint<16> {
    return 10;
}

// Public circuit using internal helper
export circuit depositMinimum(): [] {
    const min = getMinimum();
    balance.increment(min);
}
```

_Source: [Writing a contract](https://docs.midnight.network/develop/reference/compact/writing#the-circuit-definitions)_

## Exercises

Complete [`exercises/03_circuits/01_basic_circuit/`](https://github.com/Olanetsoft/learn-compact/tree/main/exercises/03_circuits/01_basic_circuit).
