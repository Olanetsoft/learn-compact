# User-Defined Types

Beyond built-in types, Compact allows you to define custom types to model your domain. This chapter covers the ways to create user-defined types:

- **Structs** - Custom record types with named fields
- **Enums** - Named enumeration types with distinct variants
- **Generic Types** - Parameterized types for reusable abstractions

## Overview

| Declaration           | Purpose                   | Example                               |
| --------------------- | ------------------------- | ------------------------------------- |
| `struct Name { ... }` | Record with named fields  | `struct Point { x: Field, y: Field }` |
| `enum Name { ... }`   | Enumeration with variants | `enum Status { pending, approved }`   |

## Key Concepts

### Structs

Structs group related data into a single type with named fields:

```compact
struct Player {
    address: Bytes<32>,
    score: Uint<64>,
    isActive: Boolean
}
```

Access fields with dot notation: `player.score`

_Source: [User-defined types](https://docs.midnight.network/develop/reference/compact/lang-ref#user-defined-types)_

### Enums

Enums define a type with a fixed set of named values:

```compact
enum GameState { waiting, playing, finished }
```

Access variants with dot notation: `GameState.waiting`

> ⚠️ **Important:** Use dot notation (`GameState.waiting`), not Rust-style `GameState::waiting`.

_Source: [User-defined types](https://docs.midnight.network/develop/reference/compact/lang-ref#user-defined-types)_

### Exporting Types

To use custom types from TypeScript, export them:

```compact
export struct Player { ... }
export enum GameState { ... }
```

_Source: [Top-level exports](https://docs.midnight.network/develop/reference/compact/lang-ref#top-level-exports)_

## When to Use Each

| Use Case             | Recommended Type |
| -------------------- | ---------------- |
| Group related fields | `struct`         |
| Finite set of states | `enum`           |
| Reusable container   | Generic struct   |

## What's Next

- [Structs](01-structs.md) - Creating and using struct types
- [Enums](02-enums.md) - Defining enumeration types
- [Generic Types](03-generics.md) - Parameterized type definitions
