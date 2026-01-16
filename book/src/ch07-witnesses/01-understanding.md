# Understanding Witnesses

## What is a Witness?

In zero-knowledge proofs, a **witness** is private input that the prover knows but doesn't reveal to the verifier.

**Example:** Proving you know a password without revealing it.

In Compact, witnesses provide private data to your circuits:

- Secret keys
- Private amounts
- Hidden choices
- Any data you want to use but not expose

## Witness Declaration

Witnesses are declared with just a signature - **no body**:

```compact
witness getSecretKey(): Bytes<32>;
```

## ⚠️ Critical Syntax

```compact
// ✅ CORRECT - Declaration only, no body
witness myWitness(): Bytes<32>;

// ❌ WRONG - Witnesses have NO body in Compact
witness myWitness(): Bytes<32> {
    return something;
}
```

The implementation happens in **TypeScript**, not Compact!

## How Witnesses Work

1. **Compact declares** the witness signature
2. **TypeScript implements** the witness function
3. **At proof time**, the witness provides private data
4. **The proof verifies** computations on that data
5. **The witness value stays private**

```
┌─────────────────┐      ┌──────────────────┐
│  TypeScript     │      │    Compact       │
│  (implements)   │ ───▶ │  (declares)      │
│  secretKey()    │      │  witness secret  │
└─────────────────┘      └──────────────────┘
         │                        │
         │    Private Data        │
         └──────────┬─────────────┘
                    ▼
            ┌───────────────┐
            │  ZK Proof     │
            │  (data stays  │
            │   hidden)     │
            └───────────────┘
```

## ⚠️ Security Warning

> **Do not assume that the code of any witness function is the code that you wrote in your own implementation.** Any DApp may provide any implementation that it wants for your witness functions. Results from witnesses should be treated as **untrusted input**.

Always validate witness results in your circuit logic!

## Why Not Just Pass Parameters?

| Parameters          | Witnesses            |
| ------------------- | -------------------- |
| Visible on-chain    | Private to prover    |
| Anyone can provide  | Only prover provides |
| Part of transaction | Part of proof        |

Use witnesses for anything that should remain private.

## Exercises

Complete `exercises/04_witnesses/01_witness_declaration/`.
