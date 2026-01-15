# Circuits

Circuits are the functions of Compact. They define the operations your contract can perform.

In this chapter, you'll learn:

- How to declare circuits
- Parameters and return values
- Pure circuits for helper functions
- Visibility and exports

## Why "Circuits"?

In zero-knowledge systems, computations are represented as arithmetic circuits. When you write a Compact circuit, the compiler transforms it into an actual ZK circuit that can generate and verify proofs.

Think of circuits as special functions that:

1. Can read/modify blockchain state
2. Generate cryptographic proofs of correct execution
3. Are callable from TypeScript applications
