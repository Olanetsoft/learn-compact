# Parameters and Return Values

## Parameters

Circuits can take typed parameters:

```compact
export circuit transfer(to: Bytes<32>, amount: Uint<64>): [] {
    // use 'to' and 'amount'
}
```

### Multiple Parameters

```compact
export circuit multiParam(
    a: Uint<64>,
    b: Uint<64>,
    flag: Boolean
): [] {
    // ...
}
```

### Parameter Types

Parameters can be any Compact type:

- Primitives: `Boolean`, `Field`, `Uint<N>`, `Bytes<N>`
- Compounds: `[T, U]` (tuples), `Vector<N, T>`
- User-defined: structs, enums
- Optional: `Maybe<T>`

## Return Values

### Single Return

```compact
export circuit getBalance(): Uint<64> {
    return 100;  // Returns a Uint<64>
}
```

### No Return (Empty Tuple)

```compact
export circuit performAction(): [] {
    // Do something, return nothing
    counter.increment(1);
}
```

### Tuple Return

Return multiple values using tuples:

```compact
export circuit getStats(): [Uint<64>, Boolean] {
    return [100, true];
}
```

### Struct Return

```compact
export struct Result {
    value: Uint<64>,
    success: Boolean
}

export circuit compute(): Result {
    return Result {
        value: 42,
        success: true
    };
}
```

## Using Return Values

From other circuits:

```compact
circuit calculate(): Uint<64> {
    return 100;
}

export circuit useCalculation(): [] {
    const result = calculate();
    counter.increment(result);
}
```

From TypeScript (after deployment):

```typescript
const balance = await contract.getBalance();
console.log(`Balance: ${balance}`);
```

## Exercises

Complete `exercises/03_circuits/02_parameters/` and `exercises/03_circuits/03_return_values/`.
