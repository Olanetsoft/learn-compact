# Exercise: Witness Declaration

## Goal

Learn how to declare witnesses - the bridge between private input and your contract.

## Instructions

1. Open `exercise.compact`
2. Declare the witnesses as described in the TODO comments

## ⚠️ Critical Syntax

Witnesses in Compact are **declarations only** - they have NO body:

```compact
// ✅ CORRECT - just a declaration with semicolon
witness getSecretKey(): Bytes<32>;

// ❌ WRONG - witnesses have no body in Compact
witness getSecretKey(): Bytes<32> {
    return something;
}
```

The actual implementation happens in TypeScript!

## Verify

```bash
compactc exercise.compact
```

## Hints

<details>
<summary>Hint 1</summary>
The syntax is: `witness name(): ReturnType;`
</details>

<details>
<summary>Hint 2</summary>
Remember: No curly braces, just a semicolon at the end.
</details>
