# Bytes and Opaque Types

## Bytes<N>

`Bytes<N>` represents a fixed-size byte array of exactly N bytes.

### Common Uses

```compact
// Addresses/Public Keys (32 bytes = 256 bits)
const address: Bytes<32> = ...;

// Short identifiers
const id: Bytes<8> = ...;

// Longer data
const data: Bytes<256> = ...;
```

### Creating Bytes

In practice, `Bytes` values often come from:

- Witnesses (private input)
- Hashing functions
- Parameters passed to circuits

```compact
witness getAddress(): Bytes<32>;

export circuit example(): [] {
    const addr = getAddress();
    // use addr...
}
```

### Bytes Operations

```compact
// Comparison
const same = addr1 == addr2;
const different = addr1 != addr2;
```

### Hashing to Bytes

```compact
const hash: Bytes<32> = persistentHash<Bytes<32>>(someValue) as Bytes<32>;
```

## Opaque Types

`Opaque<T>` represents types that exist at runtime but not in ZK circuits.

### Opaque<"string">

For string data:

```compact
// Declare a field that holds string data
export ledger message: Opaque<"string">;
```

### Opaque<"Uint8Array">

For arbitrary binary data:

```compact
export ledger binaryData: Opaque<"Uint8Array">;
```

### Important Limitations

> ⚠️ **Opaque values cannot be used in circuit logic!**

```compact
// ❌ This will NOT work
if (opaqueValue == something) { ... }

// ✅ Opaque values can only be stored/retrieved
ledger.insert(key, opaqueValue);
```

## When to Use What

| Type                   | Use Case                              |
| ---------------------- | ------------------------------------- |
| `Bytes<32>`            | Addresses, hashes, keys               |
| `Bytes<N>`             | Fixed-size binary data you compute on |
| `Opaque<"string">`     | Human-readable text you just store    |
| `Opaque<"Uint8Array">` | Binary blobs you just store           |

## Exercises

Complete `exercises/02_types/03_bytes/`.
