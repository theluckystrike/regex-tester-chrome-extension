# Code Export Guide

How to export regex patterns from Regex Tester Pro to production-ready code in eight programming languages.

---

## How It Works

1. Write and test your regex pattern in Regex Tester Pro
2. Enable the flags you need (`g`, `i`, `m`, `s`, `u`, `y`)
3. Click the **Export** button
4. Select your target language
5. Copy the generated code into your project

The export translates both the pattern and all active flags into idiomatic code for each language. You do not need to remember how each language expresses regex flags — the export handles the translation.

---

## Supported Languages

### JavaScript

```javascript
// Pattern: ^\d{4}-\d{2}-\d{2}$
// Flags: g, m

const regex = /^\d{4}-\d{2}-\d{2}$/gm;

// Find all matches
const matches = text.match(regex);

// Test if string matches
const isMatch = regex.test(text);

// Find with capture groups
const regex2 = /^(\d{4})-(\d{2})-(\d{2})$/gm;
let match;
while ((match = regex2.exec(text)) !== null) {
    console.log(`Year: ${match[1]}, Month: ${match[2]}, Day: ${match[3]}`);
}
```

**Flag mapping:** Flags are used as-is since Regex Tester Pro runs JavaScript natively.

---

### Python

```python
import re

# Pattern: ^\d{4}-\d{2}-\d{2}$
# Flags: g, m

pattern = re.compile(r'^\d{4}-\d{2}-\d{2}$', re.MULTILINE)

# Find all matches (global)
matches = pattern.findall(text)

# Test if string matches
is_match = bool(pattern.search(text))

# Find with capture groups
pattern2 = re.compile(r'^(\d{4})-(\d{2})-(\d{2})$', re.MULTILINE)
for match in pattern2.finditer(text):
    print(f"Year: {match.group(1)}, Month: {match.group(2)}, Day: {match.group(3)}")
```

**Flag mapping:**

| JS Flag | Python Equivalent |
|---------|------------------|
| `i` | `re.IGNORECASE` |
| `m` | `re.MULTILINE` |
| `s` | `re.DOTALL` |
| `g` | Use `findall()` / `finditer()` instead of `search()` |
| `u` | Default in Python 3 |

**Note:** Python uses `(?P<name>...)` for named groups instead of JavaScript's `(?<name>...)`. The export handles this conversion.

---

### Java

```java
import java.util.regex.*;

// Pattern: ^\d{4}-\d{2}-\d{2}$
// Flags: g, m

Pattern pattern = Pattern.compile("^\\d{4}-\\d{2}-\\d{2}$", Pattern.MULTILINE);
Matcher matcher = pattern.matcher(text);

// Find all matches (global)
while (matcher.find()) {
    System.out.println(matcher.group());
}

// Test if string matches
boolean isMatch = matcher.find();

// Find with capture groups
Pattern pattern2 = Pattern.compile("^(\\d{4})-(\\d{2})-(\\d{2})$", Pattern.MULTILINE);
Matcher matcher2 = pattern2.matcher(text);
while (matcher2.find()) {
    System.out.printf("Year: %s, Month: %s, Day: %s%n",
        matcher2.group(1), matcher2.group(2), matcher2.group(3));
}
```

**Flag mapping:**

| JS Flag | Java Equivalent |
|---------|----------------|
| `i` | `Pattern.CASE_INSENSITIVE` |
| `m` | `Pattern.MULTILINE` |
| `s` | `Pattern.DOTALL` |
| `u` | `Pattern.UNICODE_CHARACTER_CLASS` |

**Note:** Java requires double-escaped backslashes in strings (`\\d` instead of `\d`). The export handles this.

---

### PHP

```php
<?php
// Pattern: ^\d{4}-\d{2}-\d{2}$
// Flags: g, m

// Find all matches (global)
preg_match_all('/^\d{4}-\d{2}-\d{2}$/m', $text, $matches);

// Test if string matches
$isMatch = preg_match('/^\d{4}-\d{2}-\d{2}$/m', $text);

// Find with capture groups
preg_match_all('/^(\d{4})-(\d{2})-(\d{2})$/m', $text, $matches);
foreach ($matches[0] as $i => $fullMatch) {
    echo "Year: {$matches[1][$i]}, Month: {$matches[2][$i]}, Day: {$matches[3][$i]}\n";
}
?>
```

**Flag mapping:**

| JS Flag | PHP Equivalent |
|---------|---------------|
| `i` | `i` modifier after closing delimiter |
| `m` | `m` modifier |
| `s` | `s` modifier |
| `g` | Use `preg_match_all()` instead of `preg_match()` |
| `u` | `u` modifier (enables UTF-8) |

**Note:** PHP uses PCRE2 internally. The pattern is wrapped in delimiters (`/pattern/flags`).

---

### Go

```go
package main

import (
    "fmt"
    "regexp"
)

func main() {
    // Pattern: ^\d{4}-\d{2}-\d{2}$
    // Flags: g, m

    re := regexp.MustCompile(`(?m)^\d{4}-\d{2}-\d{2}$`)

    // Find all matches (global)
    matches := re.FindAllString(text, -1)

    // Test if string matches
    isMatch := re.MatchString(text)

    // Find with capture groups
    re2 := regexp.MustCompile(`(?m)^(\d{4})-(\d{2})-(\d{2})$`)
    for _, match := range re2.FindAllStringSubmatch(text, -1) {
        fmt.Printf("Year: %s, Month: %s, Day: %s\n", match[1], match[2], match[3])
    }
}
```

**Flag mapping:**

| JS Flag | Go Equivalent |
|---------|--------------|
| `i` | `(?i)` inline prefix |
| `m` | `(?m)` inline prefix |
| `s` | `(?s)` inline prefix |
| `g` | Use `FindAll*` methods instead of `Find*` |

