/**
 * Main entry point
 * Initializes all components and utilities
 */

import { injectBackgroundBlobs, initBlobInteraction } from './components/blobs.js';
import { injectCursor, initCursor } from './components/cursor.js';
import { injectHeader } from './components/header.js';
import { injectMenuOverlay, initMenu } from './components/menu.js';
import { initTheme } from './utils/theme.js';
import { initLanguage } from './utils/language.js';
import { initTransitions } from './utils/transitions.js';
import { initWorkPage } from './pages/work.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inject global components
    injectBackgroundBlobs();
    injectMenuOverlay();
    injectCursor();
    injectHeader();
    
    // Initialize blob interaction and cursor
    const interactWithBlobs = initBlobInteraction();
    initCursor(interactWithBlobs);
    
    // Initialize menu
    initMenu();
    
    // Initialize utilities
    initTheme();
    initLanguage();
    initTransitions();
    
    // Initialize page-specific logic
    if (document.body.classList.contains('page-work')) {
        initWorkPage();
    }
});
