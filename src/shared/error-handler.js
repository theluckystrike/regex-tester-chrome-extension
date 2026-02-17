// ==========================================================================
// Regex Tester Pro — Error Handler & Defensive Coding
// Safe wrappers, state recovery, debug logging, error boundaries
// ==========================================================================

const ErrorHandler = (() => {
    'use strict';

    const DEBUG = false; // Set true for development

    // ── Debug Logging ──
    function debugLog(...args) {
        if (DEBUG) {
            console.log('[RegexTesterPro]', ...args);
        }
    }

    function debugWarn(...args) {
        if (DEBUG) {
            console.warn('[RegexTesterPro]', ...args);
        }
    }

    function debugError(...args) {
        console.error('[RegexTesterPro]', ...args);
    }

    // ── Safe Storage Operations ──
    async function safeStorageGet(key, defaultValue = null) {
        try {
            const result = await chrome.storage.local.get(key);
            return result[key] ?? defaultValue;
        } catch (error) {
            debugError('Storage get failed:', error);
            return defaultValue;
        }
    }

    async function safeStorageSet(data) {
        try {
            await chrome.storage.local.set(data);
            return true;
        } catch (error) {
            debugError('Storage set failed:', error);
            return false;
        }
    }

    // ── State Recovery ──
    async function recoverCorruptedStorage() {
        try {
            const data = await chrome.storage.local.get(null);

            if (data.settings && typeof data.settings !== 'object') {
                debugWarn('Corrupted settings detected, resetting');
                await chrome.storage.local.set({ settings: Storage.DEFAULTS.settings });
            }

            if (data.history && !Array.isArray(data.history)) {
                debugWarn('Corrupted history detected, resetting');
                await chrome.storage.local.set({ history: [] });
            }

            debugLog('Storage integrity check complete');
        } catch (error) {
            debugError('Storage recovery failed:', error);
        }
    }

    // ── Global Error Handler ──
    function installGlobalHandler() {
        if (typeof window !== 'undefined') {
            window.addEventListener('unhandledrejection', (event) => {
                debugError('Unhandled promise rejection:', event.reason);
                event.preventDefault();
            });

            window.addEventListener('error', (event) => {
                debugError('Uncaught error:', event.error);
            });
        }
    }

    // ── User-facing error messages ──
    function showUserError(message, recoveryHint) {
        const errorLine = document.getElementById('errorLine');
        if (errorLine) {
            errorLine.textContent = message + (recoveryHint ? ` (${recoveryHint})` : '');
            errorLine.hidden = false;
            setTimeout(() => { errorLine.hidden = true; }, 5000);
        }
    }

    return {
        debugLog,
        debugWarn,
        debugError,
        safeStorageGet,
        safeStorageSet,
        recoverCorruptedStorage,
        installGlobalHandler,
        showUserError
    };
})();
