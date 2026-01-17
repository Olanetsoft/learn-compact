# Type Aliases

Type aliases let you create shorthand names for existing types. Compact supports two kinds of type aliases with different semantics.

## Structural Aliases (`type`)

A **structural alias** creates a shorthand name that is completely interchangeable with the underlying type:

```compact
type Point = [Field, Field];
type Hash = Bytes<32>;
type Balance = Uint<64>;
```

Structural aliases are just convenient names—the aliased type is identical to the original:

```compact
type Point = [Field, Field];

export pure circuit distance(p1: Point, p2: [Field, Field]): Field {
    // p1 and p2 are the same type - no casting needed
    const dx = p2[0] - p1[0];
    const dy = p2[1] - p1[1];
    return dx * dx + dy * dy;
}
```

## Nominal Aliases (`new type`)

A **nominal alias** creates a distinct type that requires explicit casting:

```compact
new type UserId = Uint<64>;
new type OrderId = Uint<64>;
```

Even though `UserId` and `OrderId` have the same underlying type, they are NOT interchangeable:

```compact
new type UserId = Uint<64>;
new type OrderId = Uint<64>;

export pure circuit processUser(userId: UserId): Uint<64> {
    // Must cast to use with arithmetic
    return (userId as Uint<64>) + 1;
}

export circuit example(): [] {
    const user: UserId = 100 as UserId;
    const order: OrderId = 100 as OrderId;

    // ❌ ERROR: UserId is not OrderId
    // processUser(order);

    // ✅ OK: Same value, correct type
    processUser(user);
}
```

### Why Use Nominal Types?

Nominal types prevent accidental mixing of values that happen to have the same underlying type:

```compact
new type Temperature = Uint<32>;
new type Pressure = Uint<32>;

// Without nominal types, you could accidentally pass pressure as temperature
// With nominal types, the compiler catches this mistake
```

## Key Differences

| Feature                              | `type` (Structural)     | `new type` (Nominal) |
| ------------------------------------ | ----------------------- | -------------------- |
| Interchangeable with underlying type | ✅ Yes                  | ❌ No                |
| Requires explicit casting            | ❌ No                   | ✅ Yes               |
| Prevents accidental type mixing      | ❌ No                   | ✅ Yes               |
| Use case                             | Shorthand/documentation | Type safety          |

## Generic Type Aliases

Both kinds of aliases can take type parameters:

```compact
// Structural generic alias
type Pair<T> = [T, T];
type Matrix<#N, T> = Vector<N, Vector<N, T>>;

// Nominal generic alias
new type Id<T> = Bytes<32>;
new type Amount<#N> = Uint<N>;
```

The `#` prefix indicates a size parameter (natural number) rather than a type parameter.

```compact
// Type parameter (a type)
type Container<T> = [T, T, T];

// Size parameter (a number)
new type FixedBytes<#N> = Bytes<N>;
new type SmallVec<#N, T> = Vector<N, T>;
```

## Using Type Aliases

### With Structs

```compact
new type UserId = Uint<64>;
new type Timestamp = Uint<64>;

struct UserRecord {
    id: UserId,
    createdAt: Timestamp,
    balance: Uint<64>
}
```

### With Maps

```compact
new type Address = Bytes<32>;
new type Balance = Uint<64>;

export ledger balances: Map<Address, Balance>;

export circuit getBalance(addr: Address): Balance {
    return balances.lookup(disclose(addr));
}
```

### With Standard Library Types

```compact
new type UserId = Uint<64>;
new type MaybeUser = Maybe<UserId>;

export pure circuit findUser(id: UserId): MaybeUser {
    if ((id as Uint<64>) > 0) {
        return some<UserId>(id) as MaybeUser;
    }
    return none<UserId>() as MaybeUser;
}
```

## Arithmetic with Nominal Types

When using nominal types in arithmetic, you must cast to the underlying type and back:

