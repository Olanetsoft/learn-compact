# Generic Types

Generic types let you write reusable type definitions that work with multiple concrete types. Compact supports generics for structs and type aliases.

_Source: [User-defined types](https://docs.midnight.network/develop/reference/compact/lang-ref#user-defined-types)_

## Generic Structs

A generic struct has one or more type parameters in angle brackets:

```compact
struct Pair<A, B> {
    first: A,
    second: B
}

struct Container<T> {
    value: T,
    isSet: Boolean
}
```

### Using Generic Structs

When using a generic struct, provide concrete type arguments:

```compact
struct Pair<A, B> {
    first: A,
    second: B
}

export pure circuit example(): Pair<Uint<64>, Boolean> {
    const p: Pair<Uint<64>, Boolean> = Pair<Uint<64>, Boolean> {
        first: 42,
        second: true
    };
    return p;
}
```

### Multiple Type Parameters

Structs can have multiple type parameters:

```compact
struct Triple<A, B, C> {
    first: A,
    second: B,
    third: C
}

struct KeyValue<K, V> {
    key: K,
    value: V
}
```

## Size Parameters

In addition to type parameters, generics can have **size parameters** for specifying numeric values like array lengths. Size parameters are prefixed with `#`:

```compact
// T is a type parameter, N is a size parameter
struct FixedArray<#N, T> {
    data: Vector<N, T>,
    length: Uint<32>
}

struct Matrix<#Rows, #Cols, T> {
    data: Vector<Rows, Vector<Cols, T>>
}
```

### Using Size Parameters

```compact
struct Buffer<#N> {
    data: Bytes<N>,
    used: Uint<32>
}

export pure circuit createBuffer(): Buffer<64> {
    return Buffer<64> {
        data: default<Bytes<64>>,
        used: 0
    };
}
```

## Generic Type Aliases

Both `type` and `new type` aliases can be generic:

```compact
// Generic structural alias
type Pair<T> = [T, T];
type VecOf<#N, T> = Vector<N, T>;

// Generic nominal alias
new type Id<T> = Bytes<32>;
new type FixedVec<#N, T> = Vector<N, T>;
```

### Using Generic Aliases

```compact
type Pair<T> = [T, T];

export pure circuit swapPair(p: Pair<Field>): Pair<Field> {
    return [p[1], p[0]];
}
```

## Standard Library Generics

The standard library uses generics extensively:

```compact
// From CompactStandardLibrary:
// struct Maybe<T> { isSome: Boolean; value: T; }
// struct Either<A, B> { isLeft: Boolean; left: A; right: B; }

import CompactStandardLibrary;

export pure circuit wrapValue(x: Uint<64>): Maybe<Uint<64>> {
    return some<Uint<64>>(x);
}

export pure circuit makeEither(flag: Boolean, val: Field): Either<Field, Uint<64>> {
    if (flag) {
        return left<Field, Uint<64>>(val);
    }
    return right<Field, Uint<64>>(100);
}
```

## Generic Circuits

Circuits can also be generic:

```compact
// Generic pure circuit
export pure circuit first<A, B>(pair: [A, B]): A {
    return pair[0];
}

export pure circuit second<A, B>(pair: [A, B]): B {
    return pair[1];
}

// Using generic circuits
export pure circuit example(): Field {
    const p: [Field, Boolean] = [42, true];
    return first<Field, Boolean>(p);
}
```

## Constraints and Limitations

### Type Parameter Bounds

Compact doesn't support trait bounds or type constraints like some languages. Any type can be used as a type argument.

### No Inference for Struct Creation

When creating generic struct instances, you often need to specify types explicitly:

```compact
struct Box<T> {
    value: T
}

// May need explicit type
const b: Box<Field> = Box<Field> { value: 42 };
```

### Size Parameters Must Be Literals

Size parameters must be compile-time constants:

```compact
struct Buffer<#N> {
    data: Bytes<N>
}

// ✅ OK - literal size
const b1: Buffer<32> = ...;

// ❌ ERROR - runtime value not allowed
// const size = 32;
// const b2: Buffer<size> = ...;
```

## Nested Generics

Generics can be nested:

```compact
struct Node<T> {
    value: T,
    children: Vector<2, Maybe<T>>
}

type NestedPair<T> = [Pair<T>, Pair<T>];

struct MapEntry<K, V> {
    key: K,
    value: Maybe<V>
}
```

## Generic Types in Ledger

Generic types work in ledger declarations:

```compact
struct Entry<V> {
    value: V,
    timestamp: Uint<64>
}

export ledger entries: Map<Bytes<32>, Entry<Uint<64>>>;

export circuit addEntry(key: Bytes<32>, value: Uint<64>, time: Uint<64>): [] {
    entries.insert(disclose(key), Entry<Uint<64>> {
        value: disclose(value),
        timestamp: disclose(time)
    });
}
```

## TypeScript Representation

Generic types map to TypeScript generics:

```typescript
// Compact
struct Pair<A, B> {
    first: A,
    second: B
}

// TypeScript (generated)
interface Pair<A, B> {
    first: A;
    second: B;
}

// Compact with size parameter
struct Buffer<#N> {
    data: Bytes<N>
}

// TypeScript - size becomes a type parameter
interface Buffer<N extends number> {
    data: Uint8Array;
}
```

## Best Practices

### Use Meaningful Parameter Names

```compact
// ✅ Good - descriptive names
struct KeyValue<Key, Value> { ... }
struct Result<Success, Error> { ... }

// ❌ Avoid - single letters are less clear
struct KV<K, V> { ... }
```

### Document Generic Constraints

```compact
// Document expected usage in comments
// T should be a numeric type (Uint or Field)
struct NumericPair<T> {
    a: T,
    b: T
}
```

### Prefer Simpler Types When Possible

```compact
// If you always use the same type, don't make it generic
// ❌ Over-engineered
struct UserBalance<T> { balance: T }

// ✅ Simple and clear
struct UserBalance { balance: Uint<64> }
```

## Complete Example

```compact
pragma language_version >= 0.18.0;

import CompactStandardLibrary;

// Generic result type
struct Result<T, E> {
    success: Boolean,
    value: T,
    error: E
}

// Helper to create success result
pure circuit ok<T, E>(value: T): Result<T, E> {
    return Result<T, E> {
        success: true,
        value: value,
        error: default<E>
    };
}

// Helper to create error result
pure circuit err<T, E>(error: E): Result<T, E> {
    return Result<T, E> {
        success: false,
        value: default<T>,
        error: error
    };
}

// Generic pair operations
struct Pair<T> {
    first: T,
    second: T
}

pure circuit makePair<T>(a: T, b: T): Pair<T> {
    return Pair<T> { first: a, second: b };
}

pure circuit swap<T>(p: Pair<T>): Pair<T> {
    return Pair<T> { first: p.second, second: p.first };
}

// Size-parameterized buffer
struct FixedBuffer<#N> {
    data: Bytes<N>,
    length: Uint<32>
}

// Use the generic types
export pure circuit example(): Result<Uint<64>, Uint<8>> {
    const pair = makePair<Field>(10, 20);
    const swapped = swap<Field>(pair);

    if (swapped.first == 20) {
        return ok<Uint<64>, Uint<8>>(100);
    }
    return err<Uint<64>, Uint<8>>(1);
}
```

## Exercises

Complete [`exercises/05_user_types/04_generics/`](https://github.com/Olanetsoft/learn-compact/tree/main/exercises/05_user_types/04_generics).
