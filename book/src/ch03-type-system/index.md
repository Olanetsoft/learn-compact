# Primitive Types

This chapter covers Compact's primitive types - the building blocks for all data in your contracts.

## Overview

Compact provides several primitive types:

| Type         | Description                                                           | Example                               |
| ------------ | --------------------------------------------------------------------- | ------------------------------------- |
| `Boolean`    | True/false values                                                     | `true`, `false`                       |
| `Field`      | Elements of the proving system's scalar field                         | Used in ZK proof arithmetic           |
| `Uint<n>`    | Sized unsigned integers (up to `n` bits, max width 248)               | `Uint<64>`, `Uint<128>`               |
| `Uint<0..n>` | Bounded unsigned integers from `0` up to (not including) `n`          | `Uint<0..101>` for percentages 0-100  |
| `Bytes<n>`   | Fixed-length byte arrays                                              | `Bytes<32>` for hashes or identifiers |
| `Opaque<s>`  | Opaque values tagged by a string literal (`"string"`, `"Uint8Array"`) | `Opaque<"string">`                    |

> **Note:** `Uint<n>` and `Uint<0..n>` are the **same type family**. `Uint<n>` is exactly equivalent to `Uint<0..2^n>` (exclusive upper bound).

Each type serves a specific purpose in zero-knowledge circuits. Let's explore them in detail.
