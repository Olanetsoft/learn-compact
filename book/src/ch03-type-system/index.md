# Primitive Types

This chapter covers Compact's primitive types - the building blocks for all data in your contracts.

## Overview

Compact provides several primitive types:

| Type         | Description                                                           | Example                               |
| ------------ | --------------------------------------------------------------------- | ------------------------------------- |
| `Boolean`    | True/false values                                                     | `true`, `false`                       |
| `Field`      | Elements of the proving system's scalar field                         | Used in ZK proof arithmetic           |
| `Uint<n>`    | Sized unsigned integers (up to `n` bits)                              | `Uint<64>`, `Uint<256>`               |
| `Uint<0..n>` | Bounded unsigned integers from `0` to `n`                             | `Uint<0..100>` for percentages        |
| `Bytes<n>`   | Fixed-length byte arrays                                              | `Bytes<32>` for hashes or identifiers |
| `Opaque<s>`  | Opaque values tagged by a string literal (`"string"`, `"Uint8Array"`) | `Opaque<"string">`                    |

> **Note:** `Uint<n>` and `Uint<0..n>` are the **same type family**. `Uint<n>` is exactly equivalent to `Uint<0..(2^n - 1)>`.

Each type serves a specific purpose in zero-knowledge circuits. Let's explore them in detail.
