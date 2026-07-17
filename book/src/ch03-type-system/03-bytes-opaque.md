# Bytes and Opaque Types

## Bytes\<n\>

`Bytes<n>` represents a fixed-length byte array of exactly `n` bytes. According to the docs, `Bytes` types are used in the Compact standard library for hashing, and string literals also have a `Bytes` type (where `n` is the number of bytes in the UTF-8 encoding).

### Common Uses _(guidance)_

```compact
export pure circuit shapes(
    hash: Bytes<32>,   // Hashes (32 bytes = 256 bits)
    id: Bytes<8>,      // Short identifiers
    data: Bytes<256>   // Longer data
): Bytes<32> {
    return hash;
}
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

### Bytes Operations

`Bytes` values support equality comparison with `==` and `!=` (verified with toolchain 0.31.1):

```compact
export pure circuit compareBytes(hash1: Bytes<32>, hash2: Bytes<32>): Boolean {
    const same = hash1 == hash2;
    const different = hash1 != hash2;
    return same;
}
```

### Hashing to Bytes

The standard library's `persistentHash<T>` hashes a value of type `T` and returns `Bytes<32>` — no cast needed (verified with toolchain 0.31.1):

```compact
export pure circuit hashIt(someValue: Bytes<32>): Bytes<32> {
    const hash: Bytes<32> = persistentHash<Bytes<32>>(someValue);
    return hash;
}
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
    // Parameters are private inputs — writing them to public ledger
    // state requires an explicit disclose()
    messages.insert(disclose(key), disclose(opaqueValue));
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
