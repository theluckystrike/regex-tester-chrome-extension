# Regex Tester — Technical Architecture

## High-Level Architecture

```
┌──────────────────────────────────────────────────┐
│                  Chrome Browser                   │
│                                                   │
│  ┌───────────────────────────────────────────┐   │
│  │              Popup / Main UI               │   │
│  │  ┌────────────┐  ┌─────────────────────┐  │   │
│  │  │ Pattern    │  │  Results Panel      │  │   │
│  │  │ Editor     │  │  ├─ Match List      │  │   │
│  │  │            │  │  ├─ Group Captures  │  │   │
│  │  │ Flags      │  │  └─ Substitution   │  │   │
│  │  │ Selector   │  │      Preview        │  │   │
│  │  └────────────┘  └─────────────────────┘  │   │
│  │  ┌────────────────────────────────────┐   │   │
│  │  │        Test String Input           │   │   │
│  │  └────────────────────────────────────┘   │   │
│  └────────────────────┬──────────────────────┘   │
│                       │                          │
│                ┌──────▼──────┐                   │
│                │   Service   │                   │
│                │   Worker    │                   │
│                └──────┬──────┘                   │
│                       │                          │
│                ┌──────▼──────┐                   │
│                │chrome.storage│                  │
│                │   .local     │                  │
│                └─────────────┘                   │
└──────────────────────────────────────────────────┘
```

## Module Descriptions

| Module | File | Responsibility |
|--------|------|---------------|
| **Regex Engine** | `regex-engine.js` | Pattern compilation, match execution, error reporting |
| **Popup UI** | `popup.js` | Input handling, real-time highlighting, flag toggles |
| **Results Renderer** | `results.js` | Match visualization, group highlighting, substitution preview |
| **Pattern Library** | `patterns.js` | Built-in pattern collection (email, URL, IP, etc.) |
| **Service Worker** | `background.js` | History persistence, pattern storage |
| **Options Page** | `options.js` | Default flags, history limit, theme settings |

## Data Flow

1. **Input**: User types a regex pattern and test string in the popup UI.
2. **Compilation**: The regex engine compiles the pattern with selected flags using `new RegExp()`, catching and displaying syntax errors in real time.
3. **Execution**: `matchAll()` runs against the test string, collecting all matches with group captures and indices.
4. **Rendering**: The results renderer highlights matches inline, displays a match table, and shows substitution preview if a replacement string is provided.
5. **Persistence**: Patterns are saved to `chrome.storage.local` as history entries for quick recall.

## Chrome Extension APIs Used

| API | Purpose |
|-----|---------|
| `chrome.storage.local` | Save regex history, user preferences, and saved patterns |
| `chrome.runtime` | Message passing between popup and service worker |
| `chrome.action` | Open the regex tester popup |
| `chrome.commands` | Keyboard shortcuts for common actions |

## Build & Development

```bash
# Clone the repository
git clone https://github.com/theluckystrike/regex-tester-chrome-extension.git
cd regex-tester-chrome-extension

# Load as unpacked extension
# 1. Open chrome://extensions
# 2. Enable Developer Mode
# 3. Click "Load unpacked" and select the project directory

# No build step — vanilla JavaScript, no dependencies
```

### Project Structure

```
├── manifest.json        # Extension manifest (MV3)
├── background.js        # Service worker
├── popup/               # Main regex tester UI
├── options/             # Settings page
├── lib/                 # Regex engine, pattern library
├── icons/               # Extension icons
└── docs/                # Documentation
```

## Design Decisions

- **Real-Time Execution**: Regex matching runs on every keystroke using `requestAnimationFrame` debouncing for smooth performance.
- **Native RegExp Only**: Uses JavaScript's built-in `RegExp` engine — no WASM or external regex libraries — ensuring fast startup and small extension size.
- **Error-Tolerant Parsing**: Invalid patterns show descriptive errors without crashing, letting users build patterns incrementally.
- **No Data Transmission**: All pattern testing happens locally in the browser. No strings or patterns are sent to any server.
