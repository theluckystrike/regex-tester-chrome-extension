# Contributing to Regex Tester Pro

Thank you for your interest in contributing to Regex Tester Pro! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs

1. Check the [existing issues](https://github.com/theluckystrike/regex-tester-chrome-extension/issues) to avoid duplicates
2. Use the [bug report template](https://github.com/theluckystrike/regex-tester-chrome-extension/issues/new?template=bug_report.md)
3. Include your Chrome version, OS, and steps to reproduce

### Suggesting Features

1. Check the [existing issues](https://github.com/theluckystrike/regex-tester-chrome-extension/issues) for similar requests
2. Use the [feature request template](https://github.com/theluckystrike/regex-tester-chrome-extension/issues/new?template=feature_request.md)
3. Describe the use case and expected behavior

### Submitting Code

1. **Fork** the repository
2. **Create a branch** for your feature or fix: `git checkout -b feature/your-feature-name`
3. **Make your changes** following the code style below
4. **Test** your changes by loading the extension in Chrome (see Development Setup)
5. **Commit** with a clear message: `git commit -m "Add: description of change"`
6. **Push** and open a **Pull Request**

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/theluckystrike/regex-tester-chrome-extension.git
   cd regex-tester-chrome-extension
   ```

2. Load in Chrome:
   - Open `chrome://extensions/`
   - Enable **Developer mode**
   - Click **Load unpacked**
   - Select the repository folder

3. After making changes, click the refresh icon on the extension card to reload.

## Code Style

- **IIFE pattern** for all modules (not ES modules or class syntax for globals)
- **`const ModuleName = (() => { ... })()`** for shared modules
- **Vanilla JavaScript** only — no frameworks, no build tools
- **Chrome Manifest V3** APIs
- **`chrome.storage.local`** for persistence
- Use clear, descriptive variable names
- Add comments for non-obvious logic

## Architecture

```
manifest.json              # Extension manifest (MV3)
assets/icons/              # Extension icons
src/
  popup/                   # Main popup UI
    popup.html             # Popup markup
    popup.css              # Popup styles
    popup.js               # Core regex engine & UI logic
  background/
    service-worker.js      # Service worker (context menu, lifecycle)
  shared/                  # Shared modules
    storage.js             # Chrome storage wrapper
    samples.js             # Example regex patterns
    explainer.js           # Pattern breakdown engine
    code-export.js         # Multi-language code generator
    perf-analyzer.js       # ReDoS safety analyzer
    quick-insert.js        # Regex building blocks
    error-handler.js       # Error handling utilities
  onboarding/              # First-run experience
  guide/                   # User guide
  help/                    # Help center
```

## Pull Request Guidelines

- Keep PRs focused on a single change
- Include a description of what changed and why
- Test in Chrome before submitting
- Screenshots welcome for UI changes

## Code of Conduct

Be respectful, constructive, and inclusive. We are building tools for developers worldwide.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
