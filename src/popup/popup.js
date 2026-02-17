// ==========================================================================
// Regex Tester Pro — Core Popup Logic
// Real-time regex engine, match highlighting, capture groups, replace
// ==========================================================================

(function () {
    'use strict';

    // Install global error handler
    if (typeof ErrorHandler !== 'undefined' && ErrorHandler.installGlobalHandler) {
        ErrorHandler.installGlobalHandler();
    }

    // -- DOM refs --
    const patternInput = document.getElementById('patternInput');
    const testString = document.getElementById('testString');
    const highlightedLayer = document.getElementById('highlightedLayer');
    const errorLine = document.getElementById('errorLine');
    const matchCount = document.getElementById('matchCount');
    const matchResults = document.getElementById('matchResults');
    const groupSection = document.getElementById('groupSection');
    const groupResults = document.getElementById('groupResults');
    const replaceToggle = document.getElementById('replaceToggle');
    const replaceBody = document.getElementById('replaceBody');
    const replaceInput = document.getElementById('replaceInput');
    const replaceResult = document.getElementById('replaceResult');
    const flagsRow = document.getElementById('flagsRow');
    const copyBtn = document.getElementById('copyBtn');
    const savePatternBtn = document.getElementById('savePatternBtn');
    const themeToggle = document.getElementById('themeToggle');
    const settingsBtn = document.getElementById('settingsBtn');
    const usageFooter = document.getElementById('usageFooter');

    // Panels
    const historyPanel = document.getElementById('historyPanel');
    const historyOverlay = document.getElementById('historyOverlay');
    const historyList = document.getElementById('historyList');
    const historyCount = document.getElementById('historyCount');
    const closeHistory = document.getElementById('closeHistory');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');

    const settingsPanel = document.getElementById('settingsPanel');
    const settingsOverlay = document.getElementById('settingsOverlay');
    const closeSettings = document.getElementById('closeSettings');
    const themeSetting = document.getElementById('themeSetting');
    const autoSaveSetting = document.getElementById('autoSaveSetting');
    const defaultFlagsSetting = document.getElementById('defaultFlagsSetting');
    const versionText = document.getElementById('versionText');

    // -- State --
    let activeFlags = new Set(['g']);
    let settings = {};
    let history = [];

    // -- Init --
    async function init() {
        try {
            const data = await Storage.load();
            settings = data.settings;
            history = data.history;

            // Apply theme
            applyTheme(settings.theme);
            themeSetting.value = settings.theme;
            autoSaveSetting.checked = settings.autoSaveHistory;
            defaultFlagsSetting.value = settings.defaultFlags.join('');

            // Set default flags
            activeFlags = new Set(settings.defaultFlags);
            updateFlagButtons();

            // Version
            versionText.textContent = 'v' + chrome.runtime.getManifest().version;

            // Update UI
            updateUsageFooter();

            // If there's a pending test string from context menu
            const { pendingTestString } = await chrome.storage.local.get('pendingTestString');
            if (pendingTestString) {
                testString.value = pendingTestString;
                await chrome.storage.local.remove('pendingTestString');
                runEngine();
            }
        } catch (e) {
            console.error('[RegexTesterPro] Init failed:', e);
        }
    }

    // -- Regex Engine (debounced) --
    let _engineTimer = null;
    function runEngineDebounced() {
        clearTimeout(_engineTimer);
        _engineTimer = setTimeout(runEngine, 50);
    }

    function runEngine() {
        const pattern = patternInput.value;
        const text = testString.value;
        const flags = [...activeFlags].join('');

        // Clear previous
        highlightedLayer.innerHTML = '';
        matchResults.innerHTML = '';
        groupSection.hidden = true;
        groupResults.innerHTML = '';
        errorLine.hidden = true;
        matchCount.textContent = '0 found';

        if (!pattern) {
            highlightedLayer.textContent = text;
            matchResults.innerHTML = '<div class="empty-state">Enter a pattern to see matches</div>';
            updateReplace('', text, flags);
            return;
        }

        let regex;
        try {
            regex = new RegExp(pattern, flags);
        } catch (e) {
            errorLine.textContent = e.message.replace('Invalid regular expression: ', '');
            errorLine.hidden = false;
            highlightedLayer.textContent = text;
            return;
        }

        // Find all matches
        const matches = [];
        let m;

        if (flags.includes('g') || flags.includes('y')) {
            while ((m = regex.exec(text)) !== null) {
                matches.push({ value: m[0], index: m.index, groups: m.slice(1), namedGroups: m.groups });
                if (m[0].length === 0) { regex.lastIndex++; }
                if (matches.length > 500) break;
            }
        } else {
            m = regex.exec(text);
            if (m) {
                matches.push({ value: m[0], index: m.index, groups: m.slice(1), namedGroups: m.groups });
            }
        }

        // Match count with pulse animation
        matchCount.textContent = matches.length + ' found';
        matchCount.classList.remove('pulse');
        void matchCount.offsetWidth;
        if (matches.length > 0) matchCount.classList.add('pulse');

        // Update explainer
        updateExplainer(pattern);

        // Update performance badge
        updatePerfBadge(pattern, flags, text);

        // Highlighted layer
        highlightedLayer.innerHTML = buildHighlightedHTML(text, matches);

        // Match list
        if (matches.length > 0) {
            matchResults.innerHTML = matches.slice(0, 50).map((match, i) => {
                const end = match.index + match.value.length;
                return `<div class="match-item">
          <span class="match-value">${i + 1}. "${escapeHtml(match.value)}"</span>
          <span class="match-pos">pos ${match.index}-${end}</span>
        </div>`;
            }).join('');

            if (matches.length > 50) {
                matchResults.innerHTML += `<div class="empty-state">...and ${matches.length - 50} more</div>`;
            }
        } else {
            matchResults.innerHTML = '<div class="empty-state">No matches</div>';
        }

        // Capture groups (from first match)
        if (matches.length > 0 && (matches[0].groups.length > 0 || matches[0].namedGroups)) {
            groupSection.hidden = false;
            let groupHTML = '';

            matches[0].groups.forEach((val, i) => {
                groupHTML += `<div class="group-item">
          <span class="group-name">Group ${i + 1}</span>
          <span class="group-value">${escapeHtml(val || '(empty)')}</span>
        </div>`;
            });

            if (matches[0].namedGroups) {
                for (const [name, val] of Object.entries(matches[0].namedGroups)) {
                    groupHTML += `<div class="group-item">
            <span class="group-name">${escapeHtml(name)}</span>
            <span class="group-value">${escapeHtml(val || '(empty)')}</span>
          </div>`;
                }
            }

            groupResults.innerHTML = groupHTML;
        }

        // Replace
        updateReplace(pattern, text, flags);

        // Track usage
        Storage.incrementTests();
        updateUsageFooter();
    }

    function buildHighlightedHTML(text, matches) {
        if (matches.length === 0) return escapeHtml(text);

        let result = '';
        let lastIndex = 0;

        for (const match of matches) {
            result += escapeHtml(text.slice(lastIndex, match.index));
            result += '<mark>' + escapeHtml(match.value) + '</mark>';
            lastIndex = match.index + match.value.length;
        }

        result += escapeHtml(text.slice(lastIndex));
        return result;
    }

    function updateReplace(pattern, text, flags) {
        if (!replaceBody || replaceBody.hidden) return;
        const replacement = replaceInput.value;
        if (!pattern) {
            replaceResult.textContent = text;
            return;
        }
        try {
            const regex = new RegExp(pattern, flags);
            replaceResult.textContent = text.replace(regex, replacement);
        } catch (e) {
            replaceResult.textContent = '(invalid pattern)';
        }
    }

    // -- Flag Toggles --
    function updateFlagButtons() {
        flagsRow.querySelectorAll('.flag-btn').forEach(btn => {
            btn.classList.toggle('active', activeFlags.has(btn.dataset.flag));
        });
    }

    flagsRow.addEventListener('click', (e) => {
        const btn = e.target.closest('.flag-btn');
        if (!btn) return;
        const flag = btn.dataset.flag;
        if (activeFlags.has(flag)) {
            activeFlags.delete(flag);
        } else {
            activeFlags.add(flag);
        }
        updateFlagButtons();
        runEngine();
    });

    // -- Live Input (debounced) --
    patternInput.addEventListener('input', runEngineDebounced);
    testString.addEventListener('input', runEngineDebounced);
    testString.addEventListener('scroll', () => {
        highlightedLayer.scrollTop = testString.scrollTop;
        highlightedLayer.scrollLeft = testString.scrollLeft;
    });

    // -- Replace Toggle --
    replaceToggle.addEventListener('click', () => {
        const isHidden = replaceBody.hidden;
        replaceBody.hidden = !isHidden;
        replaceToggle.classList.toggle('open', isHidden);
        if (isHidden) runEngine();
    });
    replaceInput.addEventListener('input', () => {
        updateReplace(patternInput.value, testString.value, [...activeFlags].join(''));
    });

    // -- Copy --
    copyBtn.addEventListener('click', () => {
        const pattern = patternInput.value;
        const flags = [...activeFlags].join('');
        navigator.clipboard.writeText(`/${pattern}/${flags}`).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1500);
        });
    });

    // -- Save Pattern --
    savePatternBtn.addEventListener('click', async () => {
        const pattern = patternInput.value;
        if (!pattern) return;

        const entry = {
            id: Date.now().toString(36),
            pattern,
            flags: [...activeFlags].join(''),
            testString: testString.value.slice(0, 200),
            timestamp: Date.now()
        };

        history.unshift(entry);

        await Storage.saveHistory(history);
        updateUsageFooter();

        savePatternBtn.textContent = 'Saved!';
        setTimeout(() => { savePatternBtn.textContent = 'Save'; }, 1500);
    });

    // -- History Panel --
    savePatternBtn.addEventListener('dblclick', () => openHistoryPanel());

    function openHistoryPanel() {
        renderHistory();
        historyPanel.hidden = false;
        historyOverlay.hidden = false;
    }

    function closeHistoryPanel() {
        historyPanel.hidden = true;
        historyOverlay.hidden = true;
    }

    function renderHistory() {
        historyCount.textContent = `${history.length} saved`;

        if (history.length === 0) {
            historyList.innerHTML = '<div class="empty-state">No saved patterns yet</div>';
            return;
        }

        historyList.innerHTML = history.map(item => {
            const date = new Date(item.timestamp).toLocaleDateString();
            return `<div class="history-item" data-id="${item.id}">
        <div class="history-pattern">/${escapeHtml(item.pattern)}/${item.flags}</div>
        <div class="history-meta">${date}</div>
      </div>`;
        }).join('');
    }

    historyList.addEventListener('click', (e) => {
        const item = e.target.closest('.history-item');
        if (!item) return;
        const entry = history.find(h => h.id === item.dataset.id);
        if (entry) {
            patternInput.value = entry.pattern;
            activeFlags = new Set(entry.flags.split(''));
            updateFlagButtons();
            if (entry.testString) testString.value = entry.testString;
            runEngine();
            closeHistoryPanel();
        }
    });

    closeHistory.addEventListener('click', closeHistoryPanel);
    historyOverlay.addEventListener('click', closeHistoryPanel);
    clearHistoryBtn.addEventListener('click', async () => {
        history = [];
        await Storage.saveHistory(history);
        renderHistory();
        updateUsageFooter();
    });

    // -- Settings Panel --
    settingsBtn.addEventListener('click', () => {
        settingsPanel.hidden = false;
        settingsOverlay.hidden = false;
    });

    function closeSettingsPanel() {
        settingsPanel.hidden = true;
        settingsOverlay.hidden = true;
    }

    closeSettings.addEventListener('click', closeSettingsPanel);
    settingsOverlay.addEventListener('click', closeSettingsPanel);

    // Guide link in settings panel
    document.getElementById('openGuideLink').addEventListener('click', (e) => {
        e.preventDefault();
        chrome.tabs.create({ url: chrome.runtime.getURL('src/guide/guide.html') });
    });

    // Help Center button in header
    document.getElementById('helpBtn').addEventListener('click', () => {
        chrome.tabs.create({ url: chrome.runtime.getURL('src/help/help.html') });
    });

    themeSetting.addEventListener('change', (e) => {
        settings.theme = e.target.value;
        applyTheme(settings.theme);
        Storage.saveSettings(settings);
    });

    autoSaveSetting.addEventListener('change', (e) => {
        settings.autoSaveHistory = e.target.checked;
        Storage.saveSettings(settings);
    });

    defaultFlagsSetting.addEventListener('change', (e) => {
        settings.defaultFlags = e.target.value.split('');
        Storage.saveSettings(settings);
    });

    // -- Theme --
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else if (theme === 'light') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
        }
    }

    themeToggle.addEventListener('click', () => {
        const current = settings.theme;
        const next = current === 'system' ? 'dark' : current === 'dark' ? 'light' : 'system';
        settings.theme = next;
        applyTheme(next);
        Storage.saveSettings(settings);
    });

    // -- Usage Footer --
    function updateUsageFooter() {
        usageFooter.textContent = `History: ${history.length} saved`;
    }

    // -- Samples Panel --
    const samplesBtn = document.getElementById('samplesBtn');
    const samplesPanel = document.getElementById('samplesPanel');
    const samplesOverlay = document.getElementById('samplesOverlay');
    const closeSamples = document.getElementById('closeSamples');
    const samplesCategoryTabs = document.getElementById('samplesCategoryTabs');
    const samplesList = document.getElementById('samplesList');
    let activeSampleCategory = null;

    samplesBtn.addEventListener('click', () => {
        openSamplesPanel();
    });

    function openSamplesPanel() {
        if (typeof RegexSamples === 'undefined') return;
        const categories = RegexSamples.getCategories();
        if (!activeSampleCategory) activeSampleCategory = categories[0];

        samplesCategoryTabs.innerHTML = categories.map(cat =>
            `<button class="samples-cat-btn${cat === activeSampleCategory ? ' active' : ''}" data-cat="${escapeHtml(cat)}">${escapeHtml(cat)}</button>`
        ).join('');

        renderSamples(activeSampleCategory);
        samplesPanel.hidden = false;
        samplesOverlay.hidden = false;
    }

    function closeSamplesPanel() {
        samplesPanel.hidden = true;
        samplesOverlay.hidden = true;
    }

    function renderSamples(category) {
        const items = RegexSamples.getByCategory(category);
        samplesList.innerHTML = items.map((s, i) =>
            `<div class="sample-card" data-cat="${escapeHtml(s.category)}" data-idx="${i}">
                <div class="sample-card-name">${escapeHtml(s.name)}</div>
                <div class="sample-card-desc">${escapeHtml(s.description)}</div>
                <div class="sample-card-pattern">/${escapeHtml(s.pattern)}/${s.flags}</div>
            </div>`
        ).join('');
    }

    samplesCategoryTabs.addEventListener('click', (e) => {
        const btn = e.target.closest('.samples-cat-btn');
        if (!btn) return;
        activeSampleCategory = btn.dataset.cat;
        samplesCategoryTabs.querySelectorAll('.samples-cat-btn').forEach(b =>
            b.classList.toggle('active', b.dataset.cat === activeSampleCategory)
        );
        renderSamples(activeSampleCategory);
    });

    samplesList.addEventListener('click', (e) => {
        const card = e.target.closest('.sample-card');
        if (!card) return;
        const cat = card.dataset.cat;
        const idx = parseInt(card.dataset.idx, 10);
        const items = RegexSamples.getByCategory(cat);
        const sample = items[idx];
        if (!sample) return;

        patternInput.value = sample.pattern;
        activeFlags = new Set(sample.flags.split(''));
        updateFlagButtons();
        testString.value = sample.testString;

        if (sample.category.includes('Replace')) {
            replaceBody.hidden = false;
            replaceToggle.classList.add('open');
        }

        runEngine();
        closeSamplesPanel();
    });

    closeSamples.addEventListener('click', closeSamplesPanel);
    samplesOverlay.addEventListener('click', closeSamplesPanel);

    // -- Toast Notification System --
    const toastContainer = document.getElementById('toastContainer');
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);
        setTimeout(() => toast.remove(), 2600);
    }

    // -- Pattern Explainer --
    const explainerToggle = document.getElementById('explainerToggle');
    const explainerBody = document.getElementById('explainerBody');
    const explainerList = document.getElementById('explainerList');

    explainerToggle.addEventListener('click', () => {
        const isOpen = !explainerBody.hidden;
        explainerBody.hidden = isOpen;
        explainerToggle.classList.toggle('open', !isOpen);
        if (!isOpen) updateExplainer(patternInput.value);
    });

    function updateExplainer(pattern) {
        if (explainerBody.hidden) return;
        if (typeof RegexExplainer === 'undefined') return;

        if (!pattern) {
            explainerList.innerHTML = '<div class="empty-state" style="font-size:11px">Type a pattern to see a breakdown</div>';
            return;
        }

        const tokens = RegexExplainer.explain(pattern);
        explainerList.innerHTML = tokens.map(t =>
            `<div class="explainer-row">
                <span class="explainer-token">${escapeHtml(t.token)}</span>
                <span class="explainer-desc">${escapeHtml(t.description.replace(t.token + ' \u2014 ', ''))}</span>
            </div>`
        ).join('');
    }

    // -- Code Export Panel --
    const codeExportBtn = document.getElementById('codeExportBtn');
    const codeExportPanel = document.getElementById('codeExportPanel');
    const codeExportOverlay = document.getElementById('codeExportOverlay');
    const closeCodeExport = document.getElementById('closeCodeExport');
    const codeLangTabs = document.getElementById('codeLangTabs');
    const codeExportOutput = document.getElementById('codeExportOutput');
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    let activeCodeLang = 'javascript';

    codeExportBtn.addEventListener('click', () => {
        if (!patternInput.value) {
            showToast('Enter a pattern first', 'warning');
            return;
        }
        openCodeExportPanel();
    });

    function openCodeExportPanel() {
        if (typeof CodeExport === 'undefined') return;
        const langs = CodeExport.getLanguages();

        codeLangTabs.innerHTML = langs.map(l =>
            `<button class="code-lang-btn${l.id === activeCodeLang ? ' active' : ''}" data-lang="${l.id}">${l.icon} ${l.name}</button>`
        ).join('');

        renderCodeExport(activeCodeLang);
        codeExportPanel.hidden = false;
        codeExportOverlay.hidden = false;
    }

    function closeCodeExportPanel() {
        codeExportPanel.hidden = true;
        codeExportOverlay.hidden = true;
    }

    function renderCodeExport(lang) {
        const pattern = patternInput.value;
        const flags = [...activeFlags].join('');
        codeExportOutput.textContent = CodeExport.generate(pattern, flags, lang);
    }

    codeLangTabs.addEventListener('click', (e) => {
        const btn = e.target.closest('.code-lang-btn');
        if (!btn) return;
        activeCodeLang = btn.dataset.lang;
        codeLangTabs.querySelectorAll('.code-lang-btn').forEach(b =>
            b.classList.toggle('active', b.dataset.lang === activeCodeLang)
        );
        renderCodeExport(activeCodeLang);
    });

    copyCodeBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(codeExportOutput.textContent);
            showToast('Code copied to clipboard!', 'success');
        } catch {
            showToast('Failed to copy', 'error');
        }
    });

    closeCodeExport.addEventListener('click', closeCodeExportPanel);
    codeExportOverlay.addEventListener('click', closeCodeExportPanel);

    // -- Performance Analyzer --
    const perfBadge = document.getElementById('perfBadge');

    function updatePerfBadge(pattern, flags, text) {
        if (typeof PerfAnalyzer === 'undefined' || !pattern) {
            perfBadge.hidden = true;
            return;
        }

        const result = PerfAnalyzer.analyze(pattern);
        perfBadge.hidden = false;
        perfBadge.className = 'perf-badge ' + result.score;
        perfBadge.textContent = result.icon + ' ' + result.label;

        if (result.issues.length > 0) {
            perfBadge.title = result.issues.map(i => i.label + ' - ' + i.tip).join('\n');
        } else {
            perfBadge.title = 'Pattern is safe for production use';
        }
    }

    // -- Quick Insert Palette --
    const qiToggle = document.getElementById('qiToggle');
    const qiPalette = document.getElementById('qiPalette');

    qiToggle.addEventListener('click', () => {
        const isOpen = !qiPalette.hidden;
        qiPalette.hidden = isOpen;
        if (!isOpen && typeof QuickInsert !== 'undefined') {
            renderQuickInsert();
        }
    });

    function renderQuickInsert() {
        const groups = QuickInsert.getGroups();
        qiPalette.innerHTML = groups.map(g =>
            `<div class="qi-group-title">${g.title}</div>
             <div class="qi-items">
                ${g.items.map(item =>
                `<button class="qi-item" data-insert="${escapeHtml(item.insert)}" title="${escapeHtml(item.desc)}">${escapeHtml(item.label)}</button>`
            ).join('')}
             </div>`
        ).join('');
    }

    qiPalette.addEventListener('click', (e) => {
        const btn = e.target.closest('.qi-item');
        if (!btn) return;
        const insert = btn.dataset.insert;
        const el = patternInput;
        const start = el.selectionStart;
        const end = el.selectionEnd;
        const before = el.value.slice(0, start);
        const after = el.value.slice(end);
        el.value = before + insert + after;
        el.selectionStart = el.selectionEnd = start + insert.length;
        el.focus();
        runEngineDebounced();
        showToast('Inserted: ' + insert, 'info');
    });

    document.addEventListener('click', (e) => {
        if (!qiPalette.hidden && !e.target.closest('.quick-insert-bar')) {
            qiPalette.hidden = true;
        }
    });

    // -- Multi-Test Mode --
    const multiTestBtn = document.getElementById('multiTestBtn');
    const multiTestSection = document.getElementById('multiTestSection');
    const multiTestResults = document.getElementById('multiTestResults');
    const closeMultiTest = document.getElementById('closeMultiTest');
    let multiTestActive = false;

    multiTestBtn.addEventListener('click', () => {
        const pattern = patternInput.value;
        if (!pattern) {
            showToast('Enter a pattern first', 'warning');
            return;
        }

        const text = testString.value;
        if (!text) {
            showToast('Enter test strings (one per line)', 'warning');
            return;
        }

        multiTestActive = true;
        multiTestSection.hidden = false;
        runMultiTest();
    });

    closeMultiTest.addEventListener('click', () => {
        multiTestActive = false;
        multiTestSection.hidden = true;
    });

    function runMultiTest() {
        if (!multiTestActive) return;

        const pattern = patternInput.value;
        const flags = [...activeFlags].join('').replace('g', '');
        const lines = testString.value.split('\n').filter(l => l.length > 0);

        if (!pattern || lines.length === 0) {
            multiTestResults.innerHTML = '<div class="empty-state" style="font-size:11px">Enter test strings (one per line)</div>';
            return;
        }

        let regex;
        try { regex = new RegExp(pattern, flags); } catch { return; }

        let passCount = 0;
        const rows = lines.map(line => {
            const match = regex.test(line);
            if (match) passCount++;
            return `<div class="mt-row ${match ? 'pass' : 'fail'}">
                <span class="mt-icon">${match ? 'PASS' : 'FAIL'}</span>
                <span class="mt-text">${escapeHtml(line)}</span>
            </div>`;
        });

        multiTestResults.innerHTML = rows.join('') +
            `<div class="mt-summary">
                <span>Passed: ${passCount}</span>
                <span>Failed: ${lines.length - passCount}</span>
                <span>${lines.length} total</span>
            </div>`;
    }

    patternInput.addEventListener('input', () => { if (multiTestActive) runMultiTest(); });
    testString.addEventListener('input', () => { if (multiTestActive) runMultiTest(); });

    // -- Share Pattern --
    const shareBtn = document.getElementById('shareBtn');

    shareBtn.addEventListener('click', async () => {
        const pattern = patternInput.value;
        if (!pattern) {
            showToast('Enter a pattern first', 'warning');
            return;
        }

        const flags = [...activeFlags].join('');
        const text = testString.value;

        const snippet = {
            tool: 'Regex Tester Pro',
            pattern: pattern,
            flags: flags,
            testString: text.slice(0, 500),
            regex: '/' + pattern + '/' + flags
        };

        const json = JSON.stringify(snippet, null, 2);

        try {
            await navigator.clipboard.writeText(json);
            showToast('Pattern snippet copied!', 'success');
        } catch {
            showToast('Failed to copy', 'error');
        }
    });

    // -- Cheat Sheet Panel --
    const cheatSheetBtn = document.getElementById('cheatSheetBtn');
    const cheatSheetPanel = document.getElementById('cheatSheetPanel');
    const cheatSheetOverlay = document.getElementById('cheatSheetOverlay');
    const closeCheatSheet = document.getElementById('closeCheatSheet');

    cheatSheetBtn.addEventListener('click', () => {
        cheatSheetPanel.hidden = false;
        cheatSheetOverlay.hidden = false;
    });

    function closeCheatSheetPanel() {
        cheatSheetPanel.hidden = true;
        cheatSheetOverlay.hidden = true;
    }

    closeCheatSheet.addEventListener('click', closeCheatSheetPanel);
    cheatSheetOverlay.addEventListener('click', closeCheatSheetPanel);

    // -- Keyboard Shortcuts --
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSamplesPanel();
            closeCheatSheetPanel();
            closeCodeExportPanel();
            qiPalette.hidden = true;
            if (multiTestActive) { multiTestActive = false; multiTestSection.hidden = true; }
            if (!historyPanel.hidden) { historyPanel.hidden = true; historyOverlay.hidden = true; }
            if (!settingsPanel.hidden) { settingsPanel.hidden = true; settingsOverlay.hidden = true; }
            return;
        }

        const mod = e.ctrlKey || e.metaKey;
        if (!mod) return;

        switch (e.key.toLowerCase()) {
            case 'e':
                e.preventDefault();
                openSamplesPanel();
                break;
            case 's':
                e.preventDefault();
                savePatternBtn.click();
                break;
            case 'h':
                e.preventDefault();
                openHistoryPanel();
                break;
        }
    });

    // -- First-Run Demo --
    (async function firstRunDemo() {
        try {
            const { firstRunDone } = await chrome.storage.local.get('firstRunDone');
            if (firstRunDone) return;
            if (typeof RegexSamples === 'undefined') return;

            await new Promise(r => setTimeout(r, 100));

            if (patternInput.value || testString.value) return;

            const validationSamples = RegexSamples.getAll().filter(s => s.name === 'Email Address');
            const sample = validationSamples[0] || RegexSamples.getAll()[0];
            if (sample) {
                patternInput.value = sample.pattern;
                activeFlags = new Set(sample.flags.split(''));
                updateFlagButtons();
                testString.value = sample.testString;
                runEngine();
            }
            await chrome.storage.local.set({ firstRunDone: true });
        } catch (e) { /* non-critical */ }
    })();

    // -- Helpers --
    function escapeHtml(str) {
        if (typeof str !== 'string') return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // -- Start --
    init();
})();
