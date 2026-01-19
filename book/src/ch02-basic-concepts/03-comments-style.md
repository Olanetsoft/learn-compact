# Comments and Style

Good code style makes your contracts readable and maintainable.

> **Note:** The Compact language reference does not specify a formal style guide. The conventions in this chapter are **recommended practices for this tutorial**, based on patterns seen in official examples.

## Comments

Compact supports single-line comments using `//`:

```compact
// This is a comment
export ledger counter: Counter; // Inline comment

// Multi-line comments use multiple single-line comments
// Each line needs its own // prefix
// Like this
```

### Documentation Comments

Use comments to document your code:

```compact
// Transfers tokens from sender to recipient
// Parameters:
//   - recipient: The address receiving tokens
//   - amount: Number of tokens to transfer
// Returns: [] (modifies ledger state)
export circuit transfer(recipient: Bytes<32>, amount: Uint<64>): [] {
    // Verify sender has sufficient balance
    // ... implementation
}
```

### What to Comment

```compact
// ✅ Good - explains WHY
// Use Poseidon hash for ZK-friendly public key derivation
const publicKey = persistentHash<Bytes<32>>(secretKey);

// ❌ Avoid - just restates WHAT (the code is clear)
// Increment counter by 1
counter.increment(1);
```

## Code Formatting

The following are **recommended conventions** for this tutorial, not official Compact requirements.

### Indentation

We recommend 4 spaces for indentation:

```compact
export circuit process(value: Uint<64>): Uint<64> {
    if (value > 100) {
        return value * 2;
    } else {
        return value;
    }
}
```

### Line Length

Keep lines readable—we suggest under 100 characters:

```compact
// ✅ Good - readable
export circuit transfer(
    recipient: Bytes<32>,
    amount: Uint<64>
): [] {
    // ...
}

// ❌ Hard to read
export circuit transfer(recipient: Bytes<32>, amount: Uint<64>, memo: Bytes<64>, timestamp: Uint<64>): [] { }
```

### Spacing

Use consistent spacing around operators:

```compact
// ✅ Good
const result = a + b * c;
if (value >= threshold && isActive) { }

// ❌ Inconsistent
const result=a+b*c;
if(value>=threshold&&isActive){}
```

### Blank Lines

Use blank lines to separate logical sections (this pattern is consistent with official examples):

```compact
pragma language_version >= 0.16 && <= 0.18;

import CompactStandardLibrary;

// Types
export struct Token {
    symbol: Bytes<8>,
    amount: Uint<64>
}

// State
export ledger balance: Map<Bytes<32>, Uint<64>>;
export ledger totalSupply: Counter;

// Circuits
export circuit mint(to: Bytes<32>, amount: Uint<64>): [] {
    balance.insert(disclose(to), disclose(amount));
    totalSupply.increment(disclose(amount) as Uint<16>);
}

export circuit burn(from: Bytes<32>, amount: Uint<64>): [] {
    balance.remove(disclose(from));
    totalSupply.decrement(disclose(amount) as Uint<16>);
}
```

## Style Summary

These are **project conventions for learn-compact**, not official Compact rules:

| Element     | Convention         |
| ----------- | ------------------ |
| Comments    | `//` single-line   |
| Indentation | 4 spaces           |
| Line length | < 100 characters   |
| Blank lines | Between sections   |
| Operators   | Spaces around them |

## Next Steps

You now understand the basics of Compact programs. Let's dive into the type system!
