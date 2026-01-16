# Pragma and Imports

## Pragma Statement

The pragma statement declares which Compact language versions your code supports.

### Syntax

```compact
pragma language_version >= 0.16 && <= 0.18;
```

This means:

- Minimum version: 0.16
- Maximum version: 0.18

### Why Version Constraints?

Compact is evolving. New versions may:

- Add new features
- Change existing syntax
- Deprecate old patterns

By specifying version bounds, you ensure:

1. Your code compiles with compatible compilers
2. Future breaking changes don't silently break your contract
3. Users know which compiler version to use

If the Compact compiler does not support the language versions specified, it will signal a compile-time error.

### Best Practices

> **Note:** These are recommended conventions, not official rules from the Midnight documentation.

```compact
// ✅ Recommended - specific version range
pragma language_version >= 0.16 && <= 0.18;

// ⚠️ Caution - open-ended (may break with future versions)
pragma language_version >= 0.16;

// ❌ Too restrictive - limits compatibility
pragma language_version == 0.17;
```

## Import Statement

The `import` statement brings external modules into scope.

### Standard Library

Every Compact program should import the standard library:

```compact
import CompactStandardLibrary;
```

This provides ledger ADTs and useful helper types and functions.

### Import Syntax

```compact
// Import entire module
import CompactStandardLibrary;

// Import from a path
import "path/to/module";
```

The import mechanism supports:

- `import M;` — import a module
- `import "path/to/M";` — import from a path
- Optional prefix and type parameters

### Module Contents

After importing `CompactStandardLibrary`, you have access to:

| Category       | Items                                                                                        |
| -------------- | -------------------------------------------------------------------------------------------- |
| Ledger ADTs    | `Counter`, `Map<K,V>`, `MerkleTree<N,T>`                                                     |
| Optional Types | `Maybe<T>`, `Either<L,R>`, `CurvePoint`, `MerkleTreeDigest`, etc.                            |
| Hash Functions | `persistentHash<T>()`, `persistentCommit<T>()`, `transientHash<T>()`, `transientCommit<T>()` |
| Helpers        | `some<T>()`, `none<T>()`, `left<L,R>()`, `right<L,R>()`, `pad()`                             |

> **Note:** The standard library also includes EC functions, Merkle functions, and coin-management functions. See the [Compact Standard Library Reference](https://docs.midnight.network/develop/reference/compact/compact-std-library) for the complete list.

## Complete Template

Here's a minimal complete Compact file (matches the official counter example pattern):

```compact
pragma language_version >= 0.16 && <= 0.18;

import CompactStandardLibrary;

export ledger value: Counter;

export circuit increment(): [] {
    value.increment(1);
}
```

## Exercises

Practice pragma and import statements in [`exercises/01_basics/02_pragma_imports/`](https://github.com/Olanetsoft/learn-compact/tree/main/exercises/01_basics/02_pragma_imports).
