# Exercise: Tuples and Vectors

## Objectives

In this exercise, you'll practice:

- Declaring and using tuples
- Declaring and using vectors
- Accessing elements by index
- Destructuring tuples

## Task

Complete the contract in `exercise.compact`:

1. **Define a tuple type alias** `Coordinate` for `[Uint<32>, Uint<32>]`
2. **Implement `createCoordinate`** - returns a tuple from x and y values
3. **Implement `getX`** - extracts the first element from a coordinate
4. **Implement `getY`** - extracts the second element from a coordinate
5. **Implement `sumVector`** - sums all elements in a `Vector<5, Uint<8>>`
6. **Implement `swapCoordinate`** - returns `[y, x]` from input `[x, y]` using destructuring

## Hints

- Tuple access: `tuple[0]`, `tuple[1]`
- Destructuring: `const [a, b] = tuple;`
- Vector elements accessed the same way as tuples

## Running the Exercise

```bash
compact compile exercise.compact
```

## Solution

When you're ready, check `solutions/04_compound/01_tuples_vectors.compact`
