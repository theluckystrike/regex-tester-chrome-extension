# Regex Tester -- Free Open Source Chrome Extension

> Test, debug, and master regular expressions directly in your browser. Real-time match highlighting, code export for JavaScript, Python, Go and 5 more languages, pattern explanation, and 40+ built-in examples.

<p align="center">
  <a href="https://chromewebstore.google.com/detail/regex-tester-pro-by-zovo/laljckjnohfcbhmlehjkcppkdfibldad"><img src="https://img.shields.io/chrome-web-store/users/laljckjnohfcbhmlehjkcppkdfibldad?label=Chrome%20Web%20Store%20Users&color=blue" alt="Chrome Web Store Users"></a>
  <a href="https://chromewebstore.google.com/detail/regex-tester-pro-by-zovo/laljckjnohfcbhmlehjkcppkdfibldad"><img src="https://img.shields.io/chrome-web-store/rating/laljckjnohfcbhmlehjkcppkdfibldad?label=Rating&color=gold" alt="Chrome Web Store Rating"></a>
  <img src="https://img.shields.io/github/license/theluckystrike/regex-tester-chrome-extension" alt="License">
  <img src="https://img.shields.io/github/last-commit/theluckystrike/regex-tester-chrome-extension" alt="Last Commit">
</p>

<p align="center">
  <a href="https://chromewebstore.google.com/detail/regex-tester-pro-by-zovo/laljckjnohfcbhmlehjkcppkdfibldad"><strong>Install from Chrome Web Store</strong></a>
</p>

---

## Why Regex Tester?

Regular expressions are powerful but notoriously difficult to get right. Most developers bounce between their editor and regex101.com to test patterns. What if you could test regex right in your browser, without switching tabs?

**Regex Tester** brings professional regex debugging to your browser toolbar. Write a pattern, see matches highlighted in real-time, test against multiple strings, and export working code for your language of choice. All without leaving Chrome.

Free, open source, and built on Manifest V3. No accounts needed. No data sent anywhere. Just a fast, reliable regex tool that lives in your toolbar.

## Features

- **Real-time match highlighting** -- See matches instantly as you type your pattern. No "Run" button needed. Every keystroke updates the results.
- **All regex flags supported** -- Toggle global (`g`), case-insensitive (`i`), multiline (`m`), dotall (`s`), unicode (`u`), and sticky (`y`) flags with one click.
- **Capture group extraction** -- See named groups (`(?<name>...)`) and numbered groups extracted and displayed with clear labels.
- **Find & Replace with live preview** -- Preview regex substitutions in real-time. Supports backreferences like `$1`, `$2` for captured groups.
- **Code export to 8 languages** -- Generate ready-to-use regex code for JavaScript, Python, Java, PHP, Go, Ruby, C#, and Rust. Flags are translated automatically.
- **Pattern explainer** -- Get a plain-English breakdown of every token in your regex. Understand complex patterns at a glance.
- **ReDoS safety analyzer** -- Detect dangerous patterns that could cause catastrophic backtracking. Get warnings before shipping unsafe regex to production.
- **40+ curated examples** -- Browse regex samples across 8 categories: Basics, Validation, Extraction, Advanced, Web Dev, Data & Logs, International, and Replace.
- **Quick insert palette** -- Click-to-insert regex building blocks (character classes, quantifiers, anchors, groups, lookarounds) at your cursor position.
- **Multi-string test mode** -- Test your pattern against multiple strings simultaneously. See pass/fail results for each line.
- **Pattern history** -- Save patterns for later. Recall any saved pattern with one click.
- **Built-in cheat sheet** -- Full regex quick reference always one click away. Characters, quantifiers, anchors, groups, flags, and keyboard shortcuts.
- **Right-click context menu** -- Select text on any webpage, right-click, and test it with Regex Tester instantly.
- **Dark mode** -- Automatic system preference detection, plus manual light/dark toggle.
- **Keyboard shortcuts** -- `Ctrl+E` for examples, `Ctrl+S` to save, `Ctrl+H` for history, `Esc` to close panels.
- **Share patterns** -- Copy your pattern as a JSON snippet to share with teammates.
- **Works completely offline** -- Zero network requests. All processing happens locally in your browser.

