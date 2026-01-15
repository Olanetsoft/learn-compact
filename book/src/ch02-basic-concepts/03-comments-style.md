# Comments and Style

Good code style makes your contracts readable and maintainable.

## Comments

Compact supports single-line comments:

```compact
// This is a comment
export ledger counter: Counter; // Inline comment

// Multi-line comments use multiple single-line comments
// Each line needs its own // prefix
// Like this
```

> **Note:** Block comments (`/* */`) are not supported in Compact.

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

// ❌ Bad - just restates WHAT (the code is clear)
// Increment counter by 1
counter.increment(1);
```

## Code Formatting

### Indentation

Use 4 spaces for indentation (consistent with Midnight examples):

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

Keep lines under 100 characters when possible:

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

Use blank lines to separate logical sections:

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
    balance.insert(to, amount);
    totalSupply.increment(amount);
}

export circuit burn(from: Bytes<32>, amount: Uint<64>): [] {
    balance.remove(from);
    totalSupply.decrement(amount);
}
```

## Style Summary

| Element     | Style                 |
| ----------- | --------------------- |
| Comments    | `//` only, no `/* */` |
| Indentation | 4 spaces              |
| Line length | < 100 characters      |
| Blank lines | Between sections      |
| Operators   | Spaces around them    |

## Next Steps

You now understand the basics of Compact programs. Let's dive into the type system!
