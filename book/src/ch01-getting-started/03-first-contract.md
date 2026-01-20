# Your First Contract

Let's write a simple counter contract - the "Hello World" of Compact.

## Creating the Contract File

Create a new file called `counter.compact`:

```bash
mkdir -p my-first-contract
cd my-first-contract
touch counter.compact
```

## Writing the Contract

Open `counter.compact` and add the following code:

```compact
pragma language_version >= 0.16 && <= 0.18;

import CompactStandardLibrary;

// Our first ledger state - a counter
export ledger counter: Counter;

// A circuit to increment the counter
export circuit increment(): [] {
    counter.increment(1);
}

// A circuit to decrement the counter
export circuit decrement(): [] {
    counter.decrement(1);
}

// A circuit to read the current count
export circuit getCount(): Uint<64> {
    return counter.read();
}

// A circuit to check if counter is below a threshold
export circuit isLessThan(threshold: Uint<64>): Boolean {
    // disclose() is required because comparing a witness value (threshold)
    // with ledger state could reveal information about the witness
    return counter.lessThan(disclose(threshold));
}

// A circuit to reset the counter
export circuit reset(): [] {
    counter.resetToDefault();
}
```

Let's break down each part:

### Pragma Statement

```compact
pragma language_version >= 0.16 && <= 0.18;
```

This declares which Compact language versions your code is compatible with. Always include this at the top of your files.

### Import Statement

```compact
import CompactStandardLibrary;
```

This imports the Compact standard library, which provides types like `Counter`, `Map`, `Set`, and utility functions.

### Ledger Declaration

```compact
export ledger counter: Counter;
```

This declares a public (`export`) ledger variable named `counter` of type `Counter`. Ledger state is stored on the blockchain.

> ⚠️ **CRITICAL:** Each ledger field must be declared individually. There is NO block syntax like `ledger { }`.

### Circuit Declaration

```compact
export circuit increment(): [] {
    counter.increment(1);
}
```

Circuits are the functions of Compact. Key points:

- `export` makes it callable from outside the contract
- `circuit` is the keyword (not `function`)
- `[]` is the return type for circuits that return nothing (not `void` or `Void`)
- The body contains the operations

### The `disclose()` Function

Notice the `isLessThan` circuit uses `disclose()`:

```compact
export circuit isLessThan(threshold: Uint<64>): Boolean {
    return counter.lessThan(disclose(threshold));
}
```

In Compact, parameters to exported circuits are **witness values** (private inputs). When you use a witness value in a way that could reveal information about it (like comparing with public ledger state), Compact requires you to explicitly acknowledge this potential disclosure using `disclose()`.

This is a safety feature - Compact won't let you accidentally leak private data. By calling `disclose()`, you're telling the compiler "I understand this value may be revealed, and that's okay."

## Compiling the Contract

Compile your contract using the `compact compile` command:

```bash
compact compile counter.compact managed/counter
```

> ⚠️ **Note:** The older `compactc` command is deprecated. Always use `compact compile`.

If successful, you'll see a managed output directory structure created:

```
managed/counter/
├── contract/           # TypeScript bindings
│   ├── index.cjs       # JavaScript implementation
│   └── index.d.cts     # TypeScript type definitions
├── zkir/               # Circuit representations
├── keys/               # Proving and verifying keys
│   ├── proving-keys/
│   └── verifying-keys/
└── compiler/           # Compiler metadata
```

## Understanding the Output

The compiler generates a managed directory containing:

1. **contract/** - TypeScript/JavaScript code to interact with the contract
   - Deploy the contract
   - Call circuit functions
   - Read ledger state
2. **zkir/** - Zero-knowledge intermediate representation of your circuits
3. **keys/** - Cryptographic keys for proving and verification
4. **compiler/** - Build metadata and artifacts

## Common First-Time Errors

| Error                                                 | Cause                                   | Fix                                  |
| ----------------------------------------------------- | --------------------------------------- | ------------------------------------ |
| `parse error at 'Void'`                               | Using `Void` as return type             | Use `[]` instead                     |
| `parse error at '{'`                                  | Using `ledger { }` block syntax         | Declare each field separately        |
| `unknown type 'Counter'`                              | Missing import                          | Add `import CompactStandardLibrary;` |
| `potential witness-value disclosure must be declared` | Using witness value in ledger operation | Wrap the value with `disclose()`     |

## Exercises

Complete the exercises in [`exercises/01_basics/`](https://github.com/Olanetsoft/learn-compact/tree/main/exercises/01_basics) to practice:

1. Writing pragma statements
2. Importing the standard library
3. Declaring ledger state
4. Creating basic circuits

## Next Steps

Congratulations! You've written and compiled your first Compact contract. In the next chapter, we'll explore the basic concepts of the language in more detail.
