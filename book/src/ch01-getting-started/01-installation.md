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

## Next Steps

With the compiler installed, let's set up the rest of your development environment.
