# Introduction

Welcome to **Learn Compact**, the comprehensive guide to Midnight's zero-knowledge smart contract language.

## What is Compact?

Compact is a domain-specific language designed for writing smart contracts on the Midnight blockchain. What makes Compact special is its native support for **zero-knowledge proofs (ZKPs)**, enabling you to build applications where users can prove facts about their data without revealing the data itself.

## What is Midnight?

Midnight is a data-protection blockchain that uses zero-knowledge cryptography to enable confidential transactions and private smart contracts. Unlike traditional public blockchains where all transaction data is visible, Midnight allows developers to choose what information is public and what remains private. This is called “programmable privacy".

## What are Zero-Knowledge Proofs?

A zero-knowledge proof is a cryptographic method that allows one party (the prover) to prove to another party (the verifier) that a statement is true, without revealing any additional information beyond the validity of the statement.

**Example:** Imagine proving you're over 21 without showing your ID. A ZK proof can verify "user is over 21" without revealing your actual birthdate.

In Compact, ZK circuits are generated automatically when you compile. Actual ZK proofs are then generated locally at execution time to enable selective disclosure, which ensures the underlying data remains private.


## How This Book is Organized

This book is divided into seven parts:

1. **Foundations** - Installation, setup, and basic concepts
2. **The Type System** - All about Compact's types
3. **Core Language Features** - Circuits, witnesses, control flow
4. **State Management** - Working with ledger state
5. **Advanced Concepts** - Standard library, modules, TypeScript integration
6. **Projects** - Build real applications
7. **Best Practices & Reference** - Common mistakes, testing, and appendixes

Each chapter includes:

- 📖 **Explanations** - Clear descriptions of concepts
- 💻 **Code Examples** - Runnable Compact code
- 🏋️ **Exercises** - Practice what you've learned (in the `exercises/` folder)

## Prerequisites

To get the most out of this book, you should have:

- **Programming experience** in any language
- **TypeScript/JavaScript knowledge** (recommended but not required)
- **Basic understanding of blockchain concepts** (helpful but we'll cover basics)

No prior experience with zero-knowledge proofs or cryptography is required.

## How to Use This Book

We recommend:

1. **Read sequentially** - Chapters build on each other
2. **Type the code** - Don't just copy-paste
3. **Do the exercises** - They reinforce learning
4. **Build the projects** - Apply what you've learned

## Version Information

This book covers:

- **Compact Language:** v0.16 - v0.18
- **Compiler:** compact-v0.3.0
- **Last Updated:** January 2026

Let's begin!
