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
export circuit get_count(): Uint<64> {
    return counter.read();
}

// A circuit to check if counter is below a threshold
export circuit is_less_than(threshold: Uint<64>): Boolean {
    return counter.lessThan(threshold);
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

## Compiling the Contract

Compile your contract:

```bash
compactc counter.compact
```

If successful, you'll see output files generated:

- `counter.cir` - The compiled circuit
- `counter.ts` - TypeScript bindings

## Understanding the Output

The compiler generates TypeScript code that allows you to:

1. Deploy the contract
2. Call circuit functions
3. Read ledger state

## Common First-Time Errors

| Error                    | Cause                           | Fix                                  |
| ------------------------ | ------------------------------- | ------------------------------------ |
| `parse error at 'Void'`  | Using `Void` as return type     | Use `[]` instead                     |
| `parse error at '{'`     | Using `ledger { }` block syntax | Declare each field separately        |
| `unknown type 'Counter'` | Missing import                  | Add `import CompactStandardLibrary;` |

## Exercises

Complete the exercises in `exercises/01_basics/` to practice:

1. Writing pragma statements
2. Importing the standard library
3. Declaring ledger state
4. Creating basic circuits

## Next Steps

Congratulations! You've written and compiled your first Compact contract. In the next chapter, we'll explore the basic concepts of the language in more detail.
