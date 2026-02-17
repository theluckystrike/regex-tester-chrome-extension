# Developer Guide

How to use Regex Tester Pro effectively in your software development workflow.

---

## Table of Contents

- [Quick Workflow Integration](#quick-workflow-integration)
- [Testing Form Validation Patterns](#testing-form-validation-patterns)
- [Regex for Log Parsing and Data Extraction](#regex-for-log-parsing-and-data-extraction)
- [Code Export to 8 Languages](#code-export-to-8-languages)
- [Using the Right-Click Context Menu](#using-the-right-click-context-menu)
- [Keyboard Shortcuts](#keyboard-shortcuts)

---

## Quick Workflow Integration

The main advantage of a browser-based regex tool over web apps like regex101 is the elimination of context switching. Here is a typical workflow:

1. You are reading documentation, reviewing a pull request, or browsing logs in a web app.
2. You see a string pattern you need to match.
3. **Select the text**, **right-click**, choose **"Test with Regex Tester"** — or simply click the toolbar icon.
4. Write and iterate on your pattern with instant highlighting.
5. Click **Export**, choose your language, copy the generated code.
6. Paste it into your editor.

No new tab, no navigation, no account login. The popup stays open while you refine.

---

## Testing Form Validation Patterns

Form validation is one of the most common uses for regex. Here is how to develop and verify validation patterns with Regex Tester Pro.

### Email Validation

```
Pattern: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
```

Use **multi-string mode** to test many inputs at once:
```
user@example.com           (should match)
first.last@domain.co.uk    (should match)
user@.com                  (should NOT match)
@domain.com                (should NOT match)
user@domain                (should NOT match)
user+tag@example.com       (should match)
```

Multi-string mode shows a pass/fail indicator for each line, making it easy to verify both positive and negative test cases.

### Password Strength

```
Pattern: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$
```

Test strings:
```
weakpass        (fail — no uppercase, digit, or special)
Weakpass1       (fail — no special character)
Str0ng!Pass     (pass)
Ab1!            (fail — too short)
```

### Credit Card Number (Luhn aside, format only)

```
Pattern: ^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$
```

Matches: `4111111111111111`, `4111-1111-1111-1111`, `4111 1111 1111 1111`

### URL Validation

```
Pattern: ^https?:\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?$
```

**Tip:** After validating a pattern, click **Export** and select your backend language to get production-ready validation code.

---

## Regex for Log Parsing and Data Extraction

Regex is indispensable for parsing log files, extracting structured data from text, and transforming data formats.

### Apache/Nginx Access Log

```
Pattern: ^(\S+) \S+ \S+ \[(.+?)\] "(\S+) (\S+) \S+" (\d{3}) (\d+)
```

Capture groups:
1. IP address
2. Timestamp
3. HTTP method
4. Request path
5. Status code
6. Response size

Test string:
```
192.168.1.1 - - [17/Feb/2026:10:30:00 +0000] "GET /api/users HTTP/1.1" 200 1234
```

### JSON Key-Value Extraction

```
Pattern: "(\w+)":\s*"([^"]*)"
```

Extracts key-value pairs from JSON-like text. The **capture groups panel** in Regex Tester Pro will display each extracted pair clearly.

### Stack Trace File References

```
Pattern: (?:at\s+)?(\S+)\s+\(?([\w./\\-]+):(\d+):(\d+)\)?
```

Extracts function name, file path, line number, and column from JavaScript stack traces.

### CSV Field Extraction

```
Pattern: (?:^|,)(?:"([^"]*(?:""[^"]*)*)"|([^,]*))
```

Handles quoted fields with escaped quotes inside CSV data.

### ISO 8601 Timestamp

```
Pattern: \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})
```

Matches: `2026-02-17T10:30:00Z`, `2026-02-17T10:30:00.123+05:30`

---

## Code Export to 8 Languages

After building and testing your pattern, click the **Export** button to generate code. Regex Tester Pro translates the pattern and all active flags into idiomatic code for each language.

### JavaScript

```javascript
const regex = /^\d{4}-\d{2}-\d{2}$/gm;
const matches = text.match(regex);
```

### Python

```python
import re

pattern = re.compile(r'^\d{4}-\d{2}-\d{2}$', re.MULTILINE)
matches = pattern.findall(text)
```

### Java

```java
import java.util.regex.*;

Pattern pattern = Pattern.compile("^\\d{4}-\\d{2}-\\d{2}$", Pattern.MULTILINE);
Matcher matcher = pattern.matcher(text);
while (matcher.find()) {
    System.out.println(matcher.group());
}
```

### PHP

```php
preg_match_all('/^\d{4}-\d{2}-\d{2}$/m', $text, $matches);
```

### Go

```go
import "regexp"

re := regexp.MustCompile(`(?m)^\d{4}-\d{2}-\d{2}$`)
matches := re.FindAllString(text, -1)
```

### Ruby

```ruby
regex = /^\d{4}-\d{2}-\d{2}$/m
matches = text.scan(regex)
```

### C#

```csharp
using System.Text.RegularExpressions;

var regex = new Regex(@"^\d{4}-\d{2}-\d{2}$", RegexOptions.Multiline);
var matches = regex.Matches(text);
```

### Rust

```rust
use regex::Regex;

let re = Regex::new(r"(?m)^\d{4}-\d{2}-\d{2}$").unwrap();
let matches: Vec<&str> = re.find_iter(text).map(|m| m.as_str()).collect();
```

**Flags are translated automatically.** For example, the JavaScript `i` flag becomes `re.IGNORECASE` in Python, `Pattern.CASE_INSENSITIVE` in Java, and `RegexOptions.IgnoreCase` in C#. You do not need to remember each language's flag syntax.

---

## Using the Right-Click Context Menu

When you select text on any webpage:

1. **Select** the text you want to test or use as a pattern
2. **Right-click** the selection
3. Choose **"Test with Regex Tester"**
4. The extension popup opens with your selected text loaded

This is useful when you spot a pattern in documentation, a code review, or log output and want to quickly iterate on it.

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+E` | Open examples panel |
| `Ctrl+S` | Save current pattern to history |
| `Ctrl+H` | Open pattern history |
| `Esc` | Close any open panel |

On macOS, use `Cmd` instead of `Ctrl`.

---

[Back to Home](Home) | [Regex Reference](Regex-Reference) | [Troubleshooting](Troubleshooting)
