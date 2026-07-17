# Appendix E: Version History

This page mirrors the [Midnight Support Matrix](https://docs.midnight.network/relnotes/support-matrix) for quick reference. The authoritative source is the Midnight docs — always check there if you hit a compatibility issue.

> **Last synced:** July 2026

## Current Supported Versions

From the official matrix:

> This matrix only reflects the latest tested versions. Earlier versions may still work, but we do not guarantee compatibility or provide support for them.

### Runtime & Contracts

These versions are the same across Preview, Preprod, and Mainnet:

| Component                             | Version | Purpose                                                  |
| ------------------------------------- | ------- | -------------------------------------------------------- |
| Compact devtools (`compact`)          | 0.5.1   | Installs compilers, compiles contracts                    |
| Compact toolchain (`compact compile`) | 0.31.1  | Contract compiler for Midnight                            |
| Compact runtime                       | 0.16.0  | Runtime library for contracts                             |
| Compact JS                            | 2.5.1   | TypeScript execution environment for compiled contracts   |
| Platform JS                           | 2.2.4   | Core abstractions and types                               |
| On-chain runtime                      | 3.0.0   | On-chain runtime support (v3)                             |

### SDKs & APIs

Also the same across all three networks:

| Component            | Version | Purpose                                      |
| -------------------- | ------- | -------------------------------------------- |
| Wallet SDK           | 1.2.0   | SDK for building wallet integrations         |
| Midnight.js          | 4.1.1   | DApp framework: contracts, types, providers  |
| testkit-js           | 4.1.1   | E2E testing framework                        |
| DApp Connector API   | 4.0.1   | Interface between DApps and wallets          |

### Network & Infrastructure

These components differ by network:

| Component         | Preview | Preprod | Mainnet | Notes                 |
| ----------------- | ------- | ------- | ------- | --------------------- |
| Node (Midnight)   | 1.0.0   | 1.0.0   | 0.22.5  | Network node          |
| Midnight Indexer  | 4.3.3   | 4.3.3   | 4.0.1   | Blockchain indexer    |
| Proof server      | 8.1.0   | 8.1.0   | 8.0.3   | ZKP proof generation  |

## Language Version Pragma

The Compact **language** version (used in `pragma language_version`) is distinct from the compiler version above. Toolchain 0.31.1 implements language version **0.23** (check yours with `compact compile --language-version`). This book's runnable examples target:

```compact
pragma language_version >= 0.16;
```

Any compiler from the `0.16` language line onward — including the current `0.23` line — accepts these programs. See [Chapter 2: Pragma and Imports](../ch02-basic-concepts/02-pragma-imports.md) for the full range of pragma forms.

## Compatibility Note

If your installed toolchain doesn't match what's listed here, run `compact update` to pull the latest, or consult the [Midnight Support Matrix](https://docs.midnight.network/relnotes/support-matrix) for the current state of the world.
