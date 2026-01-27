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

**Windows (WSL2):**

1. Download and install Docker Desktop for Windows.
2. In Docker Desktop “Settings” >“General” ensure "Use the WSL 2 based engine" is checked.
3. Go to “Resources” > WSL Integration and enable the toggle for your specific Linux distro (e.g., Ubuntu).
   > Note: If you do not see a distro listed, open PowerShell and run wsl --install -d Ubuntu to create one.

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

> 🎬 <a href="https://github.com/bricktowers/midnight-local-network" target="_blank" rel="noopener noreferrer">Watch the Video Explainer & Demo</a>

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

**Windows Only:** In VS Code, go to Extensions and install the "WSL" extension by Microsoft.

Launch it by typing on WSL Terminal:

```bash
code .
```

You can now add the compact extension to the WSL VS Code

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

## Troubleshooting for Windows (WSL) Users

If you are following this guide on Windows using WSL2 (Ubuntu), you might encounter specific environment issues. Here are the common errors and their solutions.

### 1. Docker & WSL Setup

**Q: Docker says "daemon not running" or "cannot connect to the Docker daemon" inside my terminal.**

**The Issue:** You likely tried to install Docker using the Linux commands (`apt-get install docker.io`). This usually fails on WSL because it lacks a systemd service by default.

**The Fix:**

1. Uninstall the Linux version: `sudo apt-get remove docker docker-engine docker.io`
2. Install **Docker Desktop for Windows** on your host machine.
3. In Docker Desktop Settings > **Resources** > **WSL Integration**, toggle the switch **ON** for your Ubuntu distro.

**Q: Docker Desktop says "You don't have any WSL 2 distros installed."**

**The Fix:** You might be running WSL 1 or have no distro installed.

1. Open PowerShell and run: `wsl --list --verbose`
2. If the version is `1`, upgrade it: `wsl --set-version Ubuntu 2`
3. If no distro is listed, install one: `wsl --install -d Ubuntu`

### 2. VS Code & File Path Issues

**Q: `error opening source file... no such file or directory`**

**The Issue:** You might have created the file in Windows (e.g., VS Code connected to C:) but are trying to run the command from the Linux root folder (`~`). Linux cannot automatically see files on your Windows Desktop unless you navigate to `/mnt/c/...`.

**The Fix:** Connect VS Code directly to WSL:

1. Install the **"WSL"** extension in VS Code.
2. In your Ubuntu terminal, type: `code .`
3. Create the `counter.compact` file inside that new window.

### 3. Compilation & Syntax Errors

**Q: `parse error: found "ledger"` or `unbound identifier Void`**

**The Issue:** You are likely using code examples from an older version of Compact, but you have installed a newer compiler (e.g., v0.26.0+).

**The Fix:** Update your syntax to match the modern standard.

- **Old:** `contract Counter { ledger x: ... }`
- **New:** `export ledger x: ...` (Top-level declarations)
- **Old:** `circuit increment(): Void`
- **New:** `export circuit increment(): []`

**Q: `expected right-hand side of = to have type Uint<32>` (Overflow Protection)**

**The Issue:** Compact is strict about math safety. `x + 1` could technically overflow a 32-bit integer, so the compiler demands you explicitly handle that risk.

**The Fix:** Cast the result explicitly:

```javascript
x = (x + 1) as Uint<32>;
```

## Next Steps

Your environment is ready! Let's write your first Compact contract.
