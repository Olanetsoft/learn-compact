# Appendix E: Version History

This page mirrors the [Midnight Support Matrix](https://docs.midnight.network/relnotes/support-matrix) for quick reference. The authoritative source is the Midnight docs — always check there if you hit a compatibility issue.

> **Last synced:** April 2026

## Current Supported Versions

### Runtime & Contracts

| Component          | Version | Purpose                              |
| ------------------ | ------- | ------------------------------------ |
| Compact devtools   | 0.5.1   | Installs compilers, compiles contracts |
| Compact compiler   | 0.30.0  | Contract compiler for Midnight       |
| Compact runtime    | 0.15.0  | Runtime library for contracts        |
| Compact JS         | 2.5.0   | TypeScript execution environment     |
| Platform JS        | 2.2.4   | Core abstractions and types          |
| On-chain runtime   | 3.0.0   | On-chain runtime support (v3)        |
| Ledger             | 8.0.3   | Core ledger logic                    |

### SDKs & APIs

| Component            | Version | Purpose                     |
| -------------------- | ------- | --------------------------- |
| Wallet SDK facade    | 3.0.0   | SDK for wallet integrations |
| Midnight.js          | 4.0.4   | DApp framework              |
| testkit-js           | 4.0.4   | E2E testing framework       |
| DApp Connector API   | 4.0.1   | DApp–wallet interface       |

### Network & Infrastructure

| Component         | Version                                             | Notes                           |
| ----------------- | --------------------------------------------------- | ------------------------------- |
| Midnight Node     | 0.22.3 (Preview), 0.22.2 (Preprod), 0.22.1 (Mainnet) | Version varies by environment  |
| Midnight Indexer  | 4.0.1                                               | Blockchain indexer (v4)         |
| Proof server      | 8.0.3                                               | ZKP proof generation            |
| Block explorer    | 0.5.0                                               | On-chain data browser           |
| Faucet (tNIGHT)   | 0.11.9                                              | Test token distribution         |

### Tools

| Component                          | Version |
| ---------------------------------- | ------- |
| Compact VS Code Language Support   | 0.2.13  |

## Language Version Pragma

The Compact **language** version (used in `pragma language_version`) is distinct from the compiler version above. This book's runnable examples target:

```compact
pragma language_version >= 0.16;
```

Any compiler from the `0.16` language line onward should accept these programs. See [Chapter 2: Pragma and Imports](../ch02-basic-concepts/02-pragma-imports.md) for the full range of pragma forms.

## Compatibility Note

From the official matrix:

> This matrix only reflects the latest tested versions. Earlier versions may still work, but we do not guarantee compatibility or provide support for them.

If your installed toolchain doesn't match what's listed here, run `compact update` to pull the latest, or consult the [Midnight Support Matrix](https://docs.midnight.network/relnotes/support-matrix) for the current state of the world.