**Important limitations:** Go's `regexp` package uses the RE2 engine, which does **not** support lookahead, lookbehind, or backreferences. If your pattern uses these features, you will need to restructure it for Go. The trade-off is that RE2 guarantees linear-time matching with no ReDoS risk.

---

### Ruby

```ruby
# Pattern: ^\d{4}-\d{2}-\d{2}$
# Flags: g, m

regex = /^\d{4}-\d{2}-\d{2}$/m

# Find all matches (global)
matches = text.scan(regex)

# Test if string matches
is_match = text.match?(regex)

# Find with capture groups
regex2 = /^(\d{4})-(\d{2})-(\d{2})$/m
text.scan(regex2).each do |match|
    puts "Year: #{match[0]}, Month: #{match[1]}, Day: #{match[2]}"
end
```

**Flag mapping:**

| JS Flag | Ruby Equivalent |
|---------|----------------|
| `i` | `i` modifier |
| `m` | **Caution:** Ruby's `m` flag makes `.` match newlines (equivalent to JS `s` flag). For JS `m` behavior, the export embeds `(?m)` inline |
| `s` | `m` modifier (Ruby's naming is inverted from most languages) |

**Note:** Ruby's flag naming can be confusing. Ruby `m` = JS `s` (dotall), and there is no direct Ruby equivalent of JS `m` — the export uses the `(?m)` inline flag.

---

### C#

```csharp
using System;
using System.Text.RegularExpressions;

// Pattern: ^\d{4}-\d{2}-\d{2}$
// Flags: g, m

var regex = new Regex(@"^\d{4}-\d{2}-\d{2}$", RegexOptions.Multiline);

// Find all matches (global)
var matches = regex.Matches(text);
foreach (Match match in matches) {
    Console.WriteLine(match.Value);
}

// Test if string matches
bool isMatch = regex.IsMatch(text);

// Find with capture groups
var regex2 = new Regex(@"^(\d{4})-(\d{2})-(\d{2})$", RegexOptions.Multiline);
foreach (Match match in regex2.Matches(text)) {
    Console.WriteLine($"Year: {match.Groups[1]}, Month: {match.Groups[2]}, Day: {match.Groups[3]}");
}
```

**Flag mapping:**

| JS Flag | C# Equivalent |
|---------|--------------|
| `i` | `RegexOptions.IgnoreCase` |
| `m` | `RegexOptions.Multiline` |
| `s` | `RegexOptions.Singleline` |

**Note:** C# uses the verbatim string prefix `@` to avoid double-escaping backslashes.

---

### Rust

```rust
use regex::Regex;

fn main() {
    // Pattern: ^\d{4}-\d{2}-\d{2}$
    // Flags: g, m

    let re = Regex::new(r"(?m)^\d{4}-\d{2}-\d{2}$").unwrap();

    // Find all matches (global)
    let matches: Vec<&str> = re.find_iter(text).map(|m| m.as_str()).collect();

    // Test if string matches
    let is_match = re.is_match(text);

    // Find with capture groups
    let re2 = Regex::new(r"(?m)^(\d{4})-(\d{2})-(\d{2})$").unwrap();
    for cap in re2.captures_iter(text) {
        println!("Year: {}, Month: {}, Day: {}", &cap[1], &cap[2], &cap[3]);
    }
}
```

**Flag mapping:**

| JS Flag | Rust Equivalent |
|---------|----------------|
| `i` | `(?i)` inline prefix |
| `m` | `(?m)` inline prefix |
| `s` | `(?s)` inline prefix |
| `g` | Use `find_iter` / `captures_iter` instead of `find` / `captures` |

**Important limitations:** Like Go, Rust's `regex` crate uses an RE2-like engine. **No lookahead, lookbehind, or backreferences.** Guaranteed linear-time matching.

**Note:** Add `regex = "1"` to your `Cargo.toml` dependencies.

---

## Flag Translation Summary

| JS Flag | Python | Java | PHP | Go | Ruby | C# | Rust |
|---------|--------|------|-----|----|------|----|------|
| `g` | `findall()` | `while find()` | `preg_match_all` | `FindAll*` | `.scan` | `.Matches` | `find_iter` |
| `i` | `re.IGNORECASE` | `CASE_INSENSITIVE` | `i` | `(?i)` | `i` | `IgnoreCase` | `(?i)` |
| `m` | `re.MULTILINE` | `MULTILINE` | `m` | `(?m)` | `(?m)` | `Multiline` | `(?m)` |
| `s` | `re.DOTALL` | `DOTALL` | `s` | `(?s)` | `m` | `Singleline` | `(?s)` |

## Language Compatibility Notes

| Feature | JS | Python | Go | Java | PHP | Ruby | C# | Rust |
|---------|:--:|:------:|:--:|:----:|:---:|:----:|:--:|:----:|
| Lookahead | Y | Y | **N** | Y | Y | Y | Y | **N** |
| Lookbehind | Y | Y | **N** | Y | Y | Y | Y | **N** |
| Backreferences | Y | Y | **N** | Y | Y | Y | Y | **N** |
| Named groups | Y | Y | Y | Y | Y | Y | Y | Y |
| Unicode `\p{}` | Y | via `regex` | Y | Y | Y | Y | Y | Y |

If your pattern uses features marked **N** for your target language, you will need to refactor the pattern. The export generates syntactically valid code, but runtime behavior may differ for unsupported features.

---

**[Install Regex Tester Pro](https://chromewebstore.google.com/detail/regex-tester-pro-by-zovo/laljckjnohfcbhmlehjkcppkdfibldad)** — Build, test, and export regex patterns directly in your browser.
