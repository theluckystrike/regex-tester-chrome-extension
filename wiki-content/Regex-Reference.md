# Regex Reference

A comprehensive regular expression reference guide. All examples can be tested directly in [Regex Tester Pro](https://chromewebstore.google.com/detail/regex-tester-pro-by-zovo/laljckjnohfcbhmlehjkcppkdfibldad).

---

## Table of Contents

- [Character Classes](#character-classes)
- [Quantifiers](#quantifiers)
- [Anchors and Boundaries](#anchors-and-boundaries)
- [Groups and Backreferences](#groups-and-backreferences)
- [Lookahead and Lookbehind](#lookahead-and-lookbehind)
- [Flags](#flags)
- [Common Patterns](#common-patterns)
- [Language-Specific Differences](#language-specific-differences)

---

## Character Classes

Character classes match a single character from a defined set.

| Syntax | Description | Example | Matches |
|--------|-------------|---------|---------|
| `.` | Any character except newline (unless `s` flag) | `a.c` | `abc`, `a1c`, `a-c` |
| `\d` | Digit `[0-9]` | `\d{3}` | `123`, `456` |
| `\D` | Non-digit `[^0-9]` | `\D+` | `abc`, `---` |
| `\w` | Word character `[a-zA-Z0-9_]` | `\w+` | `hello`, `var_1` |
| `\W` | Non-word character | `\W` | `!`, `@`, ` ` |
| `\s` | Whitespace `[ \t\n\r\f\v]` | `\s+` | spaces, tabs, newlines |
| `\S` | Non-whitespace | `\S+` | `hello`, `123` |
| `[abc]` | Character set — matches `a`, `b`, or `c` | `[aeiou]` | any vowel |
| `[^abc]` | Negated set — any character except `a`, `b`, `c` | `[^0-9]` | any non-digit |
| `[a-z]` | Range — any lowercase letter | `[a-zA-Z]` | any letter |
| `\t` | Tab character | | |
| `\n` | Newline character | | |
| `\r` | Carriage return | | |

### Unicode Character Classes (with `u` flag)

| Syntax | Description | Example |
|--------|-------------|---------|
| `\p{L}` | Any Unicode letter | Matches `a`, `é`, `中`, `Д` |
| `\p{N}` | Any Unicode number | Matches `1`, `٣`, `৪` |
| `\p{Emoji}` | Emoji characters | Matches emoji |
| `\P{L}` | Any character that is NOT a letter | |

---

## Quantifiers

Quantifiers specify how many times the preceding element should be matched.

| Syntax | Description | Example | Matches |
|--------|-------------|---------|---------|
| `*` | Zero or more (greedy) | `ab*c` | `ac`, `abc`, `abbc` |
| `+` | One or more (greedy) | `ab+c` | `abc`, `abbc` (not `ac`) |
| `?` | Zero or one (optional) | `colou?r` | `color`, `colour` |
| `{n}` | Exactly n times | `\d{4}` | `2024` |
| `{n,}` | n or more times | `\d{2,}` | `12`, `123`, `1234` |
| `{n,m}` | Between n and m times | `\d{2,4}` | `12`, `123`, `1234` |
| `*?` | Zero or more (lazy) | `".*?"` | shortest match between quotes |
| `+?` | One or more (lazy) | `<.+?>` | shortest match between `<>` |
| `??` | Zero or one (lazy) | | prefers zero |

### Greedy vs. Lazy

By default, quantifiers are **greedy** — they match as much as possible. Adding `?` after a quantifier makes it **lazy** — it matches as little as possible.

```
String:   <div>hello</div>
Greedy:   <.+>    matches "<div>hello</div>"
Lazy:     <.+?>   matches "<div>" then "</div>"
```

---

## Anchors and Boundaries

Anchors match a position, not a character.

| Syntax | Description | Example | Matches |
|--------|-------------|---------|---------|
| `^` | Start of string (or line with `m` flag) | `^Hello` | `Hello world` (at start) |
| `$` | End of string (or line with `m` flag) | `world$` | `Hello world` (at end) |
| `\b` | Word boundary | `\bcat\b` | `cat` but not `caterpillar` |
| `\B` | Non-word boundary | `\Bcat\B` | `concatenation` (cat in middle) |

### Word Boundaries in Practice

Word boundaries are one of the most useful and most misunderstood regex features. `\b` matches the position between a word character (`\w`) and a non-word character (`\W`).

```
Pattern: \brun\b
Matches:    "run" in "I run fast" and "run."
No match:   "running", "rerun"
```

---

## Groups and Backreferences

### Capturing Groups

| Syntax | Description | Example |
|--------|-------------|---------|
| `(abc)` | Capture group — captures matched text | `(foo)(bar)` captures `foo` and `bar` |
| `(?<name>abc)` | Named capture group | `(?<year>\d{4})` captures year by name |
| `(?:abc)` | Non-capturing group — groups without capturing | `(?:foo|bar)baz` |
| `\1`, `\2` | Backreference to captured group | `(\w+)\s+\1` matches repeated words |
| `$1`, `$2` | Replacement reference (in replace operations) | |

### Practical Examples

**Extract date components:**
```
Pattern: (?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})
String:  2024-12-25
Groups:  year="2024", month="12", day="25"
```

**Find repeated words:**
```
Pattern: \b(\w+)\s+\1\b
String:  "the the quick brown fox"
Match:   "the the"
```

### Alternation

`|` acts as an OR operator:
```
Pattern: cat|dog|bird
Matches: "cat", "dog", "bird"
```

Use groups to limit alternation scope:
```
Pattern: (Mon|Tues|Wednes|Thurs|Fri|Satur|Sun)day
Matches: "Monday", "Tuesday", ..., "Sunday"
```

---

## Lookahead and Lookbehind

Lookaround assertions match a position based on what comes before or after, without including it in the match.

| Syntax | Name | Description |
|--------|------|-------------|
| `(?=abc)` | Positive lookahead | Matches position where `abc` follows |
| `(?!abc)` | Negative lookahead | Matches position where `abc` does NOT follow |
| `(?<=abc)` | Positive lookbehind | Matches position where `abc` precedes |
| `(?<!abc)` | Negative lookbehind | Matches position where `abc` does NOT precede |

### Practical Lookaround Examples

**Match a number followed by "px"** (without capturing "px"):
```
Pattern: \d+(?=px)
String:  "width: 100px; height: 200em"
Matches: "100"
```

**Match a number NOT followed by "px":**
```
Pattern: \d+(?!px)
String:  "100px 200em"
Matches: "10" (in 100px, the "10" is followed by "0" not "px"), "200"
```

**Match a dollar amount** (number preceded by "$"):
```
Pattern: (?<=\$)\d+(\.\d{2})?
String:  "Price: $19.99 or €25.00"
Matches: "19.99"
```

**Password validation** — at least one uppercase, one lowercase, one digit, minimum 8 characters:
```
Pattern: ^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$
```

---

## Flags

| Flag | Name | Behavior |
|------|------|----------|
| `g` | Global | Find all matches, not just the first |
| `i` | Case-insensitive | `a` matches both `a` and `A` |
| `m` | Multiline | `^` and `$` match line boundaries |
| `s` | Dotall / Single-line | `.` matches newlines too |
| `u` | Unicode | Full Unicode support, enables `\p{}` |
| `y` | Sticky | Matches only at `lastIndex` position |

---

## Common Patterns

These are practical patterns you can paste directly into Regex Tester Pro.

### Email Address (Simplified)
```
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
```
Note: A truly RFC 5322-compliant email regex is extremely complex. This simplified version covers the vast majority of real-world email addresses.

### URL
```
https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)
```

### Phone Number (US)
```
^(?:\+1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$
```
Matches: `(555) 123-4567`, `555-123-4567`, `+1 555 123 4567`

### IPv4 Address
```
^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$
```

### Date (YYYY-MM-DD)
```
^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$
```

### Hex Color
```
^#(?:[0-9a-fA-F]{3}){1,2}$
```
Matches: `#fff`, `#aB3`, `#FF5733`

### HTML Tag
```
<(\w+)(?:\s[^>]*)?>.*?<\/\1>
```

### Strong Password
```
^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$
```
Requires: lowercase, uppercase, digit, special character, minimum 8 characters.

---

## Language-Specific Differences

Regex syntax varies between programming languages and engines. Here are the key differences to be aware of when exporting from Regex Tester Pro.

### JavaScript
- Supports all features in this guide (it is the engine Regex Tester uses)
- Lookbehind requires Chrome 62+ / Node 8.10+
- Named groups: `(?<name>...)`, accessed via `.groups.name`
- No possessive quantifiers, no atomic groups

### Python
- Uses `re` module (or `regex` third-party module for advanced features)
- Flags: `re.IGNORECASE`, `re.MULTILINE`, `re.DOTALL`
- Named groups: `(?P<name>...)` (note the `P`)
- Backreferences in replacement: `\1` or `\g<name>`
- No `y` (sticky) flag equivalent

### Go
- Uses `regexp` package (RE2 engine)
- **No lookahead or lookbehind** — this is the biggest difference
- **No backreferences** in patterns
- Named groups: `(?P<name>...)` (like Python)
- Guaranteed linear-time matching (no catastrophic backtracking)
- Flags are inline only: `(?i)`, `(?m)`, `(?s)`

### Java
- Uses `java.util.regex.Pattern`
- Flags: `Pattern.CASE_INSENSITIVE`, `Pattern.MULTILINE`, `Pattern.DOTALL`
- Named groups: `(?<name>...)` (Java 7+)
- Supports possessive quantifiers (`++`, `*+`, `?+`) and atomic groups
- Backslashes must be double-escaped in strings: `\\d`

### PHP
- Uses PCRE2 (Perl-Compatible Regular Expressions)
- Pattern delimiters required: `/pattern/flags`
- Flags: `i`, `m`, `s`, `x` (extended), `u` (UTF-8)
- Named groups: `(?<name>...)` or `(?P<name>...)`
- Supports recursion, possessive quantifiers, atomic groups

### Ruby
- Built-in `Regexp` class
- Named groups: `(?<name>...)`, accessed via `$~[:name]`
- Flags: `i`, `m` (equivalent to `s` in other languages), `x` (extended)
- Note: Ruby's `m` flag makes `.` match newlines (like `s` in JavaScript)

### C#
- Uses `System.Text.RegularExpressions.Regex`
- Flags: `RegexOptions.IgnoreCase`, `RegexOptions.Multiline`, `RegexOptions.Singleline`
- Named groups: `(?<name>...)` or `(?'name'...)`
- Supports balancing groups for matching nested structures

### Rust
- Uses `regex` crate (RE2-like engine)
- **No lookahead or lookbehind** (like Go)
- **No backreferences** in patterns
- Named groups: `(?P<name>...)` or `(?<name>...)`
- Guaranteed linear-time matching
- Flags are inline: `(?i)`, `(?m)`, `(?s)`

### Key Takeaways

| Feature | JS | Python | Go | Java | PHP | Ruby | C# | Rust |
|---------|----|----|----|----|----|----|----|----|
| Lookahead | Yes | Yes | **No** | Yes | Yes | Yes | Yes | **No** |
| Lookbehind | Yes | Yes | **No** | Yes | Yes | Yes | Yes | **No** |
| Backreferences | Yes | Yes | **No** | Yes | Yes | Yes | Yes | **No** |
| Named groups | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Possessive quantifiers | No | No | No | Yes | Yes | No | No | No |
| Unicode properties `\p{}` | Yes | `regex` module | Yes | Yes | Yes | Yes | Yes | Yes |

---

[Back to Home](Home) | [Developer Guide](Developer-Guide) | [FAQ](FAQ)
