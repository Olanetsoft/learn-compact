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

## Validating Witness Results

Since witnesses are untrusted, you must verify their outputs make sense. Here are the key patterns:

### What CAN Be Trusted

**Only the types** can be assumed valid. If a witness returns `Uint<32>`, you know the result will be a `Uint<32>` (or it will fail an assert earlier). But you have **no way of knowing** that the witness was honestly computed.

### What CANNOT Be Trusted

- That the witness was computed using your DApp's implementation
- That any invariants hold (e.g., not all values of `Uint<32>` may be valid for your use case)
- That the computation was done correctly

### Pattern 1: Offloading Expensive Computation

When using witnesses to perform operations that are expensive or impossible in circuits (like division), verify the result makes mathematical sense:

```compact,editable
pragma language_version >= 0.16 && <= 0.18;

// Witness performs division - expensive/impossible in circuit
witness _divMod(x: Uint<32>, y: Uint<32>): [Uint<32>, Uint<32>];

// Safe division: calls witness, then VERIFIES the result
export circuit div(x: Uint<32>, y: Uint<32>): Uint<32> {
  const res = disclose(_divMod(x, y));
  const quotient = res[0];
  const remainder = res[1];

  // Verify the witness gave us a valid answer!
  // If x = y * quotient + remainder, the division was correct
  assert(remainder < y && x == y * quotient + remainder,
         "Invalid divMod witness impl");

  return quotient;
}

export circuit mod(x: Uint<32>, y: Uint<32>): Uint<32> {
  const res = disclose(_divMod(x, y));
  const quotient = res[0];
  const remainder = res[1];

  assert(remainder < y && x == y * quotient + remainder,
         "Invalid divMod witness impl");

  return remainder;
}
```

The TypeScript implementation:

```typescript
// witnesses.ts
_divMod: (
  context: WitnessContext<Ledger, PrivateState>,
  x: bigint,
  y: bigint
): [PrivateState, [bigint, bigint]] => {
  const xn = Number(x);
  const yn = Number(y);
  const remainder = xn % yn;
  const quotient = Math.floor(xn / yn);
  return [context.privateState, [BigInt(quotient), BigInt(remainder)]];
};
```

**Key insight:** We never use `_divMod()` directly in the contract. We wrap it in `div()` and `mod()` which call the witness and **verify** the result is mathematically correct.

### Pattern 2: Verifying Private State (e.g., Secret Keys)

When a witness provides private state like a user's secret key, verify it against known public data:

```compact
// Witness provides the user's secret key
witness secretKeyWitness(): Bytes<32>;

export circuit authenticate(): [] {
  // Get the secret from witness
  const secret = disclose(secretKeyWitness());

  // Derive public key from secret
  const derivedPubKey = hash(secret);

  // Verify against stored public key
  assert(derivedPubKey == userPublicKey, "User verification failed");
}
```

The verification proves the user knows the secret that corresponds to their registered public key, without revealing the secret itself.

### Why Validation Matters

A malicious user could:

1. **Interact from a different client** - Not using your DApp at all
2. **Provide a modified witness implementation** - Returns incorrect values
3. **Try to exploit business logic** - By providing "valid type but invalid value" data

Your circuit's asserts are your **only** line of defense against malicious witness implementations.

## Why Not Just Pass Parameters?

| Parameters          | Witnesses            |
| ------------------- | -------------------- |
| Visible on-chain    | Private to prover    |
| Anyone can provide  | Only prover provides |
| Part of transaction | Part of proof        |

Use witnesses for anything that should remain private.

## Exercises

Complete [`exercises/04_witnesses/01_witness_declaration/`](https://github.com/Olanetsoft/learn-compact/tree/main/exercises/04_witnesses/01_witness_declaration).
