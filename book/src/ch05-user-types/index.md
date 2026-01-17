# User-Defined Types

Beyond built-in types, Compact allows you to define custom types to model your domain. This chapter covers the three ways to create user-defined types:

- **Structs** - Custom record types with named fields
- **Enums** - Named enumeration types with distinct variants
- **Type Aliases** - Shorthand names for existing types (`type` and `new type`)
- **Generic Types** - Parameterized types for reusable abstractions

## Overview

| Declaration             | Purpose                   | Example                               |
| ----------------------- | ------------------------- | ------------------------------------- |
| `struct Name { ... }`   | Record with named fields  | `struct Point { x: Field, y: Field }` |
| `enum Name { ... }`     | Enumeration with variants | `enum Status { pending, approved }`   |
| `type Name = Type;`     | Structural type alias     | `type Coordinate = [Field, Field];`   |
| `new type Name = Type;` | Nominal (distinct) type   | `new type UserId = Uint<64>;`         |

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

### Type Aliases

Compact provides two kinds of type aliases:

**Structural alias (`type`)** - Just a shorthand, completely interchangeable:

```compact
type Point = [Field, Field];
// Point and [Field, Field] are identical
```

**Nominal alias (`new type`)** - Creates a distinct type that requires explicit casting:

```compact
new type UserId = Uint<64>;
// UserId is NOT the same as Uint<64> - requires casting
```

_Source: [CHANGELOG - Type aliases](https://docs.midnight.network/develop/reference/compact/changelog)_

### Exporting Types

To use custom types from TypeScript, export them:

```compact
export struct Player { ... }
export enum GameState { ... }
export type Point = [Field, Field];
```

_Source: [Representations in TypeScript](https://docs.midnight.network/develop/reference/compact/lang-ref#representations-in-typescript)_

## When to Use Each

| Use Case                           | Recommended Type    |
| ---------------------------------- | ------------------- |
| Group related fields               | `struct`            |
| Finite set of states               | `enum`              |
| Shorthand for complex type         | `type` alias        |
| Type-safe wrapper (prevent mixing) | `new type`          |
| Reusable container                 | Generic struct/type |

## What's Next

- [Structs](01-structs.md) - Creating and using struct types
- [Enums](02-enums.md) - Defining enumeration types
- [Type Aliases](03-type-aliases.md) - Using `type` and `new type`
- [Generic Types](04-generics.md) - Parameterized type definitions
