# Circuits

Circuits are the main operational units of a Midnight smart contract. They correspond closely to functions in other languages, but are compiled directly into zero-knowledge circuits.

_Source: [Circuits](https://docs.midnight.network/develop/reference/compact/lang-ref#circuits)_

In this chapter, you'll learn:

- How to declare circuits
- Parameters and return values
- Pure circuits for helper functions
- Visibility and exports

## Why "Circuits"?

The Compact compiler outputs zero-knowledge circuits used to prove correctness of ledger interactions. When you write a Compact circuit, it gets transformed into an actual ZK circuit that can generate and verify cryptographic proofs.

_Source: [Writing a contract](https://docs.midnight.network/develop/reference/compact/writing)_

Think of circuits as special functions that:

1. **Define business logic** - What the contract can do and how state changes
2. **Generate ZK proofs** - Compiled into circuits that underpin proof generation and verification
3. **Are callable from TypeScript** - Exposed via the generated `Contract` class and `Circuits`/`PureCircuits` types when marked `export`

_Source: [Writing a contract](https://docs.midnight.network/develop/reference/compact/writing#the-circuit-definitions), [TypeScript target](https://docs.midnight.network/develop/reference/compact/lang-ref#typescript-target)_
