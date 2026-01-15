# Learn Compact 🌙

> The definitive guide to learning Compact, Midnight's zero-knowledge smart contract language

[![CI](https://github.com/Olanetsoft/learn-compact/actions/workflows/ci.yml/badge.svg)](https://github.com/Olanetsoft/learn-compact/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## 📖 What is This?

Learn Compact is an interactive book and exercise collection for learning the Compact programming language. Compact is the smart contract language for [Midnight](https://midnight.network), a blockchain with native support for zero-knowledge proofs.

**This project is inspired by:**

- [The Rust Programming Language](https://doc.rust-lang.org/book/)
- [Rustlings](https://github.com/rust-lang/rustlings)

## 🎯 Who is This For?

Developers with programming experience who want to:

- Build privacy-preserving smart contracts
- Learn zero-knowledge proof concepts
- Develop on the Midnight blockchain

**Prerequisites:**

- Programming experience in any language
- TypeScript/JavaScript knowledge (helpful but not required)
- Basic blockchain concepts (we'll cover what you need)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Olanetsoft/learn-compact.git
cd learn-compact
```

### 2. Run Setup Script

```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### 3. Read the Book

```bash
# Install mdBook if you haven't
cargo install mdbook

# Serve the book locally
cd book
mdbook serve
```

Open http://localhost:3000 in your browser.

### 4. Do the Exercises

```bash
cd exercises/01_basics/01_hello_compact
# Read README.md
# Edit exercise.compact
# Compile to check your solution
compactc exercise.compact
```

## 📚 Structure

```
learn-compact/
├── book/               # mdBook source (the textbook)
│   └── src/
│       ├── ch00-introduction.md
│       ├── ch01-getting-started/
│       ├── ch02-basic-concepts/
│       └── ...
├── exercises/          # Hands-on exercises (rustlings-style)
│   ├── 01_basics/
│   ├── 02_types/
│   ├── 03_circuits/
│   └── solutions/
├── examples/           # Complete working contracts
│   ├── counter/
│   ├── bulletin-board/
│   └── voting/
└── scripts/            # Helper scripts
```

## 📝 Exercise Workflow

1. **Read** the corresponding chapter in the book
2. **Open** the exercise folder
3. **Read** the exercise README.md
4. **Edit** exercise.compact to complete the TODOs
5. **Compile** with `compactc exercise.compact`
6. **Fix** any errors
7. **Move** to the next exercise

Check your progress:

```bash
./scripts/verify.sh
```

## 🎓 Learning Path

| Part                | Topics                              | Exercises                 |
| ------------------- | ----------------------------------- | ------------------------- |
| 1. Foundations      | Intro, Setup, Basics                | 01_basics                 |
| 2. Type System      | Primitives, Compounds, User-defined | 02_types                  |
| 3. Core Features    | Circuits, Witnesses, Control Flow   | 03_circuits, 04_witnesses |
| 4. State Management | Ledger, Counter, Map, Set           | 05_ledger                 |
| 5. Advanced         | Stdlib, Modules, TypeScript         | 06_patterns               |
| 6. Projects         | Counter, Bulletin Board, Voting     | examples/                 |

## ⚠️ Common Mistakes

| Wrong                    | Correct                      |
| ------------------------ | ---------------------------- |
| `ledger { field: Type }` | `export ledger field: Type;` |
| `circuit fn(): Void`     | `circuit fn(): []`           |
| `Choice::rock`           | `Choice.rock`                |
| `witness fn(): T { }`    | `witness fn(): T;`           |

See [Chapter 19: Common Mistakes](book/src/ch19-common-mistakes/) for the full list.

## 🔧 Version Compatibility

- **Compact Language:** v0.16 - v0.18
- **Compiler:** compact-v0.3.0
- **Last Updated:** January 2026

## 🤝 Contributing

Contributions welcome! Please:

1. Ensure all Compact code compiles
2. Each exercise tests ONE concept
3. Follow the progressive difficulty structure

## 📜 License

MIT License - See [LICENSE](LICENSE) for details.

## 🔗 Resources

- [Midnight Official Docs](https://docs.midnight.network)
- [Compact Language Reference](https://docs.midnight.network/develop/reference/compact/lang-ref)
- [Midnight Discord](https://discord.gg/midnight)
- [Local Development Network](https://github.com/bricktowers/midnight-local-network) - Run your own local Midnight node (community tool by Brick Towers)

---

**Happy Learning! 🚀**