## Install

### Chrome Web Store (Recommended)

**[Install Regex Tester Pro from the Chrome Web Store](https://chromewebstore.google.com/detail/regex-tester-pro-by-zovo/laljckjnohfcbhmlehjkcppkdfibldad)**

### Manual Install (Developer)

1. Clone or download this repository:
   ```bash
   git clone https://github.com/theluckystrike/regex-tester-chrome-extension.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** (toggle in the top right)
4. Click **Load unpacked**
5. Select the cloned repository folder
6. The extension icon will appear in your toolbar. Click it to open.

## Privacy & Security

Regex Tester Pro is built with privacy as a core principle:

- **No data collection** -- We do not track, collect, or transmit any user data
- **No external requests** -- All regex processing happens locally in your browser
- **No third-party scripts** -- Zero external dependencies at runtime
- **Manifest V3** -- Built on Chrome's latest and most secure extension platform
- **Minimal permissions** -- Only `storage`, `activeTab`, and `contextMenus`
- **Strict CSP** -- Content Security Policy prevents code injection
- **Open source** -- Full source code available for audit

## Comparison

| Feature | Regex Tester (Zovo) | Regex101 Extension | RegExr | Regex Pal |
|---------|--------------------|--------------------|--------|-----------|
| Open Source | Yes | No | Yes | No |
| Works Offline | Yes | No | No | No |
| Chrome Extension | Yes | Yes | No | No |
| Code Export (8 languages) | Yes | Yes | No | No |
| Pattern Explainer | Yes | Yes | No | No |
| ReDoS Safety Check | Yes | No | No | No |
| Quick Insert Palette | Yes | No | Yes | No |
| Multi-String Testing | Yes | No | No | No |
| No Account Required | Yes | No | Yes | Yes |
| Dark Mode | Yes | No | No | No |
| Right-Click Integration | Yes | No | No | No |

## Pro Version

Want even more power? **[Regex Tester Pro](https://chromewebstore.google.com/detail/regex-tester-pro-by-zovo/laljckjnohfcbhmlehjkcppkdfibldad)** includes:

- Unlimited AI-powered regex generation from plain English
- Multi-flavor regex support (Python, Go, Java, PCRE, .NET engines)
- Unlimited pattern history
- Priority support

Get your Pro license at [zovo.one](https://zovo.one).

## More Developer Tools from Zovo

| Extension | Description | Install |
|-----------|-------------|---------|
| **Tab Suspender Pro** | Save memory by suspending inactive tabs | [Install](https://chromewebstore.google.com/detail/tab-suspender-pro-save-me/ofgncemnlblfnocjbojdhamacfffcpnm) |
| **JSON Formatter Pro** | Format, validate, and beautify JSON instantly | [Install](https://chromewebstore.google.com/detail/json-formatter-pro/gbnadjkeegkhbcoeaeaoedpojlcknnhp) |
| **Cookie Manager** | View, edit, and export browser cookies | [Install](https://chromewebstore.google.com/detail/cookie-manager/ijolfnkijbagodcigeebgjhlkdgcebmf) |
| **Clipboard History Pro** | Never lose copied text again | [Install](https://chromewebstore.google.com/detail/clipboard-history-pro/ddmidpneacclepjmdjibmcdijedgdidf) |
| **Session Manager Pro** | Save and restore browser sessions | [Install](https://chromewebstore.google.com/detail/session-manager-pro-by-zo/mhbfbnmokccombamjdflafbakdlnehlh) |

## Support

- **Star this repo** if you find it useful
- **[Leave a review](https://chromewebstore.google.com/detail/regex-tester-pro-by-zovo/laljckjnohfcbhmlehjkcppkdfibldad)** on the Chrome Web Store
- **[Report bugs](https://github.com/theluckystrike/regex-tester-chrome-extension/issues)** on GitHub
- **[Request features](https://github.com/theluckystrike/regex-tester-chrome-extension/issues)** -- we read every suggestion
- **Share** with your developer friends and communities

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

[MIT](LICENSE) -- Copyright (c) 2024 [Zovo](https://zovo.one)

---

Made with care by [Zovo](https://zovo.one)
