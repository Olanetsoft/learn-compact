# Learn Compact - Exercises

This directory contains hands-on exercises to practice Compact concepts.

## Structure

```
exercises/
├── 01_basics/         # Pragma, imports, basic structure
├── 02_types/          # Primitive and compound types
├── 03_circuits/       # Circuit declaration and usage
├── 04_witnesses/      # Witness patterns
├── 05_ledger/         # Ledger state operations
├── 06_patterns/       # Common patterns and best practices
└── solutions/         # Reference solutions (peek only if stuck!)
```

## How to Use

Each exercise folder contains:

- `exercise.compact` - The template with TODO comments
- `README.md` - Instructions and hints
- A corresponding solution in `solutions/`

### Workflow

1. Read the `README.md` for the exercise
2. Open `exercise.compact`
3. Complete the TODO sections
4. Compile to verify: `compactc exercise.compact`
5. Fix any errors
6. Move to the next exercise

### Verification

```bash
# Compile a single exercise
compactc exercises/01_basics/01_hello_compact/exercise.compact

# Run the verification script for all exercises
./scripts/verify.sh
```

## Exercise Progression

### 01_basics (Start here!)

1. `01_hello_compact` - Minimal valid Compact file
2. `02_pragma_versions` - Version pragma syntax
3. `03_imports` - Import statement
4. `04_ledger_declaration` - Declaring ledger state
5. `05_simple_circuit` - Your first circuit

### 02_types

1. `01_boolean` - Boolean type and operations
2. `02_integers` - Uint types
3. `03_bytes` - Bytes type
4. `04_field` - Field type
5. `05_tuples` - Tuple types
6. `06_maybe` - Optional values

### 03_circuits

1. `01_basic_circuit` - Circuit structure
2. `02_parameters` - Taking parameters
3. `03_return_values` - Returning values
4. `04_pure_circuits` - Helper functions
5. `05_calling_circuits` - Composing circuits

### 04_witnesses

1. `01_witness_declaration` - Declaring witnesses
2. `02_witness_usage` - Using witness values
3. `03_disclosure` - The disclose pattern

### 05_ledger

1. `01_counter` - Counter operations
2. `02_map` - Map operations
3. `03_set` - Set operations
4. `04_combined` - Using multiple state types

### 06_patterns

1. `01_authentication` - User authentication pattern
2. `02_access_control` - Permission patterns
3. `03_commit_reveal` - Commit-reveal scheme

## Tips

- **Read errors carefully** - Compact errors are often descriptive
- **Check the common mistakes table** - In Chapter 19 of the book
- **One concept at a time** - Each exercise focuses on one thing
- **Don't skip ahead** - Exercises build on each other

## Need Help?

1. Re-read the corresponding chapter in the book
2. Check the hints in the exercise README
3. Look at the solution (but try first!)
4. Ask in the Midnight Discord community

Happy learning! 🚀
