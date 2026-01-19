# Assertions

Assertions check that a Boolean condition holds at runtime and are enforced in the zero-knowledge circuit.

## Syntax

```text
assert(<condition>, "error message");
```

- `<condition>` must evaluate to `Boolean`
- If `true`, execution continues
- If `false`, the transaction fails with the given message
- The assertion is constrained in-circuit (becomes part of the ZK proof)

_Source: [Statements](https://docs.midnight.network/develop/reference/compact/lang-ref#statements)_

## Examples

### State Preconditions

```compact
pragma language_version >= 0.16 && <= 0.18;

import CompactStandardLibrary;

export enum State { unset, set }

export ledger state: State;
export ledger value: Uint<64>;

export circuit get(): Uint<64> {
    assert(state == State.set, "Attempted to get uninitialized value");
    return value;
}
```

_Source: [Writing a contract](https://docs.midnight.network/develop/reference/compact/writing#the-circuit-definitions)_

### Authorization

The BBoard contract uses assertions for authorization. Note that `publicKey` is a custom circuit defined in the contract:

```text
// From the BBoard contract (simplified)
export circuit post(newMessage: Opaque<"string">): [] {
    assert(state == State.VACANT, "Attempted to post to an occupied board");
    owner = disclose(publicKey(localSecretKey(), sequence as Field as Bytes<32>));
    message = disclose(some<Opaque<"string">>(newMessage));
    state = State.OCCUPIED;
}

export circuit takeDown(): Opaque<"string"> {
    assert(state == State.OCCUPIED, "Board is empty");
    assert(owner == publicKey(localSecretKey(), sequence as Field as Bytes<32>),
           "Not the current owner");
    // ... rest of circuit
}
```

_Source: [BBoard contract](https://docs.midnight.network/develop/tutorial/creating/bboard-contract#enforcing-the-contract-circuits)_

## Typical Uses

- **State preconditions** - ensure contract is in correct state before proceeding
- **Authorization** - verify caller has permission (e.g., derived key matches owner)
- **Witness validation** - check untrusted witness results before using them

## Runtime and Circuit Behavior

Assertions serve two purposes:

1. **Runtime guard** - if false, the transaction aborts with the error message
2. **Circuit constraint** - the condition is encoded into the ZK proof

This means any valid proof must satisfy all assertions in the circuit.

_Source: [Statements](https://docs.midnight.network/develop/reference/compact/lang-ref#statements)_

## Next Steps

Learn about [Functions](../ch09-functions/index.md) in Compact.
