/**
 * Theme management utilities
 * Handles theme toggling and persistence
 */

/**
 * Initialize theme from localStorage or default to 'light'
 */
export function initTheme() {
    const themeToggleBtn = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;

    if (themeToggleBtn) {
        const savedTheme = localStorage.getItem('theme') || 'light';
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeUI(savedTheme);

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeUI(newTheme);
        });
    }
}

/**
 * Update theme UI elements (icons, logos)
 * @param {string} theme - 'light' or 'dark'
 */
function updateThemeUI(theme) {
    const iconSun = document.querySelector('.icon-sun');
    const iconMoon = document.querySelector('.icon-moon');
    const logoLight = document.querySelector('.logo-light');
    const logoDark = document.querySelector('.logo-dark');

    if (theme === 'dark') {
        if(iconMoon) iconMoon.style.display = 'none';
        if(iconSun) iconSun.style.display = 'block';
        if(logoLight) logoLight.style.display = 'none';
        if(logoDark) logoDark.style.display = 'block';
    } else {
        if(iconMoon) iconMoon.style.display = 'block';
        if(iconSun) iconSun.style.display = 'none';
        if(logoLight) logoLight.style.display = 'block';
        if(logoDark) logoDark.style.display = 'none';
    }
}
