# Frequently Asked Questions

## How do I test regex in my browser?

Install [Regex Tester Pro](https://chromewebstore.google.com/detail/regex-tester-pro-by-zovo/laljckjnohfcbhmlehjkcppkdfibldad) from the Chrome Web Store and click the extension icon in your toolbar. Type your pattern in the top input and your test string below. Matches are highlighted instantly as you type. You can also right-click selected text on any webpage and choose "Test with Regex Tester" from the context menu.

## Does it support JavaScript/Python/Go regex flavors?

The regex engine runs JavaScript regular expressions natively. The **code export** feature generates ready-to-use code for JavaScript, Python, Java, PHP, Go, Ruby, C#, and Rust with flags automatically translated to each language's syntax. The Pro version adds multi-flavor support with dedicated engines for Python, Go, Java, PCRE, and .NET.

## Can I export regex code to different languages?

Yes. Click the **Export** button after testing your pattern. Supported languages: JavaScript, Python, Java, PHP, Go, Ruby, C#, and Rust. Each export includes correct import statements, flag translations, and idiomatic code for that language.

## Does it work offline?

Yes, completely. Regex Tester Pro makes zero network requests. All matching, explanation, code generation, and ReDoS analysis happen locally in your browser. Your patterns and test data never leave your machine.

## What regex flags are supported?

All six standard JavaScript regex flags:

| Flag | Name | Behavior |
|------|------|----------|
| `g` | Global | Find all matches |
| `i` | Case-insensitive | Ignore letter case |
| `m` | Multiline | `^`/`$` match line boundaries |
| `s` | Dotall | `.` matches newlines |
| `u` | Unicode | Full Unicode support |
| `y` | Sticky | Match at `lastIndex` only |

## How do I test multiline patterns?

Enable the `m` (multiline) flag to make `^` and `$` match line boundaries instead of string boundaries. Use multi-string mode to test your pattern against multiple inputs simultaneously. If you need `.` to match newlines, enable the `s` (dotall) flag as well.

## Does it detect performance issues (ReDoS)?

Yes. The built-in ReDoS safety analyzer scans your pattern for constructs that cause catastrophic backtracking — nested quantifiers like `(a+)+`, overlapping alternations, and quantified groups with optional overlap. A warning explains which part of the pattern is problematic and why.

## Is it open source?

Yes. Fully open source under the MIT license. Source code: [github.com/theluckystrike/regex-tester-chrome-extension](https://github.com/theluckystrike/regex-tester-chrome-extension)

## What browsers are supported?

Google Chrome 88+ and any Chromium-based browser supporting Manifest V3: Microsoft Edge, Brave, Opera, Vivaldi. Firefox is not currently supported.

## What permissions does it need?

Three permissions, each for a specific purpose:

- `storage` — Save pattern history and preferences locally
- `activeTab` — Enable right-click context menu to send selected text to the tester
- `contextMenus` — Register the "Test with Regex Tester" right-click menu item

No data is sent anywhere. All data stays on your machine.

## How do I contribute?

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines. Fork the repo, create a feature branch, make your changes, test in Chrome, and open a pull request.

---

**[Install Regex Tester Pro](https://chromewebstore.google.com/detail/regex-tester-pro-by-zovo/laljckjnohfcbhmlehjkcppkdfibldad)** | **[Report a Bug](https://github.com/theluckystrike/regex-tester-chrome-extension/issues)**
