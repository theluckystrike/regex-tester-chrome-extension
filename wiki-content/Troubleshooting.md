# Troubleshooting

Solutions to common issues with Regex Tester Pro.

---

## The Extension Icon Does Not Appear in the Toolbar

After installation, Chrome may hide the extension icon behind the puzzle-piece menu.

**Fix:**
1. Click the **puzzle piece icon** in the Chrome toolbar
2. Find **Regex Tester Pro** in the list
3. Click the **pin icon** next to it

The icon will now be visible in your toolbar at all times.

---

## The Popup Does Not Open When I Click the Icon

This can happen if the extension was not installed correctly or Chrome needs a restart.

**Fix:**
1. Go to `chrome://extensions/`
2. Find Regex Tester Pro and check that it is **enabled** (toggle is on)
3. If you see an error badge, click **"Errors"** to see details
4. Try disabling and re-enabling the extension
5. If the issue persists, remove the extension and reinstall it from the [Chrome Web Store](https://chromewebstore.google.com/detail/regex-tester-pro-by-zovo/laljckjnohfcbhmlehjkcppkdfibldad)

---

## My Pattern Works on regex101 but Not Here

The most common cause is a **regex engine difference**. Regex Tester Pro runs the JavaScript regex engine. If your pattern was written for PCRE, Python, or another engine, certain features may not be available:

| Feature | JavaScript Support |
|---------|-------------------|
| Lookahead `(?=...)` | Yes |
| Lookbehind `(?<=...)` | Yes (Chrome 62+) |
| Named groups `(?<name>...)` | Yes |
| Possessive quantifiers `a++` | **No** |
| Atomic groups `(?>...)` | **No** |
| Recursion `(?R)` | **No** |
| Conditional patterns `(?(1)...)` | **No** |
| `\A` and `\Z` anchors | **No** (use `^` and `$` with `m` flag) |
| `(?P<name>...)` | **No** (use `(?<name>...)` instead) |

**Fix:** Translate the unsupported syntax to JavaScript equivalents. For possessive quantifiers and atomic groups, you can often restructure the pattern using lookahead: `(?=(pattern))\1` simulates an atomic group in JavaScript.

---

## Matches Are Not Highlighted

**Check these common causes:**

1. **Invalid regex syntax** — Look for a red error indicator. Common errors include unescaped special characters (`(`, `[`, `{`, `.`, `*`, `+`, `?`).

2. **Missing `g` flag** — Without the global flag, only the first match is found. Click the `g` flag button to enable it.

3. **Empty pattern** — An empty pattern matches everything, which may look like nothing is highlighted.

4. **Wrong flags** — For example, if your test string has mixed case but `i` flag is off, or if your string has newlines but `m` flag is off.

---

## The Right-Click "Test with Regex Tester" Option Is Missing

The context menu item requires the `contextMenus` and `activeTab` permissions.

**Fix:**
1. Go to `chrome://extensions/`
2. Click **Details** on Regex Tester Pro
3. Verify that site access is set to **"On all sites"** or at least the site you are on
4. Try restarting Chrome

Note: Context menu items may not appear on internal Chrome pages (`chrome://`, `chrome-extension://`) or the Chrome Web Store due to Chrome's security restrictions.

---

## Saved Patterns or History Disappeared

Pattern history is stored in `chrome.storage.local`. Data can be lost if:

- The extension was uninstalled and reinstalled
- Chrome storage was cleared (Settings > Privacy > Clear browsing data > with "Cookies and other site data" selected)
- A Chrome profile reset occurred

**Prevention:** Use the **Share** feature to export important patterns as JSON snippets that you can save externally.

---

## The Extension Is Slow with Very Long Text

Regex matching is performed in real-time on every keystroke. With very large test strings (tens of thousands of characters) or complex patterns with backtracking, this can cause noticeable lag.

**Fix:**
1. **Simplify your pattern** — Use possessive-like constructs where possible
2. **Reduce test string size** — Test with a representative sample rather than the full dataset
3. **Check for ReDoS** — Click the performance analyzer to check if your pattern has catastrophic backtracking potential. Patterns like `(a+)+`, `(a|a)+`, or `(\w+\s*)+` can cause exponential matching time
4. **Disable global flag temporarily** — Finding all matches in a large string is slower than finding the first

---

## Dark Mode Is Not Working

Regex Tester Pro detects your system's dark mode preference automatically.

**Fix:**
1. Check your system dark mode setting:
   - **macOS:** System Settings > Appearance > Dark
   - **Windows:** Settings > Personalization > Colors > Dark
2. Try toggling the manual dark/light mode switch within the extension
3. If auto-detection fails, the manual toggle overrides the system preference

---

## Extension Conflicts

In rare cases, other extensions can interfere with Regex Tester Pro.

**Diagnosis:**
1. Open Chrome in a new profile (or incognito with Regex Tester Pro allowed)
2. Test if the issue persists
3. If it works in the clean profile, disable other extensions one by one to identify the conflict

---

## Reporting a Bug

If your issue is not covered here:

1. Go to [GitHub Issues](https://github.com/theluckystrike/regex-tester-chrome-extension/issues)
2. Click **"New Issue"** and select the **Bug Report** template
3. Include:
   - Your Chrome version (`chrome://version/`)
   - Your operating system
   - The regex pattern and test string that cause the issue
   - Steps to reproduce
   - Screenshots if applicable

---

[Back to Home](Home) | [FAQ](FAQ) | [Installation Guide](Installation-Guide)
