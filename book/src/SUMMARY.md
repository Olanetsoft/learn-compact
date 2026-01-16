# Summary

[Introduction](ch00-introduction.md)

# Part 1: Foundations

- [Getting Started](ch01-getting-started/index.md)

  - [Installing the Compact Compiler](ch01-getting-started/01-installation.md)
  - [Setting Up Your Environment](ch01-getting-started/02-environment.md)
  - [Your First Contract](ch01-getting-started/03-first-contract.md)

- [Basic Concepts](ch02-basic-concepts/index.md)
  - [Program Structure](ch02-basic-concepts/01-program-structure.md)
  - [Pragma and Imports](ch02-basic-concepts/02-pragma-imports.md)
  - [Comments and Style](ch02-basic-concepts/03-comments-style.md)

# Part 2: The Type System

- [Primitive Types](ch03-type-system/index.md)

  - [Boolean and Field](ch03-type-system/01-boolean-field.md)
  - [Unsigned Integers](ch03-type-system/02-unsigned-integers.md)
  - [Bytes and Opaque Types](ch03-type-system/03-bytes-opaque.md)
  - [Type Casting](ch03-type-system/04-type-casting.md)

- [Composite Types](ch04-compound-types/index.md)

  - [Tuples and Vectors](ch04-compound-types/01-tuples-vectors.md)
  - [Maybe Type](ch04-compound-types/02-maybe.md)
  - [Either Type](ch04-compound-types/03-either.md)

- [User-Defined Types](ch05-user-types/index.md)
  - [Structs](ch05-user-types/01-structs.md)
  - [Enums](ch05-user-types/02-enums.md)
  - [Generic Types](ch05-user-types/03-generics.md)

# Part 3: Core Language Features

- [Circuits](ch06-circuits/index.md)

  - [Circuit Declaration](ch06-circuits/01-declaration.md)
  - [Parameters and Returns](ch06-circuits/02-parameters-returns.md)
  - [Pure Circuits](ch06-circuits/03-pure-circuits.md)

- [Witnesses](ch07-witnesses/index.md)

  - [Understanding Witnesses](ch07-witnesses/01-understanding.md)
  - [Witness Patterns](ch07-witnesses/02-patterns.md)
  - [TypeScript Implementation](ch07-witnesses/03-typescript.md)

- [Control Flow](ch08-control-flow/index.md)

  - [Conditionals](ch08-control-flow/01-conditionals.md)
  - [Loops](ch08-control-flow/02-loops.md)
  - [Assertions](ch08-control-flow/03-assertions.md)

- [Expressions & Operators](ch09-expressions/index.md)
  - [Arithmetic Operators](ch09-expressions/01-arithmetic.md)
  - [Comparison and Boolean](ch09-expressions/02-comparison-boolean.md)
  - [Type Conversions](ch09-expressions/03-type-conversions.md)

# Part 4: State Management

- [Ledger State](ch10-ledger-state/index.md)

  - [Declaring Ledger Fields](ch10-ledger-state/01-declaring.md)
  - [Counter Type](ch10-ledger-state/02-counter.md)
  - [Map and Set Types](ch10-ledger-state/03-map-set.md)
  - [MerkleTree Type](ch10-ledger-state/04-merkle-tree.md)

- [The disclose() Function](ch11-disclosure/index.md)
  - [Understanding Disclosure](ch11-disclosure/01-understanding.md)
  - [Disclosure Patterns](ch11-disclosure/02-patterns.md)

# Part 5: Advanced Concepts

- [Standard Library](ch12-stdlib/index.md)

  - [Hash Functions](ch12-stdlib/01-hash.md)
  - [Utility Functions](ch12-stdlib/02-utilities.md)

- [Modules and Organization](ch13-modules/index.md)

  - [Creating Modules](ch13-modules/01-creating.md)
  - [Imports and Exports](ch13-modules/02-imports-exports.md)

- [Constructors](ch14-constructors/index.md)

- [TypeScript Integration](ch15-typescript/index.md)
  - [Type Mappings](ch15-typescript/01-type-mappings.md)
  - [Implementing Witnesses](ch15-typescript/02-witnesses.md)
  - [SDK Usage](ch15-typescript/03-sdk.md)
  - [Deployment](ch15-typescript/04-deployment.md)

# Part 6: Projects

- [Project: Counter DApp](ch16-project-counter/index.md)

  - [Contract Implementation](ch16-project-counter/01-contract.md)
  - [TypeScript CLI](ch16-project-counter/02-cli.md)
  - [Deployment and Testing](ch16-project-counter/03-deployment.md)

- [Project: Bulletin Board](ch17-project-bulletin/index.md)

  - [Privacy Model](ch17-project-bulletin/01-privacy.md)
  - [Contract Implementation](ch17-project-bulletin/02-contract.md)
  - [React UI](ch17-project-bulletin/03-react-ui.md)

- [Project: Private Voting](ch18-project-voting/index.md)
  - [Design](ch18-project-voting/01-design.md)
  - [Implementation](ch18-project-voting/02-implementation.md)
  - [Frontend](ch18-project-voting/03-frontend.md)

# Part 7: Best Practices & Reference

- [Common Mistakes](ch19-common-mistakes/index.md)
- [Testing Contracts](ch20-testing/index.md)
- [Security Considerations](ch21-security/index.md)

# Appendix

- [A: Compact Keywords](appendix/a-keywords.md)
- [B: Operators Reference](appendix/b-operators.md)
- [C: Standard Library API](appendix/c-stdlib-api.md)
- [D: Error Messages](appendix/d-errors.md)
- [E: Version History](appendix/e-version-history.md)
