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

> ⚠️ **Critical:** Use dot notation (`GameState.waiting`), NOT Rust-style double colon (`GameState::waiting`).
>
> ```compact
> // ✅ CORRECT - dot notation
> const state = GameState.waiting;
>
> // ❌ WRONG - Rust-style (parse error)
> const state = GameState::waiting;
> ```

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

export circuit pause(): [] {
    assert(state == ContractState.active, "Can only pause active contract");
    state = ContractState.paused;
}

export circuit resume(): [] {
    assert(state == ContractState.paused, "Can only resume paused contract");
    state = ContractState.active;
}
```

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

export circuit updateOrderStatus(orderId: Uint<64>, newStatus: OrderStatus): [] {
    const order = orders.lookup(disclose(orderId));
    orders.insert(disclose(orderId), Order {
        orderId: order.orderId,
        customerId: order.customerId,
        amount: order.amount,
        status: disclose(newStatus)
    });
}
```

## Casting Enums

Enums can be cast to numeric types and vice versa:

```compact
enum Choice { rock, paper, scissors }

// Enum to number (by variant index: rock=0, paper=1, scissors=2)
const choiceNum = Choice.paper as Uint<8>;  // 1

// Number to enum
const numVal: Uint<8> = 2;
const choice = numVal as Choice;  // Choice.scissors
```

> ⚠️ **Warning:** Casting an out-of-range number to an enum may cause runtime errors.

_Source: [Type casting](https://docs.midnight.network/develop/reference/compact/lang-ref#type-casting)_

## Exporting Enums

To use an enum from TypeScript, **you must export it**:

```compact
// ✅ Accessible from TypeScript
export enum GameState { waiting, playing, finished }

// ❌ Not accessible from TypeScript (internal only)
enum InternalState { a, b, c }
```

_Source: [Representations in TypeScript](https://docs.midnight.network/develop/reference/compact/lang-ref#representations-in-typescript)_

## TypeScript Representation

Exported enums become TypeScript union types or enums:

```typescript
// Compact
export enum GameState {
  waiting,
  playing,
  finished,
}

// TypeScript (generated) - typically as a union or enum
type GameState = "waiting" | "playing" | "finished";
// or
enum GameState {
  waiting = 0,
  playing = 1,
  finished = 2,
}
```

## Enum Naming Conventions

- Enum type names use **PascalCase**: `GameState`, `OrderStatus`, `Direction`
- Variant names use **camelCase** or **snake_case**: `waiting`, `in_progress`

## Common Patterns

### State Machine

```compact
enum AuctionState { open, closed, finalized }

export ledger auctionState: AuctionState;

export circuit closeAuction(): [] {
    assert(auctionState == AuctionState.open, "Auction not open");
    auctionState = AuctionState.closed;
}

export circuit finalizeAuction(): [] {
    assert(auctionState == AuctionState.closed, "Auction not closed");
    auctionState = AuctionState.finalized;
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
export ledger yesCount: Counter;
export ledger noCount: Counter;

export circuit castVote(voter: Bytes<32>, choice: Vote): [] {
    ballots.insert(disclose(voter), Ballot {
        voter: disclose(voter),
        choice: disclose(choice)
    });

    if (disclose(choice == Vote.yes)) {
        yesCount.increment(1);
    }
    if (disclose(choice == Vote.no)) {
        noCount.increment(1);
    }
}
```

## Complete Example

```compact
pragma language_version >= 0.18.0;

import CompactStandardLibrary;

// Game states
export enum GamePhase { setup, betting, reveal, payout }

// Player choices
export enum Choice { rock, paper, scissors }

// Game result
export enum Result { player1Wins, player2Wins, draw }

export ledger phase: GamePhase;

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

// Advance game phase
export circuit advancePhase(): [] {
    if (phase == GamePhase.setup) {
        phase = GamePhase.betting;
    } else {
        if (phase == GamePhase.betting) {
            phase = GamePhase.reveal;
        } else {
            if (phase == GamePhase.reveal) {
                phase = GamePhase.payout;
            }
        }
    }
}
```

## Exercises

Complete [`exercises/05_user_types/02_enums/`](https://github.com/Olanetsoft/learn-compact/tree/main/exercises/05_user_types/02_enums).
