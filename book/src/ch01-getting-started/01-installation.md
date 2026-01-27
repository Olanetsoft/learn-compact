# Installing the Compact Compiler

The Compact compiler transforms your Compact source code into ZK circuits that can run on the Midnight blockchain.

## Understanding the Tools

Midnight provides two command-line tools:

| Tool       | Purpose                                                          | Status        |
| ---------- | ---------------------------------------------------------------- | ------------- |
| `compact`  | The **Compact CLI** — compiling, project scaffolding, deployment | ✅ Use this   |
| `compactc` | The **Compact compiler** (standalone)                            | ⚠️ Deprecated |

**In practice:**

- Use `compact compile` for compilation: `compact compile contract.compact output/`
- Use `compact` for project management: `compact new`, etc.

> ⚠️ **Important:** The standalone `compactc` command is deprecated. Always use `compact compile` instead.

For the exercises in this book, we'll use `compact compile` for compilation.

## System Requirements

- **Operating System:** macOS, Linux, or Windows (WSL2)
- **Node.js:** v18 or later
- **Docker:** For running the proof server

⚠️ Windows Users: You must use WSL2. PowerShell and Command Prompt are not supported.

## Installation

Windows/WSL Only: you may need to install curl first:

```bash
sudo apt-get update && sudo apt-get install -y curl
```

Other OS: Install the Compact CLI using the official installer script:

```bash
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh
```

This downloads and installs the `compact` CLI, which includes the `compactc` compiler.

### Update Your Shell PATH

The installer usually adds the binary to your PATH automatically. If not, add it manually:

```bash
export PATH="$HOME/.compact/bin:$PATH"
```

Then reload your shell:

```bash
source ~/.zshrc  # or source ~/.bashrc
```

## Verifying Installation

After installation, verify that the tools are working:

```bash
compact --version
```

You should see output similar to:

```
compact 0.3.0
```

Test compilation works:

```bash
compact compile --help
```

## Updating the Compiler

To update to the latest version:

```bash
compact update
```

## Troubleshooting

### Command not found

If you see "command not found", add the Compact binary to your PATH:

```bash
export PATH="$HOME/.compact/bin:$PATH"
```

Add this line to your `~/.bashrc` or `~/.zshrc` to make it permanent.

### Permission denied

If you encounter permission errors:

```bash
chmod +x ~/.compact/bin/compact
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

### 2. Installation & Path Issues

**Q: I installed Compact, but when I type `compact`, it says `command not found`.**

**The Issue:** The installation directory wasn't added to your system's "Path" automatically, or you haven't refreshed your terminal.

**The Fix:** Run this command to activate the tool for your current session:

```bash
source $HOME/.local/bin/env
```

_To make this permanent, add that line to your `~/.bashrc` file._

**Q: I get "Failed to spawn artifact extraction command" when running `compact update`.**

**The Issue:** Your minimal WSL Ubuntu installation is missing standard file helper tools like `unzip`.

**The Fix:** Install the missing dependencies:

```bash
sudo apt-get update && sudo apt-get install -y tar gzip unzip
```

**Q: I get "No default compiler set" or "Failed to run compactc" when compiling.**

**The Issue:** You installed the Compact **Manager** (the CLI), but you haven't downloaded the actual **Compiler** yet.

**The Fix:** Download the latest toolchain:

```bash
compact update
```

Then verify it is set as default: `compact toolchains list`

### 3. Compilation & File Errors

**Q: `error opening source file... no such file or directory`**

**The Issue:** You might have created the file in Windows (e.g., VS Code connected to C:) but are trying to run the command from the Linux root folder (`~`). Linux cannot automatically see files on your Windows Desktop unless you navigate to `/mnt/c/...`.

**The Fix:** Connect VS Code directly to WSL:

1. Install the **"WSL"** extension in VS Code.
2. In your Ubuntu terminal, type: `code .`
3. Create the `counter.compact` file inside that new window.

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

With the compiler installed, let's set up the rest of your development environment.
