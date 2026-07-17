# Installing the Compact Compiler

The Compact compiler transforms your Compact source code into ZK circuits that can run on the Midnight blockchain.

## Understanding the Tools

Midnight provides two command-line tools:

| Tool       | Purpose                                                          | Status        |
| ---------- | ---------------------------------------------------------------- | ------------- |
| `compact`  | The **Compact developer tools** — toolchain management, compiling, formatting | ✅ Use this   |
| `compactc` | The **Compact compiler** (standalone)                            | ⚠️ Deprecated |

**In practice:**

- Use `compact compile` for compilation: `compact compile contract.compact output/`
- Use `compact update` / `compact check` to manage toolchain versions, `compact format` to format code, and `compact self check` to update the devtools themselves (run `compact --help` for the full list — there is no scaffolding subcommand; new projects are created with `npx create-mn-app`)

> ⚠️ **Important:** The standalone `compactc` command is deprecated. Always use `compact compile` instead.

For the exercises in this book, we'll use `compact compile` for compilation.

## System Requirements

- **Operating System:** macOS or Linux (Windows via WSL2)
- **Node.js:** v22 or later
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
compact 0.5.1
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

### WSL-Specific Issues

For Windows users on WSL2, see the comprehensive [troubleshooting guide in the Environment Setup chapter](02-environment.md#troubleshooting-for-windows-wsl-users).

## Next Steps

With the compiler installed, let's set up the rest of your development environment.
