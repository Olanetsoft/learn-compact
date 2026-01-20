# Structs

Structs (structures) let you create custom composite types with named fields. They're ideal for grouping related data together.

_Source: [User-defined types](https://docs.midnight.network/develop/reference/compact/lang-ref#user-defined-types)_

## Declaring a Struct

Use the `struct` keyword followed by the type name and field definitions:

```compact
struct Player {
    address: Bytes<32>,
    score: Uint<64>,
    isActive: Boolean
}
```

Fields are separated by commas (or semicolons). A trailing separator is allowed but not required.

_Source: [User-defined types](https://docs.midnight.network/develop/reference/compact/lang-ref#user-defined-types)_

## Creating Struct Values

Create a struct value using the struct name followed by field values in braces:

```compact
// Named fields (recommended for clarity)
const player = Player {
    address: ownerKey,
    score: 0,
    isActive: true
};

// Positional fields (order must match declaration)
const player2 = Player { ownerKey, 0, true };

// Mixed: positional first, then named
const player3 = Player { ownerKey, 0, isActive: true };
```

_Source: [Structure creation](https://docs.midnight.network/develop/reference/compact/lang-ref#structure-creation)_

## Accessing Fields

Use dot notation to access struct fields:

```compact
const player = Player { address: ownerKey, score: 100, isActive: true };

const addr = player.address;      // Bytes<32>
const points = player.score;      // Uint<64>
const active = player.isActive;   // Boolean
```

_Source: [Element and member access expressions](https://docs.midnight.network/develop/reference/compact/lang-ref#element-and-member-access-expressions)_

## Default Values

The default value of a struct has all fields set to their type's default:

```compact
const emptyPlayer = default<Player>;
// Equivalent to: Player { address: default<Bytes<32>>, score: 0, isActive: false }
```

_Source: [Default values](https://docs.midnight.network/develop/reference/compact/lang-ref#default-values)_

## Nested Structs

Structs can contain other structs. Use chained dot notation to access nested fields:

```compact
struct Coordinate {
    x: Field,
    y: Field
}

struct Rectangle {
    topLeft: Coordinate,
    bottomRight: Coordinate
}

export pure circuit area(rect: Rectangle): Field {
    const width = rect.bottomRight.x - rect.topLeft.x;
    const height = rect.bottomRight.y - rect.topLeft.y;
    return width * height;
}
```

_Source: [User-defined types](https://docs.midnight.network/develop/reference/compact/lang-ref#user-defined-types)_

## Structs in Maps

Structs can be used as values in `Map` ledger types:

```compact
struct UserData {
    balance: Uint<64>,
    lastAction: Uint<64>,
    isVerified: Boolean
}

export ledger users: Map<Bytes<32>, UserData>;
```

_Source: [Nested state types in Map](https://docs.midnight.network/develop/reference/compact/lang-ref#nested-state-types-in-the-map-type)_

## Exporting Structs

To use a struct from TypeScript, export it:

```compact
export struct Player {
    address: Bytes<32>,
    score: Uint<64>,
    isActive: Boolean
}
```

_Source: [Top-level exports](https://docs.midnight.network/develop/reference/compact/lang-ref#top-level-exports)_

## TypeScript Representation

Exported structs map to TypeScript objects with the same field names:

```typescript
// Compact
export struct Player {
    address: Bytes<32>,
    score: Uint<64>,
    isActive: Boolean
}

// TypeScript representation
interface Player {
    address: Uint8Array;  // Bytes<32>
    score: bigint;        // Uint<64>
    isActive: boolean;    // Boolean
}
```

_Source: [Representations in TypeScript](https://docs.midnight.network/develop/reference/compact/lang-ref#representations-in-typescript)_

## Recursive Structs Are Not Allowed

Structs cannot contain themselves directly or indirectly:

```compact
// ❌ ERROR: Recursive struct
struct Node {
    value: Field,
    next: Node  // Not allowed!
}

// ❌ ERROR: Mutually recursive
struct Even {
    predecessor: Odd
}

struct Odd {
    predecessor: Even  // Creates cycle - not allowed!
}
```

_Source: [User-defined types](https://docs.midnight.network/develop/reference/compact/lang-ref#user-defined-types)_

## Complete Example

```compact
pragma language_version >= 0.16 && <= 0.18;

// Define structs
struct PlayerStats {
    wins: Uint<32>,
    losses: Uint<32>,
    draws: Uint<32>
}

struct Player {
    address: Bytes<32>,
    name: Bytes<32>,
    stats: PlayerStats
}

// Pure circuit to create a new player
export pure circuit createPlayer(
    address: Bytes<32>,
    name: Bytes<32>
): Player {
    return Player {
        address: address,
        name: name,
        stats: PlayerStats { wins: 0, losses: 0, draws: 0 }
    };
}

// Pure circuit to update stats after a win
export pure circuit recordWin(player: Player): Player {
    const newStats = PlayerStats {
        wins: (player.stats.wins + 1) as Uint<32>,
        losses: player.stats.losses,
        draws: player.stats.draws
    };
    return Player {
        address: player.address,
        name: player.name,
        stats: newStats
    };
}
```

## Exercises

Complete [`exercises/05_user_types/01_structs/`](https://github.com/Olanetsoft/learn-compact/tree/main/exercises/05_user_types/01_structs).
