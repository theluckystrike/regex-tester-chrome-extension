// ==========================================================================
// Regex Tester Pro — Chrome Storage Wrapper
// Storage schema, history management, settings
// ==========================================================================

const Storage = (() => {
    'use strict';

    const DEFAULTS = {
        settings: {
            theme: 'system',
            defaultFlags: ['g'],
            autoSaveHistory: true
        },
        history: [],
        usage: {
            totalTests: 0,
            sessionCount: 0
        }
    };

    async function load() {
        const data = await chrome.storage.local.get(['settings', 'history', 'usage']);
        return {
            settings: { ...DEFAULTS.settings, ...(data.settings || {}) },
            history: Array.isArray(data.history) ? [...data.history] : [],
            usage: { ...DEFAULTS.usage, ...(data.usage || {}) }
        };
    }

    async function saveSettings(settings) {
        await chrome.storage.local.set({ settings });
    }

    async function saveHistory(history) {
        await chrome.storage.local.set({ history });
    }

    async function saveUsage(usage) {
        await chrome.storage.local.set({ usage });
    }

    async function incrementTests() {
        const { usage } = await chrome.storage.local.get('usage');
        const u = { ...DEFAULTS.usage, ...(usage || {}) };
        u.totalTests++;
        await saveUsage(u);
    }

    async function clearAll() {
        await chrome.storage.local.clear();
    }

    return {
        DEFAULTS,
        load,
        saveSettings,
        saveHistory,
        saveUsage,
        incrementTests,
        clearAll
    };
})();
