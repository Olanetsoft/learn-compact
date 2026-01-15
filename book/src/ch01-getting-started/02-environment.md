# Setting Up Your Environment

Beyond the compiler, you'll need several tools to develop and test Compact contracts.

## Lace Midnight Preview Wallet

The **Lace Midnight Preview** wallet is a browser extension that manages your Midnight accounts and signs transactions. It is currently **only compatible with Google Chrome**.

### Installation

1. Open Google Chrome
2. Install the Lace wallet extension from the Chrome Web Store:
   [https://chromewebstore.google.com/detail/lace-beta/hgeekaiplokcnmakghbdfbgnlfheichg](https://chromewebstore.google.com/detail/lace-beta/hgeekaiplokcnmakghbdfbgnlfheichg)
3. Click **Add to Chrome** and confirm by clicking **Add extension**
4. Pin the extension to your toolbar for easy access (recommended)

### Create Your Wallet

1. Click the Lace wallet icon in your toolbar
2. Select **Create a new wallet**
3. Choose a strong password
4. **Write down your seed phrase** on paper and store it securely offline
5. Confirm your seed phrase to complete setup

> ⚠️ **Warning:** Never store your seed phrase digitally or share it with anyone.

### Getting Test Tokens (tDUST)

tDUST is the token used on the Midnight Testnet. It has no real-world value.

1. In your Lace wallet, click **Receive** and copy your wallet address
2. Go to the Testnet Faucet: [https://midnight.network/test-faucet/](https://midnight.network/test-faucet/)
3. Paste your address into the form and click **Request tDUST**
4. Wait a few minutes for the tokens to arrive

**Verification:** Your Lace wallet shows a new balance of tDUST tokens.

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

### Run the Proof Server

Start the proof server in your terminal:

```bash
docker run -p 6300:6300 midnightnetwork/proof-server -- midnight-proof-server --network testnet
```

This command occupies the terminal window while running.

**Verification:** The terminal displays logs indicating the server is running and listening at `http://localhost:6300`.

> **Tip:** To use a local proof-server with Lace wallet, go to **Settings** → **Midnight** and select `Local (http://localhost:6300)`.

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

The Compact VS Code extension provides syntax highlighting and code snippets.

### Installation

1. Download the VSIX package from the [Compact VS Code extension release page](https://docs.midnight.network/relnotes/vs-code-extension)
2. In VS Code, go to **Extensions** → click `...` menu → **Install from VSIX**
3. Select the downloaded extension file

**Verification:** You now see "Compact Language Support" in your installed VS Code extensions.

### Features

- Syntax highlighting for `.compact` files
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
