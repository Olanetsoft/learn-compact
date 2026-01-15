# Pure Circuits

Pure circuits are helper functions that don't access or modify ledger state.

## Syntax

```compact
pure circuit name(params): ReturnType {
    // pure computation only
}
```

## ⚠️ Critical Syntax

Use `pure circuit`, **NOT** `pure function`:

```compact
// ✅ CORRECT
pure circuit add(a: Uint<64>, b: Uint<64>): Uint<64> {
    return a + b;
}

// ❌ WRONG - Will not compile
pure function add(a: Uint<64>, b: Uint<64>): Uint<64> {
    return a + b;
}
```

## What Makes a Circuit "Pure"?

Pure circuits:

- ✅ Can perform calculations
- ✅ Can call other pure circuits
- ✅ Can use parameters and local variables
- ❌ Cannot read ledger state
- ❌ Cannot modify ledger state
- ❌ Cannot call non-pure circuits

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

### Cryptographic Operations

```compact
pure circuit derivePublicKey(secretKey: Bytes<32>): Bytes<32> {
    return persistentHash<Bytes<32>>(secretKey);
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

## Benefits of Pure Circuits

1. **Reusability** - Share logic across multiple circuits
2. **Testability** - Easier to test isolated logic
3. **Clarity** - Clear separation of concerns
4. **Optimization** - Compiler can optimize better

## Exercises

Complete `exercises/03_circuits/04_pure_circuits/`.
