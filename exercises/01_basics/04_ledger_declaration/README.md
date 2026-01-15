# Exercise: Ledger Declaration

## Goal

Learn how to declare ledger state variables.

## Instructions

1. Open `exercise.compact`
2. Declare three ledger variables:
   - A `Counter` named `visits`
   - A `Map<Bytes<32>, Uint<64>>` named `balances`
   - A `Set<Bytes<32>>` named `members`

## ⚠️ Critical Syntax Note

Each ledger field must be declared on its own line:

```compact
// ✅ CORRECT
export ledger counter: Counter;
export ledger data: Map<Bytes<32>, Field>;

// ❌ WRONG - This will NOT compile
ledger {
    counter: Counter,
    data: Map<Bytes<32>, Field>
}
```

## Verify

```bash
compactc exercise.compact
```

## Hints

<details>
<summary>Hint 1</summary>
The syntax is: `export ledger name: Type;`
</details>

<details>
<summary>Hint 2</summary>
Don't forget `export` if you want the field to be publicly visible.
</details>
