// Theme Manager Module
export class ThemeManager {
    constructor() {
        this.html = document.documentElement;
        this.darkModeToggle = document.getElementById('darkModeToggle');
        this.darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }

    init() {
        // Apply saved theme
        this.applyTheme(this.currentTheme);
        
        // Setup toggle buttons
        this.setupToggleButtons();
        
        // Listen for system theme changes
        this.setupSystemThemeListener();
    }

    setupToggleButtons() {
        this.darkModeToggle?.addEventListener('click', () => {
            this.toggleTheme();
        });

        this.darkModeToggleMobile?.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Add keyboard shortcut (Ctrl/Cmd + Shift + D)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    setupSystemThemeListener() {
        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            mediaQuery.addEventListener('change', (e) => {
                // Only apply system theme if user hasn't manually set a preference
                if (!localStorage.getItem('theme')) {
                    this.applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    toggleTheme() {
        const newTheme = this.html.classList.contains('dark') ? 'light' : 'dark';
        this.applyTheme(newTheme);
        this.saveTheme(newTheme);
        this.announceThemeChange(newTheme);
    }

    applyTheme(theme) {
        if (theme === 'dark') {
            this.html.classList.add('dark');
        } else {
            this.html.classList.remove('dark');
        }
        
        this.currentTheme = theme;
        this.updateToggleButtons();
        this.updateMetaThemeColor(theme);
    }

    saveTheme(theme) {
        localStorage.setItem('theme', theme);
    }

    updateToggleButtons() {
        // Update desktop toggle button
        if (this.darkModeToggle) {
            const icon = this.darkModeToggle.querySelector('i');
            if (this.currentTheme === 'dark') {
                icon?.classList.remove('fa-moon');
                icon?.classList.add('fa-sun');
            } else {
                icon?.classList.remove('fa-sun');
                icon?.classList.add('fa-moon');
            }
        }

        // Update mobile toggle button
        if (this.darkModeToggleMobile) {
            const icon = this.darkModeToggleMobile.querySelector('i');
            const text = this.darkModeToggleMobile.querySelector('span');
            
            if (this.currentTheme === 'dark') {
                icon?.classList.remove('fa-moon');
                icon?.classList.add('fa-sun');
                text?.classList.add('hidden');
                text?.nextElementSibling?.classList.remove('hidden');
            } else {
                icon?.classList.remove('fa-sun');
                icon?.classList.add('fa-moon');
                text?.classList.remove('hidden');
                text?.nextElementSibling?.classList.add('hidden');
            }
        }
    }

    updateMetaThemeColor(theme) {
        // Update meta theme-color for mobile browsers
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }

        if (theme === 'dark') {
            metaThemeColor.content = '#1f2937';
        } else {
            metaThemeColor.content = '#ffffff';
        }
    }

    announceThemeChange(theme) {
        // Announce theme change for screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Theme changed to ${theme} mode`;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Public method to get current theme
    getCurrentTheme() {
        return this.currentTheme;
    }

    // Public method to set theme programmatically
    setTheme(theme) {
        if (theme === 'dark' || theme === 'light') {
            this.applyTheme(theme);
            this.saveTheme(theme);
        }
    }

    // Check if dark mode is preferred
    isDarkModePreferred() {
        return this.currentTheme === 'dark' || 
               (!localStorage.getItem('theme') && 
                window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
}
