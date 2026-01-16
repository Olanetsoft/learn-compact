# Bytes and Opaque Types

## Bytes\<n\>

`Bytes<n>` represents a fixed-length byte array of exactly `n` bytes. According to the docs, `Bytes` types are used in the Compact standard library for hashing, and string literals also have a `Bytes` type (where `n` is the number of bytes in the UTF-8 encoding).

### Common Uses _(guidance)_

```compact
// Hashes (32 bytes = 256 bits)
const hash: Bytes<32> = ...;

// Short identifiers
const id: Bytes<8> = ...;

// Longer data
const data: Bytes<256> = ...;
```

> **Note:** The "hashes / identifiers" wording above is convention, not mandated by the docs.

### Creating Bytes

In practice, `Bytes` values often come from:

- Witnesses (private input)
- Hashing functions
- String literals (automatically typed as `Bytes<n>`)
- Parameters passed to circuits

```compact
witness getHash(): Bytes<32>;

export circuit example(): [] {
    const h = getHash();
    // use h...
}
```

### Bytes Operations _(unconfirmed)_

The docs don't explicitly list comparison operators for `Bytes`, but equality comparison is plausible:

```compact
// Comparison (unconfirmed syntax)
const same = hash1 == hash2;
const different = hash1 != hash2;
```

### Hashing to Bytes _(unconfirmed)_

The `persistentHash` function is documented in the standard library, and `Bytes<m> → Field` / `Field → Bytes<n>` casts are defined. However, the exact generic signature of `persistentHash` is not shown in the docs, so this pattern is **not verified**:

```compact
// Unconfirmed exact typing
const hash: Bytes<32> = persistentHash<Bytes<32>>(someValue) as Bytes<32>;
```

## Opaque Types

`Opaque<s>` represents opaque values tagged by a string literal `s`. Opaque values can be manipulated in witnesses but they are **opaque to circuits**—they are represented in circuits as their hash.

> **Note:** The only allowed tags are currently `"string"` and `"Uint8Array"`.

### Opaque\<"string"\>

For string data:

```compact
// Declare a field that holds string data
export ledger message: Opaque<"string">;
```

### Opaque\<"Uint8Array"\>

For arbitrary binary data:

```compact
export ledger binaryData: Opaque<"Uint8Array">;
```

### Important Limitations

> ⚠️ **Opaque values are opaque to circuits!**
>
> They are represented in circuits as their hash, so you cannot inspect their actual content in circuit logic.

> **Note:** Opaque values are only opaque _within Compact_. In your DApp's TypeScript code they are just `string` or `Uint8Array`, and on-chain they are stored as bytes/UTF-8 (not encrypted).

_Source: [Opaque data](https://docs.midnight.network/develop/reference/compact/opaque_data)_

```compact
// Opaque values can be stored and compared by hash
// (assuming a Map with Opaque value type)
export ledger messages: Map<Bytes<32>, Opaque<"string">>;

export circuit storeMessage(key: Bytes<32>, opaqueValue: Opaque<"string">): [] {
    messages.insert(key, opaqueValue);
}
```

## When to Use What _(guidance)_

| Type                   | Use Case                                 |
| ---------------------- | ---------------------------------------- |
| `Bytes<32>`            | Hashes, fixed-size identifiers           |
| `Bytes<n>`             | Fixed-size binary data you compute on    |
| `Opaque<"string">`     | Human-readable text (opaque to circuits) |
| `Opaque<"Uint8Array">` | Binary blobs (opaque to circuits)        |

_Sources: [Primitive types](https://docs.midnight.network/develop/reference/compact/lang-ref#primitive-types); [Opaque data](https://docs.midnight.network/develop/reference/compact/opaque_data)_

## Exercises

Complete [`exercises/02_types/03_bytes/`](https://github.com/Olanetsoft/learn-compact/tree/main/exercises/02_types/03_bytes).