```compact
new type TokenAmount = Uint<64>;

export pure circuit addTokens(a: TokenAmount, b: TokenAmount): TokenAmount {
    // Cast to Uint<64>, perform arithmetic, cast result back
    return ((a as Uint<64>) + (b as Uint<64>)) as TokenAmount;
}
```

> ⚠️ **Important:** Arithmetic on nominal types requires explicit casting because the compiler treats them as distinct types.

## Comparison with Nominal Types

Comparisons also require casting for nominal types:

```compact
new type Score = Uint<32>;

export pure circuit isHighScore(score: Score, threshold: Score): Boolean {
    return (score as Uint<32>) > (threshold as Uint<32>);
}
```

## Exporting Type Aliases

Export type aliases to use them from TypeScript:

```compact
export type Point = [Field, Field];
export new type UserId = Uint<64>;
```

## TypeScript Representation

Type aliases map to TypeScript types:

```typescript
// Compact structural alias
type Point = [Field, Field];
// TypeScript: type Point = [bigint, bigint];

// Compact nominal alias
new type UserId = Uint<64>;
// TypeScript: type UserId = bigint; (loses nominal distinction)
```

> **Note:** TypeScript doesn't have built-in nominal typing, so the compile-time safety of `new type` only applies within Compact.

## Best Practices

### Use Structural Aliases For

- Shorthand for complex types: `type GameBoard = Vector<64, Uint<8>>;`
- Documentation/readability: `type Hash = Bytes<32>;`
- Generic type shortcuts: `type Pair<T> = [T, T];`

### Use Nominal Aliases For

- Preventing accidental mixing of same-typed values
- Domain-specific types: `new type UserId = Uint<64>;`
- Type-safe APIs: Parameters can't be accidentally swapped

```compact
// Without nominal types - easy to swap parameters by mistake
circuit transfer(from: Uint<64>, to: Uint<64>, amount: Uint<64>): []

// With nominal types - compiler catches mistakes
new type AccountId = Uint<64>;
new type Amount = Uint<64>;
circuit transfer(from: AccountId, to: AccountId, amount: Amount): []
```

## Complete Example

```compact
pragma language_version >= 0.18.0;

import CompactStandardLibrary;

// Structural aliases for documentation
type Hash = Bytes<32>;
type Signature = Bytes<64>;

// Nominal aliases for type safety
new type AccountId = Bytes<32>;
new type TokenAmount = Uint<64>;
new type Timestamp = Uint<64>;

// Generic alias
type TransferPair = [AccountId, AccountId];

// Struct using type aliases
struct Transfer {
    from: AccountId,
    to: AccountId,
    amount: TokenAmount,
    timestamp: Timestamp
}

export ledger balances: Map<AccountId, TokenAmount>;
export ledger lastTransfer: Transfer;

export circuit transfer(
    from: AccountId,
    to: AccountId,
    amount: TokenAmount
): [] {
    // Get current balances
    const fromBal = balances.lookup(disclose(from));
    const toBal = balances.lookup(disclose(to));

    // Check sufficient balance
    assert(
        (fromBal as Uint<64>) >= (amount as Uint<64>),
        "Insufficient balance"
    );

    // Update balances (with explicit casts for arithmetic)
    const newFromBal = ((fromBal as Uint<64>) - (amount as Uint<64>)) as TokenAmount;
    const newToBal = ((toBal as Uint<64>) + (amount as Uint<64>)) as TokenAmount;

    balances.insert(disclose(from), newFromBal);
    balances.insert(disclose(to), newToBal);

    // Record transfer
    lastTransfer = Transfer {
        from: disclose(from),
        to: disclose(to),
        amount: disclose(amount),
        timestamp: 0 as Timestamp  // Would come from witness in real app
    };
}
```

## Exercises

Complete [`exercises/05_user_types/03_type_aliases/`](https://github.com/Olanetsoft/learn-compact/tree/main/exercises/05_user_types/03_type_aliases).
