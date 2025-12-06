/**
 * Language management utilities
 * Handles language switching and persistence
 */

/**
 * Initialize language from URL params or localStorage
 */
export function initLanguage() {
    const langSwitchBtn = document.querySelector('.lang-switch');
    const translatableElements = document.querySelectorAll('[data-text-en]');

    // Check URL query param first, then localStorage, default to 'en'
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    let savedLang = localStorage.getItem('lang') || 'en';
    
    // If URL has ?lang=de, allow override (or just stick to saved if navigating internally)
    // Usually URL param overrides storage for sharing purposes
    if (urlLang === 'de') {
        savedLang = 'de';
    }

    setLanguage(savedLang, false); // false = don't push state on init, just replace

    if(langSwitchBtn) {
        langSwitchBtn.addEventListener('click', () => {
            const currentLang = localStorage.getItem('lang') || 'en';
            const newLang = currentLang === 'en' ? 'de' : 'en';
            setLanguage(newLang, true);
        });
    }
}

/**
 * Set the current language and update UI
 * @param {string} lang - 'en' or 'de'
 * @param {boolean} pushState - Whether to push state to history
 */
function setLanguage(lang, pushState = true) {
    const langSwitchBtn = document.querySelector('.lang-switch');
    const translatableElements = document.querySelectorAll('[data-text-en]');

    // Update Text Content
    translatableElements.forEach(el => {
        const text = el.getAttribute(`data-text-${lang}`);
        if(text) el.textContent = text;
    });

    // Update Button Text (Show TARGET language)
    if (langSwitchBtn) {
        langSwitchBtn.textContent = lang === 'en' ? 'DE' : 'EN';
    }

    // Update LocalStorage
    localStorage.setItem('lang', lang);

    // Update URL State (Use Query Params for robustness on static sites)
    // Always replace state to ensure ?lang=de persists or is removed
    const url = new URL(window.location);
    if (lang === 'de') {
        url.searchParams.set('lang', 'de');
    } else {
        url.searchParams.delete('lang');
    }
    
    // Use pushState if it's a user action (click), replaceState if init
    if (pushState) {
        window.history.pushState({}, '', url);
    } else {
        window.history.replaceState({}, '', url);
    }
    
    // Clean up old /de path if present (migration)
    if (window.location.pathname.includes('/de')) {
         const cleanPath = window.location.pathname.replace('/de', '').replace('//', '/');
         const cleanUrl = new URL(window.location);
         cleanUrl.pathname = cleanPath;
         if (lang === 'de') cleanUrl.searchParams.set('lang', 'de');
         window.history.replaceState({}, '', cleanUrl);
    }
}
