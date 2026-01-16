# Composite Types

While Compact doesn't use the term "compound types" explicitly, it provides several **composite** (non-primitive) types built from other types. This chapter covers the built-in composite types:

- **Tuples** - Fixed-length, heterogeneous collections
- **Vectors** - Shorthand for homogeneous tuples (`Vector<n, T>` = `[T, T, ..., T]`)
- **Bytes** - Fixed-length byte arrays (`Bytes<n>`)
- **Standard Library Structs** - `Maybe<T>`, `Either<A, B>`, and others

> **Note:** User-defined composite types (`struct` and `enum`) are covered in [Chapter 5: User-Defined Types](../ch05-user-types/index.md).

## Overview

| Type            | Description                         | Example                     |
| --------------- | ----------------------------------- | --------------------------- |
| `[T1, T2, ...]` | Tuple - heterogeneous, fixed-length | `[Uint<64>, Boolean]`       |
| `[]`            | Unit type (empty tuple)             | `[]`                        |
| `Vector<n, T>`  | Same as `[T, T, ..., T]` (n times)  | `Vector<10, Uint<8>>`       |
| `Bytes<n>`      | Fixed-length byte array             | `Bytes<32>`                 |
| `Maybe<T>`      | Optional value (std library)        | `Maybe<Uint<64>>`           |
| `Either<A, B>`  | One of two types (std library)      | `Either<Uint<64>, Boolean>` |

## Key Concepts

### Tuples and Vectors

- **Tuples** can hold different types: `[Uint<64>, Boolean, Bytes<32>]`
- **Vectors** are shorthand for tuples of the same type: `Vector<3, Field>` is exactly `[Field, Field, Field]`
- Values are created with `[e1, e2, ...]` syntax

_Source: [Primitive types](https://docs.midnight.network/develop/reference/compact/lang-ref#primitive-types); [Tuple creation](https://docs.midnight.network/develop/reference/compact/lang-ref#tuple-creation)_

### Bytes

`Bytes<n>` is a fixed-length byte array heavily used throughout the standard library for:

- Hashes and addresses
- Merkle trees
- Contract addresses (`ContractAddress { bytes: Bytes<32>; }`)

_Source: [Primitive types](https://docs.midnight.network/develop/reference/compact/lang-ref#primitive-types)_

### Standard Library Composite Structs

The standard library defines reusable composite types:

```compact
// Optional value
struct Maybe<T> { isSome: Boolean; value: T; }

// Disjoint union
struct Either<A, B> { isLeft: Boolean; left: A; right: B; }

// Merkle tree proof path
struct MerkleTreePath<#n, T> { leaf: T; path: Vector<n, MerkleTreePathEntry>; }

// Contract address wrapper
struct ContractAddress { bytes: Bytes<32>; }
```

To use these, import the standard library:

```compact
pragma language_version >= 0.18.0;
import CompactStandardLibrary;
```

_Source: [Standard library structs](https://docs.midnight.network/develop/reference/compact/compact-std-library/exports#structs)_
