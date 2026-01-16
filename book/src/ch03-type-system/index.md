# Primitive Types

This chapter covers Compact's primitive types - the building blocks for all data in your contracts.

## Overview

Compact provides several primitive types:

| Type         | Description                    | Example                          |
| ------------ | ------------------------------ | -------------------------------- |
| `Boolean`    | True/false values              | `true`, `false`                  |
| `Field`      | Native ZK field elements       | Used in cryptographic operations |
| `Uint<n>`    | Sized unsigned integers (bits) | `Uint<64>`, `Uint<256>`          |
| `Uint<0..n>` | Bounded unsigned integers      | `Uint<0..100>` for percentages   |
| `Bytes<N>`   | Fixed-size byte arrays         | `Bytes<32>` for addresses        |
| `Opaque<T>`  | External types                 | `Opaque<"string">`               |

> **Note:** `Uint<n>` and `Uint<0..n>` are the **same type family**. `Uint<8>` is exactly equivalent to `Uint<0..255>`.

Each type serves a specific purpose in zero-knowledge circuits. Let's explore them in detail.
