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

## Local Development Network (Recommended)

For local development without relying on public testnets, the community has created **midnight-local-network** — a self-contained local Midnight node with wallet funding capabilities.

> 🎬 [Watch the Video Explainer & Demo](https://github.com/bricktowers/midnight-local-network)

### Why Use a Local Network?

Public testnets can be:

- Unavailable or undergoing maintenance
- Rate-limited
- Unstable for automated tests
- Unsuitable for offline workflows

A local network gives you:

- ✅ Fully isolated, predictable environment
- ✅ No dependence on faucets
- ✅ Perfect for CI/CD pipelines
- ✅ Works offline

### Quick Setup

```bash
# Clone the repository
git clone git@github.com:bricktowers/midnight-local-network.git
cd midnight-local-network

# Use Node 22+
nvm install 22
nvm use 22

# Install dependencies
yarn install

# Start the local network
docker compose up -d
```

### Connect Lace Wallet to Local Network

1. Open **Lace Wallet Settings** → **Midnight**
2. Switch network to **"Undeployed"**
3. Save and switch to the local network

### Fund Your Wallet

The local network includes a funding script (no faucet needed!):

```bash
# Fund using your wallet's mnemonic (funds both shielded + unshielded)
yarn fund "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"

# Or fund a specific shielded address
yarn fund mn_shield-addr_undeployed1q....

# Or fund a specific unshielded address
yarn fund mn_addr_undeployed1q....
```

### Local Network Ports

| Service      | Port |
| ------------ | ---- |
| Proof Server | 6300 |
| Node         | 9944 |
| Indexer      | 8088 |

### Configure Your dApp for Local Network

If using CLI tooling instead of the dApp connector:

```typescript
export class LocalNetworkConfig implements Config {
  indexer = "http://127.0.0.1:8088/api/v1/graphql";
  indexerWS = "ws://127.0.0.1:8088/api/v1/graphql/ws";
  node = "http://127.0.0.1:9944";
  proofServer = "http://127.0.0.1:6300";

  setNetworkId() {
    setNetworkId(NetworkId.Undeployed);
  }
}
```

> **Credits:** [bricktowers/midnight-local-network](https://github.com/bricktowers/midnight-local-network) is a community contribution by Brick Towers.

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
