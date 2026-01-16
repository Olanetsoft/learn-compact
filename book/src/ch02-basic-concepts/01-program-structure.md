# Program Structure

Every Compact program follows a consistent structure. Understanding this structure helps you write well-organized contracts.

## Basic Structure

A typical Compact file has these sections:

```compact
// 1. Pragma declaration (required, must be first)
pragma language_version >= 0.16 && <= 0.18;

// 2. Imports (must come after pragma)
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

> **Note:** The pragma must come first, followed by imports. Beyond that, the ordering of types, ledger, witnesses, and circuits is flexible—the order shown above is a **recommended convention** for readability, not a language requirement.

## Modules and Imports

Compact supports modules for organizing code. You can import from modules using path syntax:

```compact
import CompactStandardLibrary;
import "mymodule/helpers";
```

For details on modules and the `import` mechanism, see the [Modules chapter](../ch13-modules/index.md).

## Naming Conventions

While Compact doesn't enforce naming conventions, following consistent patterns improves readability. The official examples use:

| Element       | Common Pattern          | Example from Docs               |
| ------------- | ----------------------- | ------------------------------- |
| Circuits      | lowercase/snake_case    | `get`, `post`, `transfer_funds` |
| Types         | PascalCase              | `Person`, `State`               |
| Ledger fields | lowercase               | `authority`, `messages`         |
| Enum variants | UPPERCASE or PascalCase | `State.UNSET`, `Status.Active`  |

> **Note:** These are style suggestions based on examples in the docs, not official rules. Choose a consistent style for your project.

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

Exported circuits become entry points callable from TypeScript. Exported ledger fields are visible via the generated `ledger()` function.

## Key Points

1. **Pragma first, imports second** - These must come at the top in this order
2. **One declaration per line** - No block syntax for ledger (e.g., no `ledger { }`)
3. **Export consciously** - Only expose what needs to be public
4. **Organize logically** - Group related code together (recommended, not required)
