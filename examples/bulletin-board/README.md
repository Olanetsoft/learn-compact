# Bulletin Board Example

A privacy-preserving message board where users can post publicly visible messages while keeping their identity private.

## Privacy Model

- **Public:** Message content, timestamp, poster's public key hash
- **Private:** Poster's secret key (used to derive the public key)

## Features

- Post messages
- Verify message ownership without revealing identity
- Delete your own messages

## Key Concepts Demonstrated

1. **Witnesses:** Secret key input from TypeScript
2. **Hashing:** Deriving public keys from secret keys
3. **Structs:** Custom Message type
4. **Maps:** Storing messages by ID
5. **Privacy:** Using `disclose()` appropriately

## Compile

```bash
compactc contract.compact
```
