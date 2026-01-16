# Exercise: Bytes and Opaque Types

## Goal

Learn how to work with `Bytes<n>` fixed-length byte arrays and `Opaque<s>` types in Compact.

## Concepts

- `Bytes<n>` - Fixed-length byte array of exactly `n` bytes
- `Opaque<"string">` - String data (opaque to circuits, represented as hash)
- `Opaque<"Uint8Array">` - Binary data (opaque to circuits, represented as hash)

## Tasks

1. Declare a ledger field of type `Bytes<32>` for storing a hash
2. Declare a ledger field of type `Opaque<"string">` for storing a message
3. Create a circuit that accepts a `Bytes<32>` parameter
4. Create a circuit that stores an opaque string value

## Verify

```bash
compact compile exercise.compact
```

## Hints

<details>
<summary>Hint 1</summary>
Bytes declaration: `export ledger myHash: Bytes<32>;`
</details>

<details>
<summary>Hint 2</summary>
Opaque declaration: `export ledger myMessage: Opaque<"string">;`
</details>

<details>
<summary>Hint 3</summary>
Remember: Opaque values are opaque to circuits—you can store and compare them by hash, but you cannot inspect their actual content in circuit logic.
</details>
