# Loops

Compact supports bounded `for` loops. Loops must have statically known bounds.

_Source: [Statements](https://docs.midnight.network/develop/reference/compact/lang-ref#statements)_

## Two Forms

```text
for (const i of <lower>..<upper>) <statement>

for (const item of <vector>) <statement>
```

## Iterating Over a Range

```compact
pragma language_version >= 0.16 && <= 0.18;

import CompactStandardLibrary;

export ledger results: Map<Field, Field>;

export circuit storeRange(): [] {
    for (const i of 0..5) {
        results.insert(disclose(i), disclose(i) * (2 as Field));
    }
}
```

## Iterating Over a Vector

```compact
pragma language_version >= 0.16 && <= 0.18;

import CompactStandardLibrary;

export ledger total: Counter;

export circuit processVector(values: Vector<5, Uint<16>>): [] {
    for (const v of values) {
        total.increment(disclose(v));
    }
}
```

## Accumulation with Fold

Since Compact only has `const` bindings (no mutable variables), use `fold` for accumulation:

```compact
pragma language_version >= 0.16 && <= 0.18;

import CompactStandardLibrary;

export pure circuit sumVector(values: Vector<4, Uint<64>>): Uint<64> {
    const result = fold(
        (acc: Uint<64>, val: Uint<64>): Uint<64> => {
            return (acc + val) as Uint<64>;
        },
        0 as Uint<64>,
        values
    );
    return result;
}
```

## Const Bindings and Blocks

Within loops, you can use `const` bindings:

```text
const x = <expr>;
const x: T = <expr>, y = <expr>;
```

Rules:

- Bindings are evaluated left-to-right
- No use-before-definition
- No rebinding in the same block
- Shadowing allowed in nested blocks

_Source: [Statements](https://docs.midnight.network/develop/reference/compact/lang-ref#statements)_

## Next Steps

Learn about [Functions](../ch09-functions/index.md) in Compact.
