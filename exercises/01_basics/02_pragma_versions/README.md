# Exercise: Pragma Versions

## Goal

Practice writing pragma statements with different version constraints.

## Instructions

1. Open `exercise.compact`
2. Write a pragma that allows versions 0.16, 0.17, and 0.18
3. The pragma should reject versions below 0.16 or above 0.18

## Requirements

- Use `>=` for minimum version
- Use `<=` for maximum version
- Combine with `&&`

## Verify

```bash
compactc exercise.compact
```

## Hints

<details>
<summary>Hint 1</summary>
The syntax is: `pragma language_version CONDITION;`
</details>

<details>
<summary>Hint 2</summary>
Combine conditions with &&: `>= 0.16 && <= 0.18`
</details>
