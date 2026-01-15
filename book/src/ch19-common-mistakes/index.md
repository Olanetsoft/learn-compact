# Common Mistakes

This chapter catalogs the most common mistakes developers make when learning Compact, along with their solutions.

## Syntax Errors Quick Reference

| ❌ Wrong                     | ✅ Correct                   | Error You'll See          |
| ---------------------------- | ---------------------------- | ------------------------- |
| `ledger { field: Type }`     | `export ledger field: Type;` | parse error               |
| `circuit fn(): Void`         | `circuit fn(): []`           | parse error               |
| `Choice::rock`               | `Choice.rock`                | parse error               |
| `witness fn(): T { }`        | `witness fn(): T;`           | parse error               |
| `pure function`              | `pure circuit`               | parse error               |
| `counter.value()` in circuit | Use TypeScript SDK           | operation undefined       |
| `if (witnessVal)`            | `if (disclose(witnessVal))`  | implicit disclosure error |

## Detailed Explanations

### Ledger Block Syntax

```compact
// ❌ WRONG - Block syntax doesn't exist
ledger {
    counter: Counter,
    balance: Map<Bytes<32>, Uint<64>>
}

// ✅ CORRECT - Individual declarations
export ledger counter: Counter;
export ledger balance: Map<Bytes<32>, Uint<64>>;
```

### Return Type for No-Return Circuits

```compact
// ❌ WRONG - Void is not a Compact type
export circuit doThing(): Void {
    counter.increment(1);
}

// ✅ CORRECT - Empty tuple [] means no return
export circuit doThing(): [] {
    counter.increment(1);
}
```

### Enum Access Syntax

```compact
export enum Choice { Rock, Paper, Scissors }

// ❌ WRONG - Rust-style double colon
const c = Choice::Rock;

// ✅ CORRECT - Dot notation (like TypeScript)
const c = Choice.Rock;
```

### Witness Bodies

```compact
// ❌ WRONG - Witnesses are declarations only
witness getKey(): Bytes<32> {
    return generateKey();
}

// ✅ CORRECT - No body, just semicolon
witness getKey(): Bytes<32>;
// Implementation goes in TypeScript!
```

### Pure Functions vs Pure Circuits

```compact
// ❌ WRONG - No 'function' keyword in Compact
pure function helper(): Uint<64> {
    return 42;
}

// ✅ CORRECT - It's 'pure circuit'
pure circuit helper(): Uint<64> {
    return 42;
}
```

### Reading Counter Values

```compact
export ledger counter: Counter;

// ❌ WRONG - .value() not available in circuits
export circuit getValue(): Uint<64> {
    return counter.value();
}

// ✅ CORRECT - Read via TypeScript SDK
// In Compact, you can only modify counters:
export circuit increment(): [] {
    counter.increment(1);
}
// Read the value from TypeScript:
// const value = await contract.ledger.counter;
```

### Using Witness Values in Conditionals

```compact
witness getSecret(): Uint<64>;

// ❌ WRONG - Direct use requires disclosure
export circuit check(): [] {
    const secret = getSecret();
    if (secret > 100) {  // Error: implicit disclosure
        // ...
    }
}

// ✅ CORRECT - Explicit disclosure
export circuit check(): [] {
    const secret = getSecret();
    if (disclose(secret > 100)) {
        // ...
    }
}
```

## Type-Related Mistakes

### Two-Step Casting

```compact
// ❌ WRONG - Direct Uint to Bytes may fail
const amount: Uint<64> = 100;
const bytes: Bytes<32> = amount as Bytes<32>;

// ✅ CORRECT - Go through Field first
const amount: Uint<64> = 100;
const bytes: Bytes<32> = (amount as Field) as Bytes<32>;
```

### Missing Standard Library Import

```compact
// ❌ WRONG - Counter type not found
pragma language_version >= 0.16 && <= 0.18;

export ledger counter: Counter;  // Error!

// ✅ CORRECT - Import the standard library
pragma language_version >= 0.16 && <= 0.18;

import CompactStandardLibrary;

export ledger counter: Counter;  // Works!
```

## Prevention Checklist

Before compiling, verify:

- [ ] Pragma statement at the top
- [ ] Standard library imported
- [ ] Each ledger field declared separately
- [ ] Circuits return `[]` not `Void`
- [ ] Enums use `.` not `::`
- [ ] Witnesses have no body
- [ ] `disclose()` used for witness values in conditionals
- [ ] `pure circuit` not `pure function`
