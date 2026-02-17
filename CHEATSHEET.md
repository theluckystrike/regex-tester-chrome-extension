# Regex Cheat Sheet

A comprehensive, quick-reference regex guide. All examples can be tested in [Regex Tester Pro](https://chromewebstore.google.com/detail/regex-tester-pro-by-zovo/laljckjnohfcbhmlehjkcppkdfibldad).

---

## Character Classes

| Pattern | Description | Example Match |
|---------|-------------|---------------|
| `.` | Any character (except newline) | `a`, `1`, `@` |
| `\d` | Digit `[0-9]` | `0`, `5`, `9` |
| `\D` | Non-digit `[^0-9]` | `a`, `!`, ` ` |
| `\w` | Word char `[a-zA-Z0-9_]` | `a`, `Z`, `_` |
| `\W` | Non-word char | `!`, `@`, ` ` |
| `\s` | Whitespace `[ \t\n\r\f\v]` | ` `, `\t`, `\n` |
| `\S` | Non-whitespace | `a`, `1`, `!` |
| `[abc]` | One of a, b, or c | `a`, `b`, `c` |
| `[^abc]` | NOT a, b, or c | `d`, `1`, `!` |
| `[a-z]` | Range: a through z | `a`, `m`, `z` |
| `[a-zA-Z0-9]` | Alphanumeric | `a`, `Z`, `5` |

## Special Characters

| Pattern | Description |
|---------|-------------|
| `\t` | Tab |
| `\n` | Newline |
| `\r` | Carriage return |
| `\\` | Literal backslash |
| `\.` | Literal dot |
| `\*` | Literal asterisk |

## Quantifiers

| Pattern | Description | Example |
|---------|-------------|---------|
| `*` | 0 or more (greedy) | `ab*` matches `a`, `ab`, `abb` |
| `+` | 1 or more (greedy) | `ab+` matches `ab`, `abb` (not `a`) |
| `?` | 0 or 1 (optional) | `colou?r` matches `color`, `colour` |
| `{3}` | Exactly 3 | `\d{3}` matches `123` |
| `{2,5}` | 2 to 5 | `\d{2,5}` matches `12` to `12345` |
| `{2,}` | 2 or more | `\d{2,}` matches `12`, `123`, `1234` |
| `*?` | 0 or more (lazy) | `".*?"` shortest between quotes |
| `+?` | 1 or more (lazy) | `<.+?>` shortest between `<>` |
| `??` | 0 or 1 (lazy) | Prefers 0 |

## Anchors & Boundaries

| Pattern | Description |
|---------|-------------|
| `^` | Start of string (or line with `m` flag) |
| `$` | End of string (or line with `m` flag) |
| `\b` | Word boundary |
| `\B` | Non-word boundary |

## Groups & References

| Pattern | Description |
|---------|-------------|
| `(abc)` | Capture group |
| `(?<name>abc)` | Named capture group |
| `(?:abc)` | Non-capturing group |
| `\1` | Backreference to group 1 |
| `$1` | Reference in replacement |
| `(a\|b)` | Alternation (a OR b) |

## Lookaround

| Pattern | Name | Description |
|---------|------|-------------|
| `(?=abc)` | Positive lookahead | Followed by `abc` |
| `(?!abc)` | Negative lookahead | NOT followed by `abc` |
| `(?<=abc)` | Positive lookbehind | Preceded by `abc` |
| `(?<!abc)` | Negative lookbehind | NOT preceded by `abc` |

## Flags

| Flag | Name | Effect |
|------|------|--------|
| `g` | Global | Find all matches |
| `i` | Case-insensitive | Ignore case |
| `m` | Multiline | `^`/`$` match line boundaries |
| `s` | Dotall | `.` matches `\n` |
| `u` | Unicode | Full Unicode support |
| `y` | Sticky | Match at `lastIndex` only |

## Common Patterns

### Validation

```
Email:        ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
URL:          https?:\/\/[^\s/$.?#].[^\s]*
IPv4:         ^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$
Phone (US):   ^(?:\+1[-. ]?)?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$
Date:         ^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$
Hex color:    ^#(?:[0-9a-fA-F]{3}){1,2}$
Password:     ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$
UUID:         ^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$
```

### Extraction

```
HTML tag:         <(\w+)[^>]*>([\s\S]*?)<\/\1>
Between quotes:   "([^"\\]|\\.)*"
JSON key-value:   "(\w+)":\s*"([^"]*)"
ISO timestamp:    \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})
IP + port:        (\d{1,3}(?:\.\d{1,3}){3}):(\d{1,5})
File extension:   \.([a-zA-Z0-9]+)$
```

### Text Processing

```
Duplicate words:    \b(\w+)\s+\1\b
Leading/trailing:   ^\s+|\s+$
camelCase split:    (?<=[a-z])(?=[A-Z])
Slug-ify:           [^a-zA-Z0-9]+
Multiple spaces:    \s{2,}
Empty lines:        ^\s*$
```

### Data & Logs

```
Apache log:      ^(\S+) \S+ \S+ \[(.+?)\] "(\S+) (\S+) \S+" (\d{3}) (\d+)
Stack trace:     at\s+(.+?)\s+\((.+?):(\d+):(\d+)\)
CSV field:       (?:^|,)(?:"([^"]*(?:""[^"]*)*)"|([^,]*))
Key=Value:       (\w+)=([^\s&]+)
Semver:          (\d+)\.(\d+)\.(\d+)(?:-([\w.]+))?(?:\+([\w.]+))?
```

## Greedy vs. Lazy

```
String:  <div>hello</div>
Greedy:  <.+>     → "<div>hello</div>"  (longest)
Lazy:    <.+?>    → "<div>"             (shortest)
```

## Word Boundary Examples

```
\bcat\b    matches "cat" in "the cat sat"
           does NOT match "caterpillar" or "concatenate"

\brun\b    matches "run" in "I run fast"
           does NOT match "running" or "rerun"
```

## Escape These Special Characters

When you want to match these literally, prefix with `\`:

```
. * + ? ^ $ { } [ ] ( ) | \
```

Example: To match `$9.99`, use `\$9\.99`

---

**[Install Regex Tester Pro](https://chromewebstore.google.com/detail/regex-tester-pro-by-zovo/laljckjnohfcbhmlehjkcppkdfibldad)** — Test any pattern from this cheat sheet directly in your browser.
