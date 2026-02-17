# Common Regex Patterns

A curated collection of 30+ real-world regex patterns with explanations. Every pattern can be tested directly in [Regex Tester Pro](https://chromewebstore.google.com/detail/regex-tester-pro-by-zovo/laljckjnohfcbhmlehjkcppkdfibldad).

---

## Table of Contents

- [Validation](#validation)
- [Extraction](#extraction)
- [Text Processing](#text-processing)
- [Web Development](#web-development)
- [Data and Logs](#data-and-logs)
- [Dates and Times](#dates-and-times)
- [Numbers and Currency](#numbers-and-currency)
- [Security](#security)

---

## Validation

### 1. Email Address

```
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
```

**Matches:** `user@example.com`, `first.last@company.co.uk`, `user+tag@domain.org`
**Does not match:** `@domain.com`, `user@`, `user@.com`

Note: A truly RFC 5322-compliant email regex is extremely complex. This simplified version covers the vast majority of real-world email addresses. For production use, combine regex with actual email verification.

### 2. URL (HTTP/HTTPS)

```
https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)
```

**Matches:** `https://example.com`, `http://www.test.co.uk/path?q=1`, `https://sub.domain.com/page#section`

### 3. IPv4 Address

```
^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$
```

**Matches:** `192.168.1.1`, `10.0.0.255`, `0.0.0.0`
**Does not match:** `256.1.1.1`, `192.168.1`, `192.168.1.1.1`

The pattern validates each octet is between 0-255. `25[0-5]` handles 250-255, `2[0-4]\d` handles 200-249, and `[01]?\d\d?` handles 0-199.

### 4. IPv6 Address (Simplified)

```
^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$
```

**Matches:** `2001:0db8:85a3:0000:0000:8a2e:0370:7334`

Note: Full IPv6 validation including `::` shorthand requires a significantly more complex pattern.

### 5. US Phone Number

```
^(?:\+1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$
```

**Matches:** `(555) 123-4567`, `555-123-4567`, `+1 555.123.4567`, `5551234567`

### 6. International Phone Number (E.164)

```
^\+[1-9]\d{1,14}$
```

**Matches:** `+14155551234`, `+442071234567`, `+861012345678`

### 7. UUID v4

```
^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$
```

**Matches:** `550e8400-e29b-41d4-a716-446655440000`

The `4` in the third group identifies version 4. The first character of the fourth group is restricted to `8`, `9`, `a`, or `b` per the UUID specification.

### 8. MAC Address

```
^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$
```

**Matches:** `00:1B:44:11:3A:B7`, `00-1B-44-11-3A-B7`

### 9. US ZIP Code

```
^\d{5}(?:-\d{4})?$
```

**Matches:** `90210`, `10001-1234`

### 10. Credit Card Number (Format Only)

```
^(?:4\d{12}(?:\d{3})?|5[1-5]\d{14}|3[47]\d{13}|6(?:011|5\d{2})\d{12})$
```

**Matches:** Visa (4...), Mastercard (51-55...), Amex (34/37...), Discover (6011/65...)

Note: This validates format only, not the Luhn checksum. Always use a proper payment library for real card validation.

---

## Extraction

### 11. HTML Tags

```
<(\w+)(?:\s[^>]*)?>[\s\S]*?<\/\1>
```

**Matches:** `<div>content</div>`, `<a href="#">link</a>`

Note: Regex is not suitable for parsing arbitrary HTML. Use a proper HTML parser for production work. This pattern handles simple, well-formed tags.

### 12. Content Between Quotes

```
"([^"\\]|\\.)*"
```

**Matches:** `"hello world"`, `"escaped \"quote\""`, `"line\nbreak"`

Handles escaped quotes inside the string by matching either a non-quote/non-backslash character or a backslash followed by any character.

### 13. JSON Key-Value Pairs

```
"(\w+)":\s*(?:"([^"]*)"|([\d.]+)|(true|false|null))
```

**Matches:** `"name": "John"`, `"age": 30`, `"active": true`, `"data": null`

Captures the key and value separately, handling string, number, boolean, and null values.

### 14. Markdown Links

```
\[([^\]]+)\]\(([^)]+)\)
```

**Matches:** `[text](https://example.com)`, `[click here](page.html)`
**Groups:** 1 = link text, 2 = URL

### 15. Markdown Headings

```
^(#{1,6})\s+(.+)$
```

**Matches:** `# Heading 1`, `## Heading 2`, `###### Heading 6`
**Groups:** 1 = hash marks (indicating level), 2 = heading text

Use with the `m` flag for multiline text.

---

## Text Processing

### 16. Duplicate Words

```
\b(\w+)\s+\1\b
```

**Matches:** `the the`, `is is`, `and and`

Uses a backreference (`\1`) to match a word that appears twice in a row. Useful for proofreading.

### 17. CamelCase to Separate Words

```
(?<=[a-z])(?=[A-Z])
```

**Usage:** In replacement mode, replace with a space (or hyphen, underscore).
`camelCaseVariable` becomes `camel Case Variable`

This uses a lookbehind and lookahead to find the boundary between a lowercase and uppercase letter without consuming any characters.

### 18. Trim Whitespace

```
^\s+|\s+$
```

**Matches:** Leading and trailing whitespace. Use with the `g` flag.
Replace with an empty string to trim.

### 19. Collapse Multiple Spaces

```
\s{2,}
```

**Matches:** Two or more consecutive whitespace characters.
Replace with a single space to normalize spacing.

### 20. Remove Empty Lines

```
^\s*\n
```

**Matches:** Lines that contain only whitespace. Use with `gm` flags.

### 21. Slug Generator

```
[^a-zA-Z0-9]+
```

Replace matches with `-` and convert to lowercase to generate URL slugs.
`Hello World! It's 2024` becomes `hello-world-it-s-2024`

---

## Web Development

### 22. CSS Hex Color

```
#(?:[0-9a-fA-F]{3}){1,2}\b
```

**Matches:** `#fff`, `#FF5733`, `#a1B2c3`

Handles both 3-digit and 6-digit hex colors.

### 23. CSS Property-Value Pair

```
([\w-]+)\s*:\s*([^;]+);
```

**Matches:** `color: red;`, `font-size: 16px;`, `background-color: #fff;`
**Groups:** 1 = property name, 2 = value

### 24. HTML Entity

```
&(?:#x?[\da-fA-F]+|\w+);
```

**Matches:** `&amp;`, `&#8212;`, `&#x2F;`, `&lt;`

### 25. JavaScript Import Statement

```
import\s+(?:(\w+)(?:\s*,\s*)?)?(?:\{([^}]+)\})?\s+from\s+['"]([^'"]+)['"]
```

**Matches:** `import React from 'react'`, `import { useState, useEffect } from 'react'`
**Groups:** 1 = default import, 2 = named imports, 3 = module path

---

## Data and Logs

### 26. Apache/Nginx Access Log

```
^(\S+) \S+ \S+ \[(.+?)\] "(\S+) (\S+) \S+" (\d{3}) (\d+)
```

**Groups:**
1. IP address
2. Timestamp
3. HTTP method
4. Request path
5. Status code
6. Response size

**Test:** `192.168.1.1 - - [17/Feb/2026:10:30:00 +0000] "GET /api/users HTTP/1.1" 200 1234`

### 27. JavaScript Stack Trace

```
at\s+(?:(.+?)\s+)?\(?([\w.\/\\-]+):(\d+):(\d+)\)?
```

**Groups:** 1 = function name, 2 = file path, 3 = line, 4 = column

### 28. Key=Value Pairs

```
(\w+)=([^\s&]+)
```

**Matches:** `name=John`, `age=30`, `active=true`

Useful for parsing query strings, configuration files, and log key-value pairs.

### 29. CSV Fields

```
(?:^|,)(?:"([^"]*(?:""[^"]*)*)"|([^,]*))
```

Handles quoted fields with escaped double quotes inside CSV data.

### 30. Semantic Version

```
(\d+)\.(\d+)\.(\d+)(?:-([\w.]+))?(?:\+([\w.]+))?
```

**Matches:** `1.0.0`, `2.3.1-beta.1`, `1.0.0-alpha+build.123`
**Groups:** 1 = major, 2 = minor, 3 = patch, 4 = prerelease, 5 = build metadata

---

## Dates and Times

### 31. Date (YYYY-MM-DD)

```
\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])
```

**Matches:** `2024-01-15`, `2026-12-31`
**Does not match:** `2024-13-01`, `2024-00-15`

Validates month (01-12) and day (01-31) ranges.

### 32. Date (MM/DD/YYYY or DD/MM/YYYY)

```
(0[1-9]|[12]\d|3[01])[\/\-](0[1-9]|1[0-2])[\/\-]\d{4}
```

**Matches:** `25/12/2024`, `01-06-2025`

### 33. ISO 8601 Timestamp

```
\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})
```

**Matches:** `2026-02-17T10:30:00Z`, `2026-02-17T10:30:00.123+05:30`

### 34. Time (12-hour)

```
(0?[1-9]|1[0-2]):[0-5]\d\s?(?:AM|PM|am|pm)
```

**Matches:** `2:30 PM`, `12:00am`, `09:45 AM`

---

## Numbers and Currency

### 35. Integer

```
^-?\d+$
```

**Matches:** `42`, `-7`, `0`, `1000000`

### 36. Decimal Number

```
^-?\d+\.?\d*$
```

**Matches:** `3.14`, `-0.5`, `42`, `100.00`

### 37. Number with Commas

```
^\d{1,3}(,\d{3})*(\.\d+)?$
```

**Matches:** `1,000`, `1,000,000.50`, `999`

### 38. Currency (USD)

```
\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?
```

**Matches:** `$9.99`, `$1,000`, `$1,000,000.00`

---

## Security

### 39. Strong Password Validation

```
^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$
```

Requires at least: one lowercase letter, one uppercase letter, one digit, one special character, minimum 8 characters total.

### 40. SQL Injection Indicators

```
(?:'(?:[^'\\]|\\.)*'|--|;|\b(?:SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|EXEC)\b)
```

Detects common SQL injection patterns. Use as a detection heuristic only — always use parameterized queries for actual SQL injection prevention.

### 41. XSS Detection Indicators

```
<script[\s>]|javascript:|on\w+\s*=
```

Detects common XSS payload patterns. Use as a logging/detection heuristic alongside proper output encoding.

---

## Tips for Using These Patterns

1. **Always test with edge cases.** Use Regex Tester Pro's multi-string mode to test both matching and non-matching inputs simultaneously.

2. **Anchor when validating.** Use `^` and `$` when validating entire strings (like email, phone). Omit them when extracting patterns from larger text.

3. **Enable appropriate flags.** Use `g` for finding all matches, `m` for multiline text, `i` for case-insensitive matching.

4. **Check for ReDoS.** Click the performance analyzer before using patterns in production, especially for server-side input validation.

5. **Export to your language.** After testing, use the Export button to generate code with correct flag translation for your target language.

---

**[Install Regex Tester Pro](https://chromewebstore.google.com/detail/regex-tester-pro-by-zovo/laljckjnohfcbhmlehjkcppkdfibldad)** — Test any pattern from this collection directly in your browser.
