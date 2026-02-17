# Frequently Asked Questions

## How do I test regex in my browser?

Install [Regex Tester Pro](https://chromewebstore.google.com/detail/regex-tester-pro-by-zovo/laljckjnohfcbhmlehjkcppkdfibldad) from the Chrome Web Store, then click the extension icon in your toolbar. Type your regex pattern in the top input field and your test string below it. Matches are highlighted instantly as you type — no "Run" button, no page to navigate to. You can also right-click any selected text on a webpage and choose "Test with Regex Tester" from the context menu.

---

## Does it support JavaScript/Python/Go regex flavors?

The regex engine itself runs JavaScript regular expressions (since it executes in the browser). However, Regex Tester Pro's **code export** feature generates ready-to-use code for eight languages — JavaScript, Python, Java, PHP, Go, Ruby, C#, and Rust — with flags automatically translated to each language's syntax.

For example, the JavaScript `i` flag becomes `re.IGNORECASE` in Python, `(?i)` inline in Go, and `RegexOptions.IgnoreCase` in C#. The Pro version adds multi-flavor regex support with dedicated engines for Python, Go, Java, PCRE, and .NET, so you can test patterns against those specific regex engines.

---

## Can I export regex code to different languages?

Yes. After writing and testing your pattern, click the **Export** button. You can generate code for:

- **JavaScript** — `new RegExp()` or literal syntax
- **Python** — `re.compile()` with translated flags
- **Java** — `Pattern.compile()` with `Pattern.*` flag constants
- **PHP** — `preg_match()` with PCRE delimiters and modifiers
- **Go** — `regexp.Compile()` (or `regexp.MustCompile()`)
- **Ruby** — `Regexp.new()` with modifier flags
- **C#** — `new Regex()` with `RegexOptions` enum
- **Rust** — `regex::Regex::new()` with inline flags

Each export includes the correct import statements and flag translations. You can copy the generated code directly into your project.

---

## Does it work offline?

Yes, completely. Regex Tester Pro makes **zero network requests**. All regex matching, pattern explanation, code generation, and ReDoS analysis happen locally in your browser using JavaScript. You can use it on an airplane, in a restricted network, or with your internet disconnected. This is also a privacy advantage — your patterns and test data never leave your machine.

---

## What regex flags are supported?

All six standard JavaScript regex flags are supported and can be toggled with a single click:

| Flag | Name | Behavior |
|------|------|----------|
| `g` | Global | Find all matches instead of stopping at the first |
| `i` | Case-insensitive | Match uppercase and lowercase letters interchangeably |
| `m` | Multiline | Make `^` and `$` match the start and end of each line, not just the whole string |
| `s` | Dotall | Make `.` match newline characters (`\n`) as well |
| `u` | Unicode | Enable full Unicode matching (surrogate pairs, Unicode property escapes) |
| `y` | Sticky | Match only from the `lastIndex` position |

Click the flag buttons above the pattern input to toggle them on or off. Active flags are visually highlighted.

---

## How do I test multiline patterns?

Two things to keep in mind for multiline testing:

1. **Enable the `m` flag** — Click the `m` flag button to make `^` and `$` match the start/end of each line within your test string, not just the entire string.

2. **Use multi-string mode** — Toggle multi-string testing to enter multiple test strings, one per line. The extension shows a pass/fail result for each line against your pattern.

For example, to match lines that start with a date:
```
Pattern: ^\d{4}-\d{2}-\d{2}
Flags: g, m
Test string:
2024-01-15 Server started
Error: connection refused
2024-01-15 Server recovered
```

With the `m` flag enabled, lines 1 and 3 will match.

If you also want `.` to match newline characters (for patterns that span lines), enable the `s` (dotall) flag as well.

---

## Does it detect performance issues (ReDoS)?

Yes. Regex Tester Pro includes a **ReDoS safety analyzer** that scans your pattern for constructs that can cause catastrophic backtracking — a class of denial-of-service vulnerability where a malicious input causes the regex engine to take exponential time.

The analyzer checks for common danger signals such as:

- Nested quantifiers (e.g., `(a+)+`)
- Overlapping alternations (e.g., `(a|a)+`)
- Quantified groups with optional overlap

When a potential ReDoS risk is detected, a warning appears with an explanation of which part of the pattern is problematic and why. This is especially useful if you are writing regex for server-side input validation, where a ReDoS vulnerability could be exploited by an attacker.

---

## Is it open source?

Yes. Regex Tester Pro is fully open source under the **MIT license**. The complete source code is available at:

**[github.com/theluckystrike/regex-tester-chrome-extension](https://github.com/theluckystrike/regex-tester-chrome-extension)**

You can inspect every line of code, verify that no data is being collected, fork it, and contribute improvements. See the [Contributing Guide](https://github.com/theluckystrike/regex-tester-chrome-extension/blob/main/CONTRIBUTING.md) for how to get involved.

---

[Back to Home](Home) | [Installation Guide](Installation-Guide) | [Troubleshooting](Troubleshooting)
