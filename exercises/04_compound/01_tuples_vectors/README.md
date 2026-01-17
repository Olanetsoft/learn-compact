# Exercise: Tuples and Vectors

## Objectives

In this exercise, you'll practice:

- Declaring and using tuples
- Declaring and using vectors
- Accessing elements by index

## Task

Complete the contract in `exercise.compact`:

1. **Implement `createCoordinate`** - returns a tuple `[Uint<32>, Uint<32>]` from x and y values
2. **Implement `getX`** - extracts the first element from a coordinate tuple
3. **Implement `getY`** - extracts the second element from a coordinate tuple
4. **Implement `sumVector`** - sums all elements in a `Vector<5, Uint<8>>`
5. **Implement `swapCoordinate`** - returns `[y, x]` from input `[x, y]`

> **Note:** Compact does not support type aliases. Use inline tuple types like `[Uint<32>, Uint<32>]`.

## Hints

- Tuple access: `tuple[0]`, `tuple[1]`
- Vector elements accessed the same way as tuples
- Tuples and vectors are written inline (no type aliases)

## Running the Exercise

```bash
compact compile exercise.compact
```

## Solution

When you're ready, check the solutions:

- **[Tuple-based solution](https://github.com/Olanetsoft/learn-compact/blob/main/exercises/solutions/04_compound/01_tuples_vectors.compact)** - Uses inline tuple types `[Uint<32>, Uint<32>]`
- **[Struct-based alternative](https://github.com/Olanetsoft/learn-compact/blob/main/exercises/solutions/04_compound/01_tuples_vectors_struct_alternative.compact)** - Uses a `struct Coordinate { x: Uint<32>; y: Uint<32>; }` for named fields

Both approaches are valid! The tuple version is more concise, while the struct version provides named fields (`coord.x` vs `coord[0]`).
