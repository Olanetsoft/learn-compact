# Program Structure

Every Compact program follows a consistent structure. Understanding this structure helps you write well-organized contracts.

## Basic Structure

A typical Compact file has these sections in order:

```compact
// 1. Pragma declaration
pragma language_version >= 0.16 && <= 0.18;

// 2. Imports
import CompactStandardLibrary;

// 3. Type definitions (structs, enums)
export struct Person {
    name: Bytes<32>,
    age: Uint<8>
}

export enum Status { Active, Inactive }

// 4. Ledger state declarations
export ledger registry: Map<Bytes<32>, Person>;
export ledger count: Counter;

// 5. Witness declarations
witness getSecretKey(): Bytes<32>;

// 6. Circuits
export circuit register(name: Bytes<32>, age: Uint<8>): [] {
    // implementation
}

pure circuit validate_age(age: Uint<8>): Boolean {
    return age >= 18;
}
```

## File Organization

While you can put everything in one file, larger projects benefit from splitting code across files:

```
contract/
├── src/
│   ├── main.compact       # Entry point with circuits
│   ├── types.compact      # Struct and enum definitions
│   └── helpers.compact    # Pure helper circuits
```

Use `include` to combine files:

```compact
include "types.compact";
include "helpers.compact";

// main.compact continues...
```

## Naming Conventions

Compact follows these naming conventions:

| Element       | Convention           | Example                          |
| ------------- | -------------------- | -------------------------------- |
| Circuits      | snake_case           | `get_balance`, `transfer_funds`  |
| Types         | PascalCase           | `Person`, `TokenInfo`            |
| Ledger fields | snake_case           | `total_supply`, `user_balances`  |
| Enum variants | PascalCase           | `Status.Active`                  |
| Constants     | SCREAMING_SNAKE_CASE | (no constants yet, use literals) |

## Visibility

The `export` keyword controls what's accessible from outside:

```compact
// Public - accessible from TypeScript/externally
export ledger balance: Counter;
export circuit deposit(): [] { }

// Private - only accessible within the contract
ledger internal_state: Field;
circuit helper(): Field { }
```

## Key Points

1. **Order matters** - Pragma first, then imports, then definitions
2. **One declaration per line** - No block syntax for ledger
3. **Export consciously** - Only expose what needs to be public
4. **Organize logically** - Group related code together
