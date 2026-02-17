// ==========================================================================
// Regex Tester Pro — Service Worker
// Lifecycle, context menu, onboarding
// ==========================================================================

// ── Context Menu ──
chrome.runtime.onInstalled.addListener((details) => {
    // Create context menu (remove first to avoid duplicates on update)
    chrome.contextMenus.removeAll(() => {
        chrome.contextMenus.create({
            id: 'test-regex-selection',
            title: 'Test regex on "%s"',
            contexts: ['selection']
        });
    });

    // Track install
    if (details.reason === 'install') {
        chrome.storage.local.set({
            usage: {
                totalTests: 0,
                sessionCount: 1
            }
        });

        // Open onboarding tab
        chrome.storage.local.get('onboardingCompleted', (data) => {
            if (!data.onboardingCompleted) {
                chrome.tabs.create({
                    url: chrome.runtime.getURL('src/onboarding/onboarding.html'),
                    active: true
                });
            }
        });
    }

    // Track update
    if (details.reason === 'update') {
        console.log('[Regex Tester Pro] Updated to v' + chrome.runtime.getManifest().version);
    }
});

// ── Context Menu Handler ──
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'test-regex-selection' && info.selectionText) {
        // Store selected text for the popup to pick up
        chrome.storage.local.set({ pendingTestString: info.selectionText });

        // Open popup — fallback to badge if openPopup() unavailable
        if (typeof chrome.action.openPopup === 'function') {
            chrome.action.openPopup().catch(() => {
                showBadgeNotification();
            });
        } else {
            showBadgeNotification();
        }
    }
});

// Badge notification helper
function showBadgeNotification() {
    chrome.action.setBadgeText({ text: '!' });
    chrome.action.setBadgeBackgroundColor({ color: '#6366f1' });
    setTimeout(() => {
        chrome.action.setBadgeText({ text: '' });
    }, 3000);
}

// ── Session Tracking ──
chrome.runtime.onStartup.addListener(async () => {
    const { usage } = await chrome.storage.local.get('usage');
    if (usage) {
        await chrome.storage.local.set({
            usage: { ...usage, sessionCount: (usage.sessionCount || 0) + 1 }
        });
    }
});
