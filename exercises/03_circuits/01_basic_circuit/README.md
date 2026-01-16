# Exercise: Basic Circuit

## Goal

Create a circuit that operates on ledger state.

## Instructions

1. Open `exercise.compact`
2. Create a circuit that adds a specified amount to the counter

## Circuit Structure

```compact
export circuit name(param: Type): ReturnType {
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
The circuit should take a Uint<64> parameter.
</details>

<details>
<summary>Hint 2</summary>
Use counter.increment(amount) with your parameter.
</details>
