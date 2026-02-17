# Installation Guide

There are two ways to install Regex Tester Pro: from the Chrome Web Store (recommended for most users) or by loading the source code manually (for developers who want to contribute or inspect the code).

---

## Chrome Web Store (Recommended)

This is the simplest way to install and ensures you receive automatic updates.

1. Visit the **[Regex Tester Pro listing on the Chrome Web Store](https://chromewebstore.google.com/detail/regex-tester-pro-by-zovo/laljckjnohfcbhmlehjkcppkdfibldad)**
2. Click **"Add to Chrome"**
3. Confirm the permissions dialog (the extension only needs `storage`, `activeTab`, and `contextMenus`)
4. The Regex Tester icon appears in your browser toolbar

### Pinning the Extension

After installation, Chrome may hide the icon behind the extensions puzzle-piece menu. To keep it visible:

1. Click the **puzzle piece icon** in the toolbar
2. Find **Regex Tester Pro** in the list
3. Click the **pin icon** next to it

Now the extension is always one click away.

---

## Manual Installation (Developer Mode)

Use this method if you want to run the latest development version, contribute code, or audit the source.

### Prerequisites

- Google Chrome (version 88 or later for Manifest V3 support)
- Git (optional, you can download a ZIP instead)

### Steps

1. **Clone the repository** (or download and extract the ZIP):
   ```bash
   git clone https://github.com/theluckystrike/regex-tester-chrome-extension.git
   ```

2. **Open Chrome extensions page**: Navigate to `chrome://extensions/`

3. **Enable Developer mode**: Toggle the switch in the top-right corner

4. **Load the extension**: Click **"Load unpacked"** and select the cloned repository folder (the folder containing `manifest.json`)

5. **Verify**: The Regex Tester Pro icon should appear in your toolbar. Click it to open the popup.

### Updating a Manual Installation

If you cloned the repo with git:
```bash
cd regex-tester-chrome-extension
git pull origin main
```

Then go to `chrome://extensions/` and click the **refresh icon** on the Regex Tester Pro card.

---

## Supported Browsers

Regex Tester Pro is built for **Google Chrome** and any **Chromium-based browser** that supports Manifest V3:

- Google Chrome 88+
- Microsoft Edge 88+
- Brave (latest)
- Opera (latest)
- Vivaldi (latest)

Firefox is not currently supported because it uses a different extension API for Manifest V3.

---

## Permissions Explained

Regex Tester Pro requests three permissions, each for a specific reason:

| Permission | Why |
|------------|-----|
| `storage` | Save your pattern history and preferences (dark mode, saved patterns) locally in Chrome |
| `activeTab` | Enable the right-click context menu to send selected text from any page to the regex tester |
| `contextMenus` | Register the "Test with Regex Tester" right-click menu item |

The extension makes **zero network requests**. All data stays on your machine.

---

## Uninstalling

1. Right-click the Regex Tester Pro icon in your toolbar
2. Select **"Remove from Chrome"**
3. Confirm the dialog

This removes the extension and all locally stored data (saved patterns, history, preferences).

---

[Back to Home](Home) | [FAQ](FAQ) | [Troubleshooting](Troubleshooting)
