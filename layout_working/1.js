/**
 * Toggles the state of the sidebar drawer container viewport.
 */
function toggleSidebarDrawer() {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    
    if (sidebar && backdrop) {
        sidebar.classList.toggle('open');
        backdrop.classList.toggle('active');
    }
}

/**
 * Handles workspace option dropdown actions and updates arrow states.
 * @param {string} moduleId - Target HTML DOM container key token.
 */
function toggleModuleDropdown(moduleId) {
    const targetModule = document.getElementById(moduleId);
    const triggerBtn = document.querySelector(`[onclick="toggleModuleDropdown('${moduleId}')"]`);
    
    if (targetModule && triggerBtn) {
        const isCurrentlyHidden = targetModule.classList.contains('hidden');
        
        if (isCurrentlyHidden) {
            targetModule.classList.remove('hidden');
            triggerBtn.classList.remove('collapsed');
            triggerBtn.classList.add('expanded');
        } else {
            targetModule.classList.add('hidden');
            triggerBtn.classList.remove('expanded');
            triggerBtn.classList.add('collapsed');
        }
    }
}

/**
 * Global Workspace Engine State Listeners.
 */
window.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlNode = document.documentElement;
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isCurrentlyDark = htmlNode.classList.contains('dark');
            
            if (isCurrentlyDark) {
                htmlNode.classList.remove('dark');
                localStorage.setItem('antinna-ui-theme', 'light');
            } else {
                htmlNode.classList.add('dark');
                localStorage.setItem('antinna-ui-theme', 'dark');
            }
            applyThemeToggleIconStates();
        });
    }

    function applyThemeToggleIconStates() {
        const moonElement = document.querySelector('.moon-icon');
        const sunElement = document.querySelector('.sun-icon');
        
        if (moonElement && sunElement) {
            if (htmlNode.classList.contains('dark')) {
                moonElement.classList.add('hidden');
                sunElement.classList.remove('hidden');
            } else {
                moonElement.classList.remove('hidden');
                sunElement.classList.add('hidden');
            }
        }
    }

    const persistentUserThemeToken = localStorage.getItem('antinna-ui-theme');
    const systemPrefersDarkState = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (persistentUserThemeToken === 'dark' || (!persistentUserThemeToken && systemPrefersDarkState)) {
        htmlNode.classList.add('dark');
    } else {
        htmlNode.classList.remove('dark');
    }
    
    applyThemeToggleIconStates();
});
