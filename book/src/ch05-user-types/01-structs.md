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

Fields are separated by commas. A trailing comma is allowed but not required.

### Naming Convention

- Struct names use **PascalCase**: `Player`, `GameConfig`, `TokenInfo`
- Field names use **camelCase**: `playerAddress`, `tokenBalance`, `isValid`

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
```

_Source: [User-defined types](https://docs.midnight.network/develop/reference/compact/lang-ref#user-defined-types)_

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

Structs can contain other structs:

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

## Structs in Ledger State

Structs can be stored in ledger fields:

```compact
struct TokenInfo {
    name: Bytes<32>,
    totalSupply: Uint<64>,
    decimals: Uint<8>
}

export ledger tokenInfo: TokenInfo;

export circuit updateSupply(newSupply: Uint<64>): [] {
    tokenInfo = TokenInfo {
        name: tokenInfo.name,
        totalSupply: disclose(newSupply),
        decimals: tokenInfo.decimals
    };
}
```

> ⚠️ **Important:** Structs are immutable. To "update" a field, create a new struct with the modified value.

## Structs in Maps

Structs work well as map values:

```compact
struct UserData {
    balance: Uint<64>,
    lastAction: Uint<64>,
    isVerified: Boolean
}

export ledger users: Map<Bytes<32>, UserData>;

export circuit registerUser(userId: Bytes<32>): [] {
    users.insert(disclose(userId), UserData {
        balance: 0,
        lastAction: 0,
        isVerified: false
    });
}
```

## Exporting Structs

To use a struct from TypeScript, export it:

```compact
export struct Player {
    address: Bytes<32>,
    score: Uint<64>,
    isActive: Boolean
}
```

_Source: [Representations in TypeScript](https://docs.midnight.network/develop/reference/compact/lang-ref#representations-in-typescript)_

## TypeScript Representation

Exported structs become TypeScript interfaces:

```typescript
// Compact
export struct Player {
    address: Bytes<32>,
    score: Uint<64>,
    isActive: Boolean
}

// TypeScript (generated)
interface Player {
    address: Uint8Array;  // Bytes<32>
    score: bigint;        // Uint<64>
    isActive: boolean;    // Boolean
}
```

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
pragma language_version >= 0.18.0;

import CompactStandardLibrary;

// Define structs
export struct PlayerStats {
    wins: Uint<32>,
    losses: Uint<32>,
    draws: Uint<32>
}

export struct Player {
    address: Bytes<32>,
    name: Bytes<32>,
    stats: PlayerStats
}

// Use in ledger
export ledger players: Map<Bytes<32>, Player>;

// Circuit to register a new player
export circuit registerPlayer(address: Bytes<32>, name: Bytes<32>): [] {
    const newPlayer = Player {
        address: disclose(address),
        name: disclose(name),
        stats: PlayerStats { wins: 0, losses: 0, draws: 0 }
    };
    players.insert(disclose(address), newPlayer);
}

// Circuit to record a win
export circuit recordWin(address: Bytes<32>): [] {
    const player = players.lookup(disclose(address));
    const newStats = PlayerStats {
        wins: (player.stats.wins + 1) as Uint<32>,
        losses: player.stats.losses,
        draws: player.stats.draws
    };
    players.insert(disclose(address), Player {
        address: player.address,
        name: player.name,
        stats: newStats
    });
}
```

## Exercises

Complete [`exercises/05_user_types/01_structs/`](https://github.com/Olanetsoft/learn-compact/tree/main/exercises/05_user_types/01_structs).
