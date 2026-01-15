# Setting Up Your Environment

Beyond the compiler, you'll need several tools to develop and test Compact contracts.

## Lace Wallet

The Lace wallet is a browser extension that manages your Midnight accounts and signs transactions.

### Installation

1. Open Chrome or a Chromium-based browser
2. Visit the [Chrome Web Store](https://chrome.google.com/webstore)
3. Search for "Lace Wallet"
4. Click "Add to Chrome"
5. Follow the setup wizard to create a wallet

### Getting Test Tokens (tDUST)

To deploy and interact with contracts on the testnet, you need test tokens:

1. Open Lace wallet
2. Switch to Midnight testnet network
3. Copy your wallet address
4. Visit the [Midnight Faucet](https://faucet.testnet.midnight.network)
5. Paste your address and request tDUST

> **Note:** Test tokens have no real value and are only for development purposes.

## Docker Setup

The proof server runs in Docker and generates zero-knowledge proofs for your transactions.

### Install Docker

If you don't have Docker installed:

**macOS:**

```bash
brew install --cask docker
```

**Linux (Ubuntu/Debian):**

```bash
sudo apt-get update
sudo apt-get install docker.io docker-compose
sudo usermod -aG docker $USER
```

### Verify Docker

```bash
docker --version
docker compose version
```

### Pull the Proof Server Image

```bash
docker pull midnightnetwork/proof-server:latest
```

## VS Code Extension

The Compact VS Code extension provides syntax highlighting and basic language support.

### Installation

1. Open VS Code
2. Go to Extensions (Cmd+Shift+X / Ctrl+Shift+X)
3. Search for "Compact Language"
4. Install the extension

### Features

- Syntax highlighting for `.compact` files
- Basic error checking
- Code snippets for common patterns

## Project Structure

Create a new directory for your Compact projects:

```bash
mkdir ~/compact-projects
cd ~/compact-projects
```

A typical project structure looks like:

```
my-project/
├── contract/
│   └── src/
│       └── contract.compact
├── cli/
│   ├── src/
│   │   └── index.ts
│   └── package.json
└── README.md
```

## Next Steps

Your environment is ready! Let's write your first Compact contract.
