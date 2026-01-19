# Enums

Enums (enumerations) define a type with a fixed set of named values. They're perfect for representing states, choices, or categories.

_Source: [User-defined types](https://docs.midnight.network/develop/reference/compact/lang-ref#user-defined-types)_

## Declaring an Enum

Use the `enum` keyword followed by the type name and variant names:

```compact
enum GameState { waiting, playing, finished }
```

Variants are separated by commas. A trailing comma is allowed but not required.

```compact
enum Direction {
    north,
    east,
    south,
    west,
}
```

## Accessing Enum Variants

Use **dot notation** to access enum variants:

```compact
const state = GameState.waiting;
const dir = Direction.north;
```

_Source: [User-defined types](https://docs.midnight.network/develop/reference/compact/lang-ref#user-defined-types)_

> **Note:** Use dot notation to access enum variants: `GameState.waiting`

## Comparing Enums

Compare enum values with `==` and `!=`:

```compact
enum Status { pending, approved, rejected }

export pure circuit isApproved(status: Status): Boolean {
    return status == Status.approved;
}

export pure circuit notRejected(status: Status): Boolean {
    return status != Status.rejected;
}
```

_Source: [Writing a contract](https://docs.midnight.network/develop/reference/compact/writing#the-circuit-definitions)_

## Enums in Control Flow

Enums work naturally in conditionals:

```compact
enum GameState { waiting, playing, finished }

export pure circuit canJoin(state: GameState): Boolean {
    if (state == GameState.waiting) {
        return true;
    }
    return false;
}

export pure circuit getStateMessage(state: GameState): Uint<8> {
    if (state == GameState.waiting) {
        return 0;  // "Waiting for players"
    }
    if (state == GameState.playing) {
        return 1;  // "Game in progress"
    }
    return 2;  // "Game finished"
}
```

## Default Values

The default value of an enum is its **first variant**:

```compact
enum Status { pending, approved, rejected }

const s = default<Status>;  // Status.pending (first variant)
```

_Source: [Default values](https://docs.midnight.network/develop/reference/compact/lang-ref#default-values)_

## Enums in Ledger State

Enums can be stored directly in ledger fields:

```compact
enum ContractState { initialized, active, paused, terminated }

export ledger state: ContractState;
```

_Source: [Declaring public state](https://docs.midnight.network/develop/reference/compact/lang-ref#declaring-and-maintaining-public-state)_

## Enums in Structs

Enums work well as struct fields:

```compact
enum OrderStatus { pending, processing, shipped, delivered, cancelled }

struct Order {
    orderId: Uint<64>,
    customerId: Bytes<32>,
    amount: Uint<64>,
    status: OrderStatus
}

export ledger orders: Map<Uint<64>, Order>;
```

_Source: [User-defined types](https://docs.midnight.network/develop/reference/compact/lang-ref#user-defined-types)_

## Casting Enums to Field

Enums can be cast to `Field` type:

```compact
enum Choice { rock, paper, scissors }

// Enum to Field (by variant index: rock=0, paper=1, scissors=2)
const choiceField = Choice.paper as Field;  // 1
```

> ⚠️ **Note:** Casting to `Uint<n>` or from integers back to enums is **not supported**. Only `enum → Field` is a valid cast.

_Source: [Type casts](https://docs.midnight.network/develop/reference/compact/lang-ref#type-cast-expressions)_

## Exporting Enums

To use an enum from TypeScript, **you must export it**:

```compact
// ✅ Accessible from TypeScript
export enum GameState { waiting, playing, finished }

// ❌ Not accessible from TypeScript (internal only)
enum InternalState { a, b, c }
```

_Source: [Top-level exports](https://docs.midnight.network/develop/reference/compact/lang-ref#top-level-exports)_

## TypeScript Representation

Enum values are represented as numbers at runtime in JavaScript/TypeScript:

```typescript
// Compact
export enum GameState {
  waiting,
  playing,
  finished,
}

// TypeScript runtime representation - numeric values
// waiting = 0, playing = 1, finished = 2
```

_Source: [Contract constructor](https://docs.midnight.network/develop/reference/compact/lang-ref#contract-constructor)_

## Common Patterns

### State Machine

Enums are ideal for representing state machines:

```compact
enum AuctionState { open, closed, finalized }

export ledger auctionState: AuctionState;

// Check state in pure circuits
export pure circuit isOpen(state: AuctionState): Boolean {
    return state == AuctionState.open;
}

export pure circuit isClosed(state: AuctionState): Boolean {
    return state == AuctionState.closed;
}
```

### Multiple Choice

```compact
enum Vote { yes, no, abstain }

struct Ballot {
    voter: Bytes<32>,
    choice: Vote
}

export ledger ballots: Map<Bytes<32>, Ballot>;

// Pure circuit to check vote
export pure circuit isYesVote(vote: Vote): Boolean {
    return vote == Vote.yes;
}

export pure circuit isNoVote(vote: Vote): Boolean {
    return vote == Vote.no;
}
```

## Complete Example

```compact
pragma language_version >= 0.18.0;

// Game states
export enum GamePhase { setup, betting, reveal, payout }

// Player choices
export enum Choice { rock, paper, scissors }

// Game result
export enum Result { player1Wins, player2Wins, draw }

// Determine winner based on choices
export pure circuit determineWinner(p1: Choice, p2: Choice): Result {
    // Draw if same choice
    if (p1 == p2) {
        return Result.draw;
    }

    // Rock beats scissors
    if (p1 == Choice.rock) {
        if (p2 == Choice.scissors) {
            return Result.player1Wins;
        }
        return Result.player2Wins;
    }

    // Paper beats rock
    if (p1 == Choice.paper) {
        if (p2 == Choice.rock) {
            return Result.player1Wins;
        }
        return Result.player2Wins;
    }

    // Scissors beats paper
    if (p2 == Choice.paper) {
        return Result.player1Wins;
    }
    return Result.player2Wins;
}

// Check if game is in specific phase
export pure circuit isSetupPhase(phase: GamePhase): Boolean {
    return phase == GamePhase.setup;
}

export pure circuit isBettingPhase(phase: GamePhase): Boolean {
    return phase == GamePhase.betting;
}
```

## Exercises

Complete [`exercises/05_user_types/02_enums/`](https://github.com/Olanetsoft/learn-compact/tree/main/exercises/05_user_types/02_enums).
