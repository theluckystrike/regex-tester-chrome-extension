// ==========================================================================
// Regex Tester Pro — Sample Patterns Library
// 40+ curated examples across 8 categories
// ==========================================================================

const RegexSamples = (() => {
    'use strict';

    const samples = [
        // Basics
        {
            category: 'Basics',
            name: 'Match Words',
            description: 'Find every word in a sentence',
            pattern: '\\w+',
            flags: 'g',
            testString: 'Hello World! Regex is awesome 123.'
        },
        {
            category: 'Basics',
            name: 'Match Numbers',
            description: 'Extract all integers from text',
            pattern: '\\d+',
            flags: 'g',
            testString: 'Order #4521 has 3 items totaling $149.99 shipped on 2024-01-15.'
        },
        {
            category: 'Basics',
            name: 'Match Lines Starting With',
            description: 'Find lines starting with a dash (list items)',
            pattern: '^- .+$',
            flags: 'gm',
            testString: 'Shopping list:\n- Milk\n- Eggs\n- Bread\nDon\'t forget!\n- Butter'
        },
        {
            category: 'Basics',
            name: 'Match Sentences',
            description: 'Extract complete sentences ending with punctuation',
            pattern: '[A-Z][^.!?]*[.!?]',
            flags: 'g',
            testString: 'Hello there! How are you? I am fine. Thanks for asking! See you later.'
        },
        {
            category: 'Basics',
            name: 'Match Quoted Strings',
            description: 'Find text inside double quotes',
            pattern: '"([^"]*)"',
            flags: 'g',
            testString: 'He said "hello" and she replied "goodbye" before the "end".'
        },

        // Validation
        {
            category: 'Validation',
            name: 'Email Address',
            description: 'Validate standard email format',
            pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
            flags: 'g',
            testString: 'Valid: hello@zovo.one, user.name+tag@example.co.uk\nInvalid: user@, @domain.com, test@.com, plain-text'
        },
        {
            category: 'Validation',
            name: 'URL (HTTP/HTTPS)',
            description: 'Match web URLs with protocol',
            pattern: 'https?://[\\w\\-._~:/?#\\[\\]@!$&\'()*+,;=%]+',
            flags: 'gi',
            testString: 'Visit https://zovo.one or http://example.com/path?q=test&lang=en\nNot URLs: ftp://server, just-text, www.missing-protocol.com'
        },
        {
            category: 'Validation',
            name: 'Phone Number',
            description: 'Match international phone formats',
            pattern: '\\+?\\d{1,3}[-.\\s]?\\(?\\d{1,4}\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}',
            flags: 'g',
            testString: 'US: +1 (555) 123-4567\nUK: +44 20 7946 0958\nDE: +49 30 12345678\nSimple: 555.987.6543'
        },
        {
            category: 'Validation',
            name: 'Credit Card Number',
            description: 'Detect common card number patterns',
            pattern: '\\b(?:\\d[ -]*?){13,19}\\b',
            flags: 'g',
            testString: 'Visa: 4111 1111 1111 1111\nMastercard: 5500-0000-0000-0004\nAmex: 378282246310005\nNot a card: 123456'
        },
        {
            category: 'Validation',
            name: 'Strong Password',
            description: 'Check for 8+ chars with upper, lower, digit, special',
            pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
            flags: 'gm',
            testString: 'Str0ng@Pass\nweak\n12345678\nNoSpecial1\nGood$ecure1\nab1!'
        },

        // Extraction
        {
            category: 'Extraction',
            name: 'IPv4 Addresses',
            description: 'Find all IP addresses in logs',
            pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b',
            flags: 'g',
            testString: '[2024-01-15] 192.168.1.1 connected\n[ERROR] Blocked: 10.0.0.255\nProxy: 203.0.113.42 > 172.16.0.1'
        },
        {
            category: 'Extraction',
            name: 'Dates (YYYY-MM-DD)',
            description: 'Extract ISO-format dates',
            pattern: '\\d{4}[-/]\\d{2}[-/]\\d{2}',
            flags: 'g',
            testString: 'Created: 2024-01-15\nDue: 2024/03/22\nLaunch: 2025-12-31\nInvalid: 2024-1-5'
        },
        {
            category: 'Extraction',
            name: 'Hex Color Codes',
            description: 'Match CSS hex colors (3 and 6 digit)',
            pattern: '#(?:[0-9a-fA-F]{3}){1,2}\\b',
            flags: 'gi',
            testString: 'Primary: #6366f1\nBackground: #fff\nError: #FF5733\nBorder: #E0E7FF\nNot hex: #xyz, #12'
        },
        {
            category: 'Extraction',
            name: 'Hashtags',
            description: 'Extract social media hashtags',
            pattern: '#[a-zA-Z0-9_]+',
            flags: 'g',
            testString: 'Check out #RegexTesterPro by #Zovo! Best #developer #tools for #productivity and #WebDev'
        },
        {
            category: 'Extraction',
            name: 'Price Amounts',
            description: 'Find currency amounts in various formats',
            pattern: '[$\\u20ac\\u00a3\\u00a5]\\s?\\d+(?:[.,]\\d{1,2})?|\\d+(?:[.,]\\d{1,2})?\\s?(?:USD|EUR|GBP|JPY)',
            flags: 'g',
            testString: 'Prices: $29.99, EUR49.50, GBP120\nAlso: 199.99 USD, 45 EUR, 30.00 GBP'
        },

        // Advanced
        {
            category: 'Advanced',
            name: 'Capture Groups',
            description: 'Extract first and last name separately',
            pattern: '(\\w+)\\s(\\w+)',
            flags: 'g',
            testString: 'Team: John Smith, Jane Doe, Bob Wilson, Alice Chang'
        },
        {
            category: 'Advanced',
            name: 'Named Groups',
            description: 'Parse dates with labeled year, month, day',
            pattern: '(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})',
            flags: 'g',
            testString: 'Born: 1990-05-23\nHired: 2020-09-01\nDeadline: 2025-12-31'
        },
        {
            category: 'Advanced',
            name: 'Positive Lookahead',
            description: 'Match words followed by a colon (keys in key:value)',
            pattern: '\\w+(?=:)',
            flags: 'g',
            testString: 'name: John\nage: 30\ncity: Berlin\nrole: developer\nstatus: active'
        },
        {
            category: 'Advanced',
            name: 'Negative Lookahead',
            description: 'Match numbers NOT followed by px or em',
            pattern: '\\d+(?!px|em)',
            flags: 'g',
            testString: 'width: 100px, height: 200em, count: 42, size: 16px, total: 999'
        },
        {
            category: 'Advanced',
            name: 'Non-Greedy Match',
            description: 'Greedy vs lazy — match shortest HTML tags',
            pattern: '<.+?>',
            flags: 'g',
            testString: '<div class="box"><span>Hello</span><br/><p>World</p></div>'
        },
        {
            category: 'Advanced',
            name: 'Backreference: Repeated Words',
            description: 'Find accidentally duplicated words',
            pattern: '\\b(\\w+)\\s+\\1\\b',
            flags: 'gi',
            testString: 'This is is a test test of the the duplicate word word finder.'
        },

        // Web Dev
        {
            category: 'Web Dev',
            name: 'HTML Tags',
            description: 'Match all HTML opening and closing tags',
            pattern: '<\\/?[a-z][a-z0-9]*[^>]*>',
            flags: 'gi',
            testString: '<div class="container">\n  <h1>Title</h1>\n  <p>Text <strong>bold</strong></p>\n  <img src="photo.jpg" />\n</div>'
        },
        {
            category: 'Web Dev',
            name: 'CSS Properties',
            description: 'Extract CSS property: value pairs',
            pattern: '([\\w-]+)\\s*:\\s*([^;]+)',
            flags: 'g',
            testString: 'color: #6366f1;\nfont-size: 14px;\nbackground-color: rgba(0,0,0,0.5);\nmargin: 10px 20px;\ndisplay: flex;'
        },
        {
            category: 'Web Dev',
            name: 'JavaScript Import',
            description: 'Parse ES6 import statements',
            pattern: 'import\\s+(?:{([^}]+)}|([\\w]+))\\s+from\\s+[\'"]([^\'"]+)[\'"]',
            flags: 'g',
            testString: 'import React from \'react\';\nimport { useState, useEffect } from \'react\';\nimport axios from \'axios\';\nimport { Button } from \'@mui/material\';'
        },
        {
            category: 'Web Dev',
            name: 'JSON Keys',
            description: 'Extract keys from JSON objects',
            pattern: '"(\\w+)"\\s*:',
            flags: 'g',
            testString: '{"name": "Zovo", "version": "1.0.0", "description": "Regex Tester", "author": "Zovo Team", "license": "MIT"}'
        },
        {
            category: 'Web Dev',
            name: 'API Endpoint Paths',
            description: 'Match REST API routes with path params',
            pattern: '(?:GET|POST|PUT|DELETE|PATCH)\\s+\\/[\\w/:?&=.-]+',
            flags: 'g',
            testString: 'GET /api/users\nPOST /api/users/:id/profile\nDELETE /api/posts/123\nPUT /api/settings?theme=dark\nPATCH /api/v2/orders/:orderId'
        },

        // Data & Logs
        {
            category: 'Data & Logs',
            name: 'Log Levels',
            description: 'Extract log severity levels',
            pattern: '\\[(INFO|WARN|ERROR|DEBUG|FATAL)\\]',
            flags: 'g',
            testString: '[INFO] Server started on port 3000\n[WARN] Deprecated API call from 192.168.1.5\n[ERROR] Database connection failed\n[DEBUG] Query took 45ms\n[FATAL] Out of memory'
        },
        {
            category: 'Data & Logs',
            name: 'Timestamps',
            description: 'Match ISO 8601 datetime strings',
            pattern: '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(?:\\.\\d+)?(?:Z|[+-]\\d{2}:?\\d{2})',
            flags: 'g',
            testString: '2024-01-15T09:30:00Z\n2024-03-22T14:15:30.123Z\n2025-12-31T23:59:59+05:30\n2024-06-01T00:00:00-08:00'
        },
        {
            category: 'Data & Logs',
            name: 'CSV Fields',
            description: 'Parse comma-separated values (handles quoted fields)',
            pattern: '(?:^|,)("(?:[^"]|"")*"|[^,]*)',
            flags: 'g',
            testString: 'John,Doe,"New York, NY",30,"Software Engineer"\nJane,Smith,London,25,"Product Manager"'
        },
        {
            category: 'Data & Logs',
            name: 'Stack Trace Files',
            description: 'Extract file paths and line numbers from errors',
            pattern: '(?:at\\s+)?([\\w./\\\\-]+\\.(?:js|ts|py|java|rb))(?::(\\d+))?',
            flags: 'g',
            testString: 'Error: Cannot read property\n  at src/popup/popup.js:125\n  at utils/helpers.ts:42\n  at node_modules/express/lib/router.js:300\n  at app.py:88'
        },
        {
            category: 'Data & Logs',
            name: 'UUID v4',
            description: 'Match UUID/GUID identifiers',
            pattern: '[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}',
            flags: 'gi',
            testString: 'User: 550e8400-e29b-41d4-a716-446655440000\nSession: 6ba7b810-9dad-41d4-80b4-00c04fd430c8\nNot UUID: 12345678-1234-1234-1234-123456789012'
        },

        // International
        {
            category: 'International',
            name: 'Unicode Letters',
            description: 'Match words in any language (Unicode-aware)',
            pattern: '[\\p{L}]+',
            flags: 'gu',
            testString: 'English: Hello\nFrench: Bonjour\nJapanese: \u3053\u3093\u306b\u3061\u306f\nKorean: \uc548\ub155\ud558\uc138\uc694\nRussian: \u041f\u0440\u0438\u0432\u0435\u0442'
        },
        {
            category: 'International',
            name: 'Emoji Detection',
            description: 'Find all emoji characters in text',
            pattern: '[\\p{Emoji_Presentation}\\p{Extended_Pictographic}]',
            flags: 'gu',
            testString: 'Great job! \ud83c\udf89 Love this \ud83d\ude80 extension \u2764\ufe0f Best regex tool \ud83d\udd25 ever made \ud83d\udcaf by Zovo \u2b50'
        },
        {
            category: 'International',
            name: 'CJK Characters',
            description: 'Match Chinese, Japanese, or Korean characters',
            pattern: '[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]+',
            flags: 'g',
            testString: 'Chinese: \u4f60\u597d\u4e16\u754c (hello world)\nJapanese: \u6b63\u898f\u8868\u73fe\u30c6\u30b9\u30c8 (regex test)\nKorean: \uc815\uaddc\uc2dd \ud14c\uc2a4\ud130 (regex tester)'
        },
        {
            category: 'International',
            name: 'European Postal Codes',
            description: 'Match postal codes from multiple countries',
            pattern: '\\b(?:\\d{5}(?:-\\d{4})?|[A-Z]{1,2}\\d[A-Z\\d]?\\s?\\d[A-Z]{2}|\\d{4}\\s?[A-Z]{2}|\\d{3}-\\d{4})\\b',
            flags: 'g',
            testString: 'US: 90210, 10001-2345\nUK: SW1A 1AA, EC2R 8AH\nNL: 1012 AB\nJP: 100-0001\nDE: 10115'
        },

        // Replace
        {
            category: 'Replace',
            name: 'Strip HTML Tags',
            description: 'Remove all HTML markup, keep text only',
            pattern: '<[^>]+>',
            flags: 'g',
            testString: '<h1>Hello</h1>\n<p>This is <strong>bold</strong> and <em>italic</em> text.</p>\n<a href="#">Click me</a>'
        },
        {
            category: 'Replace',
            name: 'Collapse Whitespace',
            description: 'Reduce multiple spaces/tabs to a single space',
            pattern: '\\s{2,}',
            flags: 'g',
            testString: 'Too   many    spaces   between\t\tthese\t  words   here.'
        },
        {
            category: 'Replace',
            name: 'camelCase to kebab-case',
            description: 'Convert camelCase to kebab-case CSS format',
            pattern: '([a-z])([A-Z])',
            flags: 'g',
            testString: 'backgroundColor\nfontSize\nmarginTop\nborderRadius\nmaxWidth\ntextDecoration'
        },
        {
            category: 'Replace',
            name: 'Mask Sensitive Data',
            description: 'Replace emails and phone numbers with [REDACTED]',
            pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}|\\+?\\d[\\d\\s.-]{7,}\\d',
            flags: 'g',
            testString: 'Contact john@example.com or call +1-555-123-4567.\nAlternate: jane.doe@company.co.uk and +44 20 7946 0958.'
        },
        {
            category: 'Replace',
            name: 'Format Markdown Links',
            description: 'Convert raw URLs to Markdown link format',
            pattern: '(https?://[^\\s]+)',
            flags: 'g',
            testString: 'Check out https://zovo.one for extensions.\nDocs at https://github.com/zovo/docs\nBlog: https://zovo.one/blog/regex-tips'
        }
    ];

    function getCategories() {
        const cats = [];
        const seen = new Set();
        for (const s of samples) {
            if (!seen.has(s.category)) {
                seen.add(s.category);
                cats.push(s.category);
            }
        }
        return cats;
    }

    function getByCategory(category) {
        return samples.filter(s => s.category === category);
    }

    function getAll() {
        return samples;
    }

    return { getCategories, getByCategory, getAll };
})();
