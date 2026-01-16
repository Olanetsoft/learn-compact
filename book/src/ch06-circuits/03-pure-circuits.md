# Pure Circuits

A circuit is considered **pure** if it computes its outputs from its inputs without reference to or modification of public state (via the ledger) or private state (via witnesses).

## Syntax

The `pure` modifier must follow `export` (if present):

```compact
pure circuit helper(x: Field): Field {
    return x * 2;
}

export pure circuit publicHelper(x: Field): Field {
    return x * 2;
}
```

> **Note:** The `pure` modifier causes the compiler to verify that the circuit is actually pure. If the circuit contains impure operations, compilation will fail.

## What Makes a Circuit Impure?

According to the docs, the compiler considers a circuit to be **impure** if:

1. The body contains a **ledger operation**
2. The body calls any **impure circuit**
3. The body calls a **witness**

> **Note:** Some standard library functions are witnesses and make the caller impure.

## What Pure Circuits Can Do

- ✅ Perform calculations
- ✅ Call other pure circuits
- ✅ Call pure standard library functions
- ✅ Use parameters and local variables
- ❌ Read ledger state
- ❌ Modify ledger state
- ❌ Call witnesses
- ❌ Call impure circuits

## Use Cases

### Mathematical Operations

```compact
pure circuit calculateFee(amount: Uint<64>): Uint<64> {
    return amount * 3 / 100;  // 3% fee
}
```

### Validation Logic

```compact
pure circuit isValidAge(age: Uint<8>): Boolean {
    return age >= 18 && age <= 120;
}
```

### Type Conversions

```compact
pure circuit toBytes(value: Uint<64>): Bytes<32> {
    return (value as Field) as Bytes<32>;
}
```

## Using Pure Circuits

Call pure circuits from any circuit:

```compact
pure circuit validate(x: Uint<64>): Boolean {
    return x > 0 && x < 1000;
}

export circuit process(amount: Uint<64>): [] {
    assert(validate(amount), "Invalid amount");
    counter.increment(amount);
}
```

## TypeScript Integration

The Compact compiler exports pure circuits via `pureCircuits` in the TypeScript module, allowing them to be used directly without blockchain interaction.

## Benefits of Pure Circuits

1. **Verification** - Compiler enforces purity constraints
2. **Reusability** - Share logic across circuits
3. **Off-chain use** - Available via `pureCircuits` in TypeScript
4. **Clarity** - Clear separation of stateful vs stateless logic

## Exercises

Complete [`exercises/03_circuits/04_pure_circuits/`](https://github.com/Olanetsoft/learn-compact/tree/main/exercises/03_circuits/04_pure_circuits).
