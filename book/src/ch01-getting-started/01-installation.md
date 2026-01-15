# Installing the Compact Compiler

The Compact compiler transforms your Compact source code into ZK circuits that can run on the Midnight blockchain.

## System Requirements

- **Operating System:** macOS, Linux, or Windows (WSL2)
- **Node.js:** v18 or later
- **Docker:** For running the proof server

## Installation

Install the Compact compiler using the following command:

```bash
curl -fsSL https://get.midnight.network | bash
```

This will download and install the latest version of the Compact compiler.

## Verifying Installation

After installation, verify that the compiler is working:

```bash
compactc --version
```

You should see output similar to:

```
compact-v0.3.0
```

## Updating the Compiler

To update to the latest version:

```bash
curl -fsSL https://get.midnight.network | bash
```

The installer will detect an existing installation and update it.

## Troubleshooting

### Command not found

If you see "command not found", add the Compact binary to your PATH:

```bash
export PATH="$HOME/.midnight/bin:$PATH"
```

Add this line to your `~/.bashrc` or `~/.zshrc` to make it permanent.

### Permission denied

If you encounter permission errors:

```bash
chmod +x ~/.midnight/bin/compactc
```

## Next Steps

With the compiler installed, let's set up the rest of your development environment.
