/**
 * Compact Playground - Interactive code blocks for mdBook
 *
 * This script adds "Run" buttons to Compact code blocks and displays
 * compilation results inline below the code.
 *
 * Usage:
 * 1. Add this script to your mdBook's additional-js
 * 2. Configure the API URL below or via data attribute
 * 3. Code blocks with language "compact" will get run buttons
 */

(function () {
  "use strict";

  // Configuration - Update this to your deployed API URL
  const DEFAULT_API_URL =
    window.COMPACT_PLAYGROUND_API_URL ||
    document.currentScript?.dataset?.apiUrl ||
    "https://compact-playground.onrender.com";

  // Icons as SVG strings
  const ICONS = {
    play: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    loading:
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></path></svg>',
    success:
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>',
    error:
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
    copy: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    toastSuccess:
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>',
    toastError:
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    toastClose:
      '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  };

  class CompactPlayground {
    constructor(options = {}) {
      this.apiUrl = options.apiUrl || DEFAULT_API_URL;
      this.selector =
        options.selector ||
        "code.language-compact, code.hljs.language-compact, pre code.language-compact";
      this.editable = options.editable !== false;
      this.autoRun = options.autoRun || false;
      this.codeBlocks = new Map();
    }

    /**
     * Initialize the playground - find and enhance all Compact code blocks
     */
    init() {
      // Create toast container if it doesn't exist
      this.initToastContainer();

      const codeElements = document.querySelectorAll(this.selector);

      if (codeElements.length === 0) {
        return;
      }

      codeElements.forEach((codeEl, index) => {
        this.enhanceCodeBlock(codeEl, index);
      });
    }

    /**
     * Initialize the toast notification container
     */
    initToastContainer() {
      if (!document.querySelector(".compact-toast-container")) {
        const toastContainer = document.createElement("div");
        toastContainer.className = "compact-toast-container";
        document.body.appendChild(toastContainer);
      }
    }

    /**
     * Show a toast notification
     */
    showToast(type, title, message, duration = 4000) {
      const container = document.querySelector(".compact-toast-container");
      if (!container) return;

      const toast = document.createElement("div");
      toast.className = `compact-toast ${type}`;

      const icon = type === "success" ? ICONS.toastSuccess : ICONS.toastError;

      toast.innerHTML = `
        <div class="compact-toast-icon">${icon}</div>
        <div class="compact-toast-content">
          <div class="compact-toast-title">${title}</div>
          <div class="compact-toast-message">${message}</div>
        </div>
        <button class="compact-toast-close" aria-label="Close notification">
          ${ICONS.toastClose}
        </button>
        <div class="compact-toast-progress"></div>
      `;

      // Close button handler
      const closeBtn = toast.querySelector(".compact-toast-close");
      closeBtn.addEventListener("click", () => this.dismissToast(toast));

      container.appendChild(toast);

      // Trigger animation
      requestAnimationFrame(() => {
        toast.classList.add("show");
      });

      // Auto dismiss
      setTimeout(() => {
        this.dismissToast(toast);
      }, duration);

      return toast;
    }

    /**
     * Dismiss a toast notification
     */
    dismissToast(toast) {
      if (!toast || toast.classList.contains("hide")) return;

      toast.classList.remove("show");
      toast.classList.add("hide");

      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 400);
    }

    /**
     * Enhance a code block with run button and output container
     */
    enhanceCodeBlock(codeEl, index) {
      // Find the parent pre element
      const preEl = codeEl.closest("pre");
      if (!preEl) return;

      // Skip if already enhanced
      if (preEl.classList.contains("compact-playground-enhanced")) return;
      preEl.classList.add("compact-playground-enhanced");

      // Trim trailing whitespace/newlines from the code element
      const originalText = codeEl.textContent || "";
      const trimmedText = originalText.trimEnd();
      if (originalText !== trimmedText) {
        codeEl.textContent = trimmedText;
      }

      // Get the code and check if it's runnable
      const code = trimmedText;
      const isRunnable = this.isCompleteProgram(code);

      // Create a wrapper for the entire playground
      const wrapper = document.createElement("div");
      wrapper.className = "compact-playground-wrapper";
      if (!isRunnable) {
        wrapper.classList.add("snippet-only");
      }

      // Create toolbar
      const toolbar = document.createElement("div");
      toolbar.className = "compact-playground-toolbar";

      let runButton = null;

      // Only add Run button if code is a complete program
      if (isRunnable) {
        runButton = document.createElement("button");
        runButton.className = "compact-playground-btn compact-playground-run";
        runButton.innerHTML = `${ICONS.play} <span>Run</span>`;
        runButton.title = "Compile and run (Ctrl+Enter)";
        runButton.setAttribute("aria-label", "Run code");
        toolbar.appendChild(runButton);
      }

      // Copy button (always available)
      const copyButton = document.createElement("button");
      copyButton.className = "compact-playground-btn compact-playground-copy";
      copyButton.innerHTML = `${ICONS.copy} <span>Copy</span>`;
      copyButton.title = "Copy code to clipboard";
      copyButton.setAttribute("aria-label", "Copy code");
      toolbar.appendChild(copyButton);

      // Add "Editable" indicator for runnable code blocks
      if (isRunnable) {
        const editableIndicator = document.createElement("span");
        editableIndicator.className = "compact-editable-indicator";
        editableIndicator.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Editable`;
        editableIndicator.title = "You can edit this code and run it";
        toolbar.appendChild(editableIndicator);
      }

      // Create output container (only if runnable)
      let outputContainer = null;
      if (isRunnable) {
        outputContainer = document.createElement("div");
        outputContainer.className = "compact-output";
        outputContainer.style.display = "none";
      }

      // Wrap the pre element
      preEl.parentNode.insertBefore(wrapper, preEl);
      wrapper.appendChild(toolbar);
      wrapper.appendChild(preEl);
      if (outputContainer) {
        wrapper.appendChild(outputContainer);
      }

      // Apply syntax highlighting BEFORE making editable
      try {
        if (
          typeof hljs !== "undefined" &&
          typeof hljs.highlightElement === "function"
        ) {
          hljs.highlightElement(codeEl);
        }
      } catch (e) {
        console.warn("Highlighting failed:", e);
      }

      // Make code editable if enabled and runnable
      if (this.editable && isRunnable) {
        codeEl.setAttribute("contenteditable", "true");
        codeEl.setAttribute("spellcheck", "false");
        codeEl.classList.add("compact-editable");

        // Handle Tab key for indentation
        codeEl.addEventListener("keydown", (e) => {
          if (e.key === "Tab") {
            e.preventDefault();
            document.execCommand("insertText", false, "  ");
          }
          // Ctrl+Enter to run
          if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            this.runCode(codeEl, outputContainer, runButton);
          }
        });

        // Re-highlight on blur (when user finishes editing)
        codeEl.addEventListener("blur", () => {
          try {
            if (
              typeof hljs !== "undefined" &&
              typeof hljs.highlightElement === "function"
            ) {
              const plainCode = codeEl.textContent;
              codeEl.textContent = plainCode;
              codeEl.classList.remove("hljs");
              hljs.highlightElement(codeEl);
            }
          } catch (e) {
            console.warn("Re-highlighting failed:", e);
          }
        });
      }

      // Store reference
      this.codeBlocks.set(index, {
        codeEl,
        outputContainer,
        runButton,
        isRunnable,
      });

      // Event listeners
      if (runButton) {
        runButton.addEventListener("click", () => {
          this.runCode(codeEl, outputContainer, runButton);
        });
      }

      copyButton.addEventListener("click", () => {
        this.copyCode(codeEl, copyButton);
      });

      // Auto-run if enabled and runnable
      if (this.autoRun && isRunnable) {
        this.runCode(codeEl, outputContainer, runButton);
      }
    }

    /**
     * Get the code from a code element, stripping line numbers added by mdBook
     */
    getCode(codeEl) {
      let code = codeEl.textContent || "";
      // Remove line numbers that mdBook adds (sequences of digits at the start)
      code = code.replace(/^[\d]+/, "");
      return code;
    }

    /**
     * Remove comments and line numbers from code to check the actual structure
     */
    stripComments(code) {
      // Remove line numbers that mdBook adds (sequences of digits at the start)
      // Line numbers appear as "123456789101112..." concatenated at the beginning
      let stripped = code.replace(/^[\d]+/, "");
      // Remove single-line comments
      stripped = stripped.replace(/\/\/.*$/gm, "");
      // Remove multi-line comments
      stripped = stripped.replace(/\/\*[\s\S]*?\*\//g, "");
      return stripped.trim();
    }

    /**
     * Check if code is a complete Compact program that can be compiled standalone
     * A complete program starts with pragma or has a module/contract declaration
     * We strip comments and line numbers first to check the actual code structure
     */
    isCompleteProgram(code) {
      const stripped = this.stripComments(code);
      return (
        stripped.startsWith("pragma") ||
        /^\s*(export\s+)?(module|contract)\s+/m.test(stripped)
      );
    }

    /**
     * Run the code and display results
     */
    async runCode(codeEl, outputContainer, runButton) {
      const code = this.getCode(codeEl);

      if (!code.trim()) {
        this.showOutput(outputContainer, {
          success: false,
          error: "No code to compile",
        });
        this.showToast("error", "Cannot Compile", "No code to compile");
        return;
      }

      // Update UI to loading state
      runButton.disabled = true;
      runButton.innerHTML = `${ICONS.loading} <span>Compiling...</span>`;
      runButton.classList.add("loading");
      outputContainer.style.display = "block";
      outputContainer.className = "compact-output loading";
      outputContainer.innerHTML =
        '<div class="compact-output-message">Compiling...</div>';

      try {
        const result = await this.compile(code);
        this.showOutput(outputContainer, result);

        // Show toast notification based on result
        if (result.success) {
          const timeMsg = result.executionTime
            ? `Compiled in ${result.executionTime}ms`
            : "Your code is valid!";
          this.showToast("success", "Compilation Successful! ✨", timeMsg);
        } else {
          const errorCount = result.errors?.length || 1;
          const errorMsg =
            errorCount === 1
              ? "Found 1 error in your code"
              : `Found ${errorCount} errors in your code`;
          this.showToast("error", "Compilation Failed", errorMsg);
        }
      } catch (error) {
        this.showOutput(outputContainer, {
          success: false,
          error: "Network error",
          message: error.message || "Failed to connect to compilation server",
        });
        this.showToast(
          "error",
          "Connection Error",
          "Failed to connect to server"
        );
      } finally {
        // Reset button state
        runButton.disabled = false;
        runButton.innerHTML = `${ICONS.play} <span>Run</span>`;
        runButton.classList.remove("loading");
      }
    }

    /**
     * Copy code to clipboard
     */
    async copyCode(codeEl, copyButton) {
      const code = this.getCode(codeEl);

      try {
        await navigator.clipboard.writeText(code);
        const originalHTML = copyButton.innerHTML;
        copyButton.innerHTML = `${ICONS.success} <span>Copied!</span>`;
        copyButton.classList.add("success");

        setTimeout(() => {
          copyButton.innerHTML = originalHTML;
          copyButton.classList.remove("success");
        }, 2000);
      } catch (err) {
        console.error("Failed to copy code:", err);
      }
    }

    /**
     * Compile code via API
     */
    async compile(code) {
      const response = await fetch(`${this.apiUrl}/compile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          options: {
            wrapWithDefaults: true,
            skipZk: true,
          },
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server error: ${response.status} - ${text}`);
      }

      return response.json();
    }

    /**
     * Display compilation results
     */
    showOutput(container, result) {
      container.style.display = "block";

      if (result.success) {
        container.className = "compact-output success";
        let html = `
          <div class="compact-output-header">
            ${ICONS.success}
            <span>Compilation Successful</span>
          </div>
        `;

        if (result.warnings && result.warnings.length > 0) {
          html += '<div class="compact-output-warnings">';
          html += "<strong>Warnings:</strong>";
          html += "<ul>";
          result.warnings.forEach((warning) => {
            html += `<li>${this.formatError(warning)}</li>`;
          });
          html += "</ul></div>";
        }

        if (result.executionTime) {
          html += `<div class="compact-output-meta">Compiled in ${result.executionTime}ms</div>`;
        }

        container.innerHTML = html;
      } else {
        container.className = "compact-output error";
        let html = `
          <div class="compact-output-header">
            ${ICONS.error}
            <span>Compilation Failed</span>
          </div>
        `;

        if (result.errors && result.errors.length > 0) {
          html += '<div class="compact-output-errors">';
          result.errors.forEach((error) => {
            html += `<div class="compact-error-item">${this.formatError(
              error
            )}</div>`;
          });
          html += "</div>";
        } else if (result.message) {
          html += `<div class="compact-output-message">${this.escapeHtml(
            result.message
          )}</div>`;
        } else if (result.error) {
          html += `<div class="compact-output-message">${this.escapeHtml(
            result.error
          )}</div>`;
        }

        container.innerHTML = html;
      }
    }

    /**
     * Format a single error for display
     */
    formatError(error) {
      let text = "";

      if (error.line) {
        text += `<span class="compact-error-location">Line ${error.line}`;
        if (error.column) {
          text += `:${error.column}`;
        }
        text += "</span> ";
      }

      text += `<span class="compact-error-message">${this.escapeHtml(
        error.message
      )}</span>`;

      return text;
    }

    /**
     * Escape HTML entities
     */
    escapeHtml(text) {
      const div = document.createElement("div");
      div.textContent = text;
      return div.innerHTML;
    }
  }

  // Auto-initialize on page load
  function initPlayground() {
    // Get configuration from script tag or global
    const scriptTag =
      document.currentScript ||
      document.querySelector('script[src*="compact-playground"]');
    const config = {
      apiUrl:
        scriptTag?.dataset?.apiUrl ||
        window.COMPACT_PLAYGROUND_API_URL ||
        DEFAULT_API_URL,
      editable: scriptTag?.dataset?.editable !== "false",
      autoRun: scriptTag?.dataset?.autoRun === "true",
    };

    const playground = new CompactPlayground(config);
    playground.init();

    // Expose globally for programmatic access
    window.CompactPlayground = CompactPlayground;
    window.compactPlayground = playground;
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPlayground);
  } else {
    // DOM already loaded (script loaded with defer or at end of body)
    initPlayground();
  }
})();
