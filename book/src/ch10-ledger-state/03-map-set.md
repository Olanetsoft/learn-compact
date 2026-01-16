# Map and Set Types

Maps and Sets are ledger ADTs for storing collections of data on-chain.

## Map\\<K, V\\>

A key-value mapping where each key maps to a value.

### Declaration

```compact
export ledger balances: Map<Bytes<32>, Uint<64>>;
export ledger usernames: Map<Bytes<32>, Opaque<"string">>;
```

### Operations (All Available in Circuits)

| Operation        | Signature                | Description               |
| ---------------- | ------------------------ | ------------------------- |
| `insert`         | `(key: K, value: V): []` | Add or update an entry    |
| `insertDefault`  | `(key: K): []`           | Insert with default value |
| `lookup`         | `(key: K): V`            | Get value for key         |
| `member`         | `(key: K): Boolean`      | Check if key exists       |
| `remove`         | `(key: K): []`           | Remove an entry           |
| `isEmpty`        | `(): Boolean`            | Check if map is empty     |
| `size`           | `(): Uint<64>`           | Get number of entries     |
| `resetToDefault` | `(): []`                 | Clear all entries         |

### Example Usage

```compact
export ledger balances: Map<Bytes<32>, Uint<64>>;

// Add a balance
export circuit set_balance(address: Bytes<32>, amount: Uint<64>): [] {
    balances.insert(disclose(address), disclose(amount));
}

// Check if address has a balance
export circuit has_balance(address: Bytes<32>): Boolean {
    return balances.member(address);
}

// Get a balance
export circuit get_balance(address: Bytes<32>): Uint<64> {
    return balances.lookup(address);
}

// Remove a balance
export circuit clear_balance(address: Bytes<32>): [] {
    balances.remove(disclose(address));
}

// Check map size
export circuit get_user_count(): Uint<64> {
    return balances.size();
}
```

### Special: insertCoin

When the value type is `QualifiedCoinInfo`, you can use `insertCoin`:

```compact
export ledger coins: Map<Bytes<32>, QualifiedCoinInfo>;

export circuit deposit_coin(
    key: Bytes<32>,
    coin: CoinInfo,
    recipient: Either<ZswapCoinPublicKey, ContractAddress>
): [] {
    coins.insertCoin(disclose(key), coin, recipient);
}
```

## Set\<T\>

A collection of unique values.

### Declaration

```compact
export ledger members: Set<Bytes<32>>;
export ledger allowlist: Set<Bytes<32>>;
```

### Operations (All Available in Circuits)

| Operation        | Signature                                                                      | Description                            |
| ---------------- | ------------------------------------------------------------------------------ | -------------------------------------- |
| `insert`         | `(elem: T): []`                                                                | Add a value                            |
| `insertCoin`     | `(coin: CoinInfo, recipient: Either<ZswapCoinPublicKey, ContractAddress>): []` | Add coin (when T is QualifiedCoinInfo) |
| `member`         | `(elem: T): Boolean`                                                           | Check if value exists                  |
| `remove`         | `(elem: T): []`                                                                | Remove a value                         |
| `isEmpty`        | `(): Boolean`                                                                  | Check if set is empty                  |
| `size`           | `(): Uint<64>`                                                                 | Get number of elements                 |
| `resetToDefault` | `(): []`                                                                       | Clear all elements                     |

### Example Usage

```compact
export ledger members: Set<Bytes<32>>;

// Add a member
export circuit add_member(address: Bytes<32>): [] {
    members.insert(disclose(address));
}

// Check membership
export circuit is_member(address: Bytes<32>): Boolean {
    return members.member(address);
}

// Remove a member
export circuit remove_member(address: Bytes<32>): [] {
    members.remove(disclose(address));
}

// Check if empty
export circuit has_members(): Boolean {
    return !members.isEmpty();
}

// Get set size
export circuit get_member_count(): Uint<64> {
    return members.size();
}
```

### Special: insertCoin

When the value type is `QualifiedCoinInfo`, you can use `insertCoin`:

```compact
export ledger coinSet: Set<QualifiedCoinInfo>;

export circuit add_coin(
    coin: CoinInfo,
    recipient: Either<ZswapCoinPublicKey, ContractAddress>
): [] {
    coinSet.insertCoin(coin, recipient);
}
```

## TypeScript Access

In TypeScript, you can also iterate over Maps:

```typescript
// Iteration (TypeScript only)
for (const [key, value] of contractState.balances) {
  console.log(`${key}: ${value}`);
}
```

## Exercises

Complete [`exercises/10_ledger/03_map_set/`](https://github.com/Olanetsoft/learn-compact/tree/main/exercises/10_ledger/03_map_set) to practice:

1. Creating a token balance map
2. Implementing an allowlist with Set
3. Querying map/set membership
