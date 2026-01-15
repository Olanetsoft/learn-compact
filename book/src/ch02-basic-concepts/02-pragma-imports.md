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

### Best Practices

```compact
// ✅ Good - specific version range
pragma language_version >= 0.16 && <= 0.18;

// ⚠️ Caution - open-ended (may break with future versions)
pragma language_version >= 0.16;

// ❌ Too restrictive - limits compatibility
pragma language_version == 0.17;
```

## Import Statement

The `import` statement brings external modules into scope.

### Standard Library

Every Compact program typically imports the standard library:

```compact
import CompactStandardLibrary;
```

This provides:

- **Types:** `Counter`, `Map`, `Set`, `MerkleTree`, `Maybe`, `Either`
- **Functions:** `persistentHash`, `persistentCommit`, `pad`, `default`

### What's NOT in the Standard Library

> ⚠️ **CRITICAL:** `public_key()` is NOT a built-in function. If you need public key functionality, derive it using `persistentHash` on a secret key.

### Import Syntax

```compact
// Import entire module
import CompactStandardLibrary;

// Import from a local file (future feature)
// import { MyType } from "./types.compact";
```

### Module Contents

After importing `CompactStandardLibrary`, you have access to:

| Category       | Items                                                                   |
| -------------- | ----------------------------------------------------------------------- |
| Ledger Types   | `Counter`, `Map<K,V>`, `Set<T>`, `MerkleTree<N,T>`                      |
| Optional Types | `Maybe<T>`, `Either<L,R>`                                               |
| Functions      | `persistentHash<T>()`, `persistentCommit<T>()`, `pad()`, `default<T>()` |
| Helpers        | `some<T>()`, `none<T>()`, `left<L,R>()`, `right<L,R>()`                 |

## Complete Template

Here's a minimal complete Compact file:

```compact
pragma language_version >= 0.16 && <= 0.18;

import CompactStandardLibrary;

export ledger value: Counter;

export circuit increment(): [] {
    value.increment(1);
}
```

## Exercises

Practice pragma and import statements in `exercises/01_basics/02_pragma_imports/`.
