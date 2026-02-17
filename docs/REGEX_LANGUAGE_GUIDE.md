# Regular Expressions Across Programming Languages

A comprehensive reference for regex syntax differences between JavaScript, Python, Go, Java, PHP, Ruby, C#, and Rust. Use this guide when porting regex patterns between languages or when you need to know which features are available where.

## Feature Support Matrix

| Feature | JS | Python | Go (RE2) | Java | PHP (PCRE) | Ruby | C# (.NET) | Rust (regex) |
|---------|:--:|:------:|:--------:|:----:|:----------:|:----:|:---------:|:------------:|
| Lookahead `(?=...)` | Yes | Yes | No | Yes | Yes | Yes | Yes | No |
| Lookbehind `(?<=...)` | Yes* | Yes | No | Yes** | Yes | Yes | Yes | No |
| Named groups `(?P<n>...)` | `(?<n>)` | `(?P<n>)` | `(?P<n>)` | `(?<n>)` | `(?P<n>)` | `(?<n>)` | `(?<n>)` | `(?P<n>)` |
| Atomic groups `(?>...)` | No | No*** | No | Yes | Yes | Yes | Yes | No |
| Possessive quantifiers `a++` | No | No | No | Yes | Yes | Ruby 3.x | Yes | No |
| Backreferences `\1` | Yes | Yes | No | Yes | Yes | Yes | Yes | No |
| Unicode categories `\p{L}` | Yes | No**** | Yes | Yes | Yes | Yes | Yes | Yes |
| Conditional `(?(1)a\|b)` | No | Yes | No | No | Yes | Yes | Yes | No |
| Recursion `(?R)` | No | No | No | No | Yes | No | Yes | No |
| Free-spacing mode `/x` | No | `re.X` | No | `(?x)` | `x` flag | `x` flag | `(?x)` | `(?x)` |

\* JS lookbehind: variable-length since ES2018. \** Java lookbehind: must be fixed-length. \*** Python 3.11+ has atomic groups via `(?>...)`. \**** Python: use `\w` with `re.UNICODE` or the `regex` module for `\p{L}`.

## Flag Differences

| Flag | JS | Python | Go | Java | PHP | Ruby | C# | Rust |
|------|:--:|:------:|:--:|:----:|:---:|:----:|:--:|:----:|
| Case insensitive | `i` | `re.I` | `(?i)` | `(?i)` | `i` | `i` | `(?i)` | `(?i)` |
| Multiline (`^`/`$` per line) | `m` | `re.M` | `(?m)` | `(?m)` | `m` | `m` | `(?m)` | `(?m)` |
| Dotall (`.` matches `\n`) | `s` | `re.S` | `(?s)` | `(?s)` | `s` | `m` | `(?s)` | `(?s)` |
| Global (all matches) | `g` | `findall()` | `FindAll` | `find()` loop | `g` | `scan` | `Matches()` | `find_iter()` |
| Unicode | `u` | default | default | `(?U)` | `u` | default | default | default |

> **Ruby gotcha**: Ruby's `m` flag is equivalent to `s` (dotall) in other languages. Ruby's multiline-like behavior is the default for `^` and `$`.

## Common Syntax Differences

### Word Boundaries

```
JavaScript:  /\bhello\b/
Python:      r'\bhello\b'
Go:          `\bhello\b`
Java:        "\\bhello\\b"    // Double-escaped in strings
```

### Escaping Backslashes

| Language | String syntax | Pattern for `\d+` |
|----------|--------------|-------------------|
| JavaScript | `/\d+/` | Regex literal — no extra escaping |
| Python | `r'\d+'` | Raw string — no extra escaping |
| Go | `` `\d+` `` | Raw string literal |
| Java | `"\\d+"` | Must double-escape in regular strings |
| C# | `@"\d+"` | Verbatim string — no extra escaping |

### Named Group Syntax

```python
# Python
(?P<name>pattern)     # Define
(?P=name)             # Backreference
\g<name>              # Replacement

# JavaScript, Java, C#
(?<name>pattern)      # Define
\k<name>              # Backreference
$<name>               # Replacement (JS uses $<name>, C# uses ${name})

# Go, Rust
(?P<name>pattern)     # Define (Go-style)
```

## Engine Families

Understanding regex engine families explains why features cluster:

| Engine | Languages | Notable traits |
|--------|-----------|---------------|
| **PCRE / PCRE2** | PHP, R (default) | Most feature-rich: recursion, callouts, conditionals |
| **RE2** | Go, Rust (`regex` crate) | Guaranteed linear time — no backtracking, no lookarounds |
| **Oniguruma** | Ruby | Supports lookbehind, named groups, possessive quantifiers |
| **ICU** | Swift, Objective-C | Unicode-focused, similar to PCRE |
| **.NET** | C#, F# | Balancing groups (unique), variable-length lookbehind |
| **V8 / Irregexp** | JavaScript (V8) | ES2018+ features: named groups, lookbehind, `\p{}` |

## Performance Gotchas

### Catastrophic Backtracking

Patterns like `(a+)+b` cause exponential backtracking on non-matching input in NFA-based engines (all except RE2/Rust). The input `aaaaaaaaaaaaaac` can take seconds or more.

**Safe alternatives**:
- Use possessive quantifiers where available: `(a++)b`
- Use atomic groups: `(?>a+)b`
- Restructure the pattern: `a+b`
- Use RE2-family engines for untrusted input

### `.*` vs `.*?` vs `[^X]*`

```regex
<.*>     # Greedy — matches from first < to LAST >
<.*?>    # Lazy — matches from first < to NEXT >
<[^>]*>  # Negated class — fastest, no backtracking needed
```

The negated character class (`[^>]*`) is almost always the best choice for delimited content.

## Quick Tips for Cross-Language Porting

1. **Avoid lookarounds** if targeting Go or Rust — they are not supported.
2. **Use `(?P<name>)` syntax** for maximum portability of named groups (works in Python, Go, Rust, PHP).
3. **Always use raw strings** (`r''` in Python, backtick in Go, `@""` in C#) to avoid double-escaping.
4. **Test edge cases with Unicode** — `\w` and `\b` behave differently depending on Unicode mode.
5. **Benchmark substitution patterns** — replacement syntax (`$1` vs `\1` vs `\g<1>`) varies significantly.

## Further Reading

- [regular-expressions.info](https://www.regular-expressions.info/) — The most comprehensive regex reference online
- [RE2 Syntax](https://github.com/google/re2/wiki/Syntax) — Complete RE2 feature list
- [MDN: Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions) — JavaScript regex guide
- [Python `re` documentation](https://docs.python.org/3/library/re.html) — Official Python regex reference
- [.NET Regular Expressions](https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expressions) — .NET regex documentation
