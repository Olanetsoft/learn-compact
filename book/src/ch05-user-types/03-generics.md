# Generic Types

Generic types let you write reusable type definitions that work with multiple concrete types. Compact supports generics for structs and circuits.

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

_Source: [User-defined types](https://docs.midnight.network/develop/reference/compact/lang-ref#user-defined-types)_

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

_Source: [Primitive types](https://docs.midnight.network/develop/reference/compact/lang-ref#primitive-types)_

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

_Source: [Structure creation](https://docs.midnight.network/develop/reference/compact/lang-ref#structure-creation)_

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

_Source: [Standard library structs](https://docs.midnight.network/develop/reference/compact/compact-std-library/exports#structs), [Standard library circuits](https://docs.midnight.network/develop/reference/compact/compact-std-library/exports#circuits)_

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

_Source: [Generic parameter references](https://docs.midnight.network/develop/reference/compact/lang-ref#generic-parameter-references), [Circuit and witness calls](https://docs.midnight.network/develop/reference/compact/lang-ref#circuit-and-witness-calls)_

## Constraints and Limitations

### Type Parameter Bounds

Compact doesn't support trait bounds or type constraints like some languages. Any type can be used as a type argument.

### Generic Structs Must Be Fully Specialized

When using a generic struct as a type or in structure creation, all type and size parameters must be provided:

```compact
struct Box<T> {
    value: T
}

// All type arguments must be specified
const b: Box<Field> = Box<Field> { value: 42 };
```

_Source: [User-defined types](https://docs.midnight.network/develop/reference/compact/lang-ref#user-defined-types), [Structure creation](https://docs.midnight.network/develop/reference/compact/lang-ref#structure-creation)_

## Nested Generics

Generics can be nested:

```compact
struct Node<T> {
    value: T,
    children: Vector<2, Maybe<T>>
}

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
```

_Source: [Declaring public state](https://docs.midnight.network/develop/reference/compact/lang-ref#declaring-and-maintaining-public-state)_

## TypeScript Representation

Generic structs map to TypeScript generics:

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
```

_Source: [Representations in TypeScript](https://docs.midnight.network/develop/reference/compact/lang-ref#representations-in-typescript)_

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

Complete [`exercises/05_user_types/03_generics/`](https://github.com/Olanetsoft/learn-compact/tree/main/exercises/05_user_types/03_generics).
