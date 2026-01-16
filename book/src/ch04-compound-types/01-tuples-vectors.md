# Tuples and Vectors

## Tuples

A **tuple** is a fixed-length, heterogeneous sequence of values.

_Source: [Primitive types](https://docs.midnight.network/develop/reference/compact/lang-ref#primitive-types)_

### Syntax

```compact
// Tuple type: [T1, T2, ...]
const pair: [Uint<64>, Boolean] = [100, true];
const triple: [Field, Uint<8>, Bytes<32>] = [42, 255, hash];
```

Tuple values are created with `[e1, e2, ...]` syntax.

_Source: [Tuple creation](https://docs.midnight.network/develop/reference/compact/lang-ref#tuple-creation)_

### The Unit Type `[]`

The empty tuple `[]` is called the **unit type**. It's commonly used as the return type for circuits that don't return a value:

```compact
export circuit doSomething(): [] {
    // perform operations
}
```

### Tuple Element Access

Access tuple elements using bracket notation with a numeric literal:

```compact
const pair: [Uint<64>, Boolean] = [100, true];
const first = pair[0];   // 100
const second = pair[1];  // true
```

> **Note:** The index must be a numeric literal known at compile time.

_Source: [Element and member access expressions](https://docs.midnight.network/develop/reference/compact/lang-ref#element-and-member-access-expressions)_

### Tuple Destructuring

You can destructure tuples in `const` bindings:

```compact
const pair: [Uint<64>, Boolean] = [100, true];
const [amount, flag] = pair;
// amount = 100, flag = true
```

You can skip elements by omitting identifiers:

```compact
const triple: [Uint<64>, Boolean, Field] = [100, true, 42];
const [amount, , fieldVal] = triple;  // Skip the boolean
```

### Default Values

The default value of a tuple is a tuple where each element has its type's default value:

- `[Uint<64>, Boolean]` defaults to `[0, false]`

_Source: [Default values](https://docs.midnight.network/develop/reference/compact/lang-ref#default-values)_

---

## Vectors

`Vector<n, T>` is a **shorthand** for a tuple of `n` elements all of type `T`. It's exactly the same type as `[T, T, ..., T]` (n times).

_Source: [Primitive types](https://docs.midnight.network/develop/reference/compact/lang-ref#primitive-types)_

### Syntax

```compact
// Vector<n, T> is shorthand for [T, T, ..., T]
const nums: Vector<5, Uint<8>> = [1, 2, 3, 4, 5];
const flags: Vector<3, Boolean> = [true, false, true];

// These are equivalent types:
// Vector<3, Field> === [Field, Field, Field]
```

### Vector Element Access

Same as tuples—use bracket notation:

```compact
const nums: Vector<5, Uint<8>> = [1, 2, 3, 4, 5];
const third = nums[2];  // 3
```

With constant folding, you can use expressions that evaluate to constants:

```compact
export circuit foo(v: Vector<10, Uint<8>>): Uint<8> {
    const i = 4;
    return v[2 * i];  // v[8] after constant folding
}
```

_Source: [Release notes 0.18](https://docs.midnight.network/develop/relnotes/compact/minokawa-0-18-26-0)_

### Vectors vs Tuples Subtyping

A vector `Vector<n, T>` is a **subtype** of a tuple `[T, T, ...]` of length `n`. This means a vector can be passed where a tuple is expected:

```compact
pure circuit processPair(p: [Uint<8>, Uint<8>]): Uint<16> {
    return p[0] as Uint<16> + p[1] as Uint<16>;
}

export circuit example(): Uint<16> {
    const v: Vector<2, Uint<8>> = [10, 20];
    return processPair(v);  // ✅ Vector passed as tuple
}
```

_Source: [Subtyping and least upper bounds](https://docs.midnight.network/develop/reference/compact/lang-ref#subtyping-and-least-upper-bounds)_

### Bytes ↔ Vector Casting

Since Compact 0.17, you can cast between `Bytes<n>` and `Vector<n, Uint<8>>`:

```compact
const bytes: Bytes<4> = "test";
const vec: Vector<4, Uint<8>> = bytes as Vector<4, Uint<8>>;

const vec2: Vector<3, Uint<8>> = [65, 66, 67];
const bytes2: Bytes<3> = vec2 as Bytes<3>;
```

_Source: [Release notes 0.17](https://docs.midnight.network/develop/relnotes/compact/compact-0-17-25-0)_

## TypeScript Representation

Both tuples and vectors are represented as JavaScript arrays in TypeScript:

```typescript
// Compact: [Uint<64>, Boolean]
// TypeScript: [bigint, boolean]

// Compact: Vector<5, Uint<8>>
// TypeScript: bigint[]
```

_Source: [Representations in TypeScript](https://docs.midnight.network/develop/reference/compact/lang-ref#representations-in-typescript)_

## Exercises

Complete [`exercises/04_compound/01_tuples_vectors/`](https://github.com/Olanetsoft/learn-compact/tree/main/exercises/04_compound/01_tuples_vectors).
