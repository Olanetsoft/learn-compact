# Parameters and Return Values

## Parameters

Circuits can take typed parameters. The return type is written after `:`, and use `[]` for "no value".

_Source: [Circuits](https://docs.midnight.network/develop/reference/compact/lang-ref#circuits)_

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
- Standard library types: `Maybe<T>`, `Either<A, B>` (requires `import CompactStandardLibrary`)

_Source: [Primitive types](https://docs.midnight.network/develop/reference/compact/lang-ref#primitive-types), [User-defined types](https://docs.midnight.network/develop/reference/compact/lang-ref#user-defined-types)_

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

Example storing a message with no return value:

```compact
export circuit storeMessage(customMessage: Opaque<"string">): [] {
    message = disclose(customMessage);
}
```

_Source: [Hello world](https://docs.midnight.network/getting-started/create-mn-app#define-the-circuit)_

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
circuit calculate(): Uint<16> {
    return 100;
}

export circuit useCalculation(): [] {
    const result = calculate();
    counter.increment(result);  // Counter.increment expects Uint<16>
}
```

_Source: [Circuit and witness calls](https://docs.midnight.network/develop/reference/compact/lang-ref#circuit-and-witness-calls)_

From TypeScript (after deployment):

Exported circuits are accessible via the generated `Contract` class, which exposes `circuits` and `impureCircuits` properties. The exact call pattern depends on your SDK version, but return types map to their TypeScript equivalents.

_Source: [TypeScript target](https://docs.midnight.network/develop/reference/compact/lang-ref#typescript-target), [Representations in TypeScript](https://docs.midnight.network/develop/reference/compact/lang-ref#representations-in-typescript)_

## Exercises

Complete [`exercises/03_circuits/02_parameters/`](https://github.com/Olanetsoft/learn-compact/tree/main/exercises/03_circuits/02_parameters) and [`exercises/03_circuits/03_return_values/`](https://github.com/Olanetsoft/learn-compact/tree/main/exercises/03_circuits/03_return_values).
