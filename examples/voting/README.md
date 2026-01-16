# Private Voting Example

A voting contract that uses the commit-reveal pattern to ensure fair, private voting.

## How It Works

1. **Registration Phase:** Voters register with their derived public ID
2. **Commit Phase:** Voters submit a hash of their vote (commitment)
3. **Reveal Phase:** Voters reveal their vote and prove it matches their commitment

## Privacy Model

- **Private during commit:** Vote choice hidden in commitment hash
- **Public after reveal:** Vote is counted (but still unlinkable to real identity)
- **Always private:** Voter's secret key

## Key Concepts Demonstrated

1. **Enums:** `VoteChoice` with dot notation access
2. **Commit-Reveal Pattern:** Two-phase voting
3. **Hashing:** Creating commitments
4. **Sets:** Tracking who has voted
5. **Disclosure:** Proper use of `disclose()` for conditionals

## Compile

```bash
compact compile contract.compact
```

## Security Notes

- Commitment prevents vote manipulation
- Two-phase prevents seeing others' votes before voting
- Secret key never leaves the user's machine
