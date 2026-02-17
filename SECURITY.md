# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in Regex Tester Pro, please report it responsibly.

**Do NOT open a public issue for security vulnerabilities.**

Instead, please email us at: **hello@zovo.one**

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We will acknowledge receipt within 48 hours and aim to release a patch within 7 days for critical issues.

## Security Design

Regex Tester Pro is designed with privacy and security as core principles:

- **No external network requests** — All regex processing happens locally in your browser
- **No data collection** — We do not track, collect, or transmit any user data
- **No third-party scripts** — Zero external dependencies loaded at runtime
- **Manifest V3** — Built on Chrome's latest and most secure extension platform
- **Minimal permissions** — Only requests `storage`, `activeTab`, and `contextMenus`
- **Content Security Policy** — Strict CSP prevents code injection: `script-src 'self'; object-src 'self'`
- **Input sanitization** — All user input is escaped before DOM insertion to prevent XSS

## Scope

This security policy covers:
- The Chrome extension code in this repository
- The Chrome Web Store published version

It does NOT cover:
- Third-party forks or modifications
- Other Zovo extensions (they have their own policies)
