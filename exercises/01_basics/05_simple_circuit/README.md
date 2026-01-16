# Exercise: Simple Circuit

## Goal

Create your first circuit that modifies ledger state.

## Instructions

1. Open `exercise.compact`
2. Create an exported circuit named `increment`
3. The circuit should increment the counter by 1

## ⚠️ Critical Syntax Notes

- Circuits that return nothing use `[]` as the return type, NOT `void` or `Void`
- Use `circuit` keyword, NOT `function`

```compact
// ✅ CORRECT
export circuit myCircuit(): [] {
    // body
}

// ❌ WRONG - Void is not valid
export circuit myCircuit(): Void {
    // body
}
```

## Verify

```bash
compact compile exercise.compact
```

## Hints

<details>
<summary>Hint 1</summary>
The circuit signature should be: `export circuit increment(): []`
</details>

<details>
<summary>Hint 2</summary>
Use `counter.increment(1)` to increment the counter.
</details>
