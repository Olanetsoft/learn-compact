/**
 * Compact Language Definition for highlight.js
 *
 * This provides syntax highlighting for Compact smart contract code blocks.
 */

(function () {
  "use strict";

  // Define the Compact language for highlight.js
  function compactLanguage(hljs) {
    const KEYWORDS = {
      keyword: [
        "pragma",
        "language_version",
        "import",
        "export",
        "from",
        "module",
        "contract",
        "circuit",
        "pure",
        "witness",
        "ledger",
        "sealed",
        "struct",
        "enum",
        "type",
        "const",
        "let",
        "if",
        "else",
        "for",
        "of",
        "in",
        "return",
        "assert",
        "disclose",
        "as",
        "true",
        "false",
        "some",
        "none",
        "left",
        "right",
      ],
      type: [
        "Boolean",
        "Field",
        "Uint",
        "Bytes",
        "Vector",
        "Map",
        "Set",
        "Maybe",
        "Either",
        "Counter",
        "MerkleTree",
        "Void",
      ],
      built_in: [
        "fold",
        "map",
        "filter",
        "hash",
        "persistentHash",
        "transientHash",
        "transientCommit",
        "lookup",
        "member",
        "insert",
        "remove",
        "insertDefault",
        "is_some",
        "is_none",
        "is_left",
        "is_right",
        "value",
        "size",
        "pad",
        "slice",
        "CompactStandardLibrary",
      ],
      literal: ["true", "false"],
    };

    const TYPES = {
      className: "type",
      begin:
        /\b(Boolean|Field|Uint|Bytes|Vector|Map|Set|Maybe|Either|Counter|MerkleTree|Void)\b/,
      relevance: 0,
    };

    const GENERIC_TYPE = {
      className: "type",
      begin: /\b[A-Z][a-zA-Z0-9_]*\s*</,
      end: />/,
      contains: [
        {
          className: "number",
          begin: /\d+/,
        },
        {
          className: "type",
          begin: /[A-Z][a-zA-Z0-9_]*/,
        },
      ],
    };

    const NUMBERS = {
      className: "number",
      variants: [
        { begin: /\b0x[0-9a-fA-F]+\b/ }, // hex
        { begin: /\b\d+\b/ }, // decimal
      ],
      relevance: 0,
    };

    const STRINGS = {
      className: "string",
      variants: [
        { begin: /"/, end: /"/, contains: [{ begin: /\\./ }] },
        { begin: /'/, end: /'/, contains: [{ begin: /\\./ }] },
      ],
    };

    const COMMENTS = {
      className: "comment",
      variants: [
        { begin: /\/\//, end: /$/ },
        { begin: /\/\*/, end: /\*\// },
      ],
    };

    const PRAGMA = {
      className: "meta",
      begin: /pragma\s+language_version/,
      end: /;/,
      contains: [
        {
          className: "number",
          begin: /\d+\.\d+/,
        },
        {
          className: "keyword",
          begin: />=|<=|&&|\|\|/,
        },
      ],
    };

    const FUNCTION_DEF = {
      className: "function",
      beginKeywords: "circuit witness pure",
      end: /[{;]/,
      excludeEnd: true,
      contains: [
        {
          className: "title function_",
          begin: /[a-zA-Z_][a-zA-Z0-9_]*/,
        },
        {
          className: "params",
          begin: /\(/,
          end: /\)/,
          contains: [
            TYPES,
            NUMBERS,
            {
              className: "variable",
              begin: /[a-zA-Z_][a-zA-Z0-9_]*/,
            },
          ],
        },
        {
          className: "type",
          begin: /:\s*/,
          end: /[{;]/,
          excludeEnd: true,
          contains: [TYPES, GENERIC_TYPE],
        },
      ],
    };

    const STRUCT_DEF = {
      className: "class",
      beginKeywords: "struct enum",
      end: /\{/,
      excludeEnd: true,
      contains: [
        {
          className: "title class_",
          begin: /[A-Z][a-zA-Z0-9_]*/,
        },
      ],
    };

    const LEDGER_DEF = {
      className: "variable",
      begin: /\b(ledger|sealed\s+ledger)\s+/,
      end: /[:;]/,
      excludeEnd: true,
      contains: [
        {
          className: "variable",
          begin: /[a-zA-Z_][a-zA-Z0-9_]*/,
        },
      ],
    };

    return {
      name: "Compact",
      aliases: ["compact"],
      keywords: KEYWORDS,
      contains: [
        COMMENTS,
        PRAGMA,
        FUNCTION_DEF,
        STRUCT_DEF,
        LEDGER_DEF,
        TYPES,
        GENERIC_TYPE,
        NUMBERS,
        STRINGS,
        {
          className: "keyword",
          begin:
            /\b(export|import|from|as|const|return|if|else|for|of|assert|disclose)\b/,
        },
        {
          className: "built_in",
          begin:
            /\b(fold|map|filter|hash|persistentHash|transientHash|lookup|member|insert|remove|some|none|left|right)\b/,
        },
        {
          // Enum values: EnumName.Value
          className: "variable.constant",
          begin: /\b[A-Z][a-zA-Z0-9_]*\.[A-Z][a-zA-Z0-9_]*/,
        },
      ],
      illegal: /<\//,
    };
  }

  // Register the language when highlight.js is available
  function registerCompact() {
    if (typeof hljs !== "undefined") {
      try {
        hljs.registerLanguage("compact", compactLanguage);
      } catch (e) {
        console.warn("Failed to register compact language:", e);
      }
    }
  }

  // Export function for playground to call after setup
  window.highlightCompactCode = function () {
    if (typeof hljs === "undefined") return;
    document
      .querySelectorAll("code.language-compact:not(.hljs)")
      .forEach(function (block) {
        try {
          hljs.highlightElement(block);
        } catch (e) {
          // ignore
        }
      });
  };

  // Try to register immediately, and also on DOMContentLoaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", registerCompact);
  } else {
    // DOM already loaded, but hljs might load later
    registerCompact();
    // Also try again after a short delay (for async script loading)
    setTimeout(registerCompact, 100);
    setTimeout(registerCompact, 500);
  }
})();
