// Main Application Controller
import { Navigation } from './modules/navigation.js';
import { ThemeManager } from './modules/theme.js';
import { FormValidator } from './modules/formValidator.js';
import { ProjectGallery } from './modules/projectGallery.js';
import { AnimationController } from './modules/animations.js';

class App {
    constructor() {
        this.init();
    }

    init() {
        // Initialize all modules
        this.navigation = new Navigation();
        this.themeManager = new ThemeManager();
        this.formValidator = new FormValidator();
        this.projectGallery = new ProjectGallery();
        this.animationController = new AnimationController();

        // Initialize AOS
        this.initAOS();

        // Add global event listeners
        this.addGlobalListeners();

        console.log('%c🏗️ Infinity Investments Website', 'font-size: 20px; font-weight: bold; color: #f97316;');
        console.log('%cBuilding with Integrity • Delivering Quality • Engineering the Future', 'font-size: 14px; color: #1e3a8a;');
    }

    initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100
            });
        }
    }

    addGlobalListeners() {
        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });

        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.handleResize();
            }, 250);
        });

        // Handle scroll events
        this.addScrollListeners();
    }

    addScrollListeners() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    handleScroll() {
        // Update navbar appearance
        this.navigation.updateNavbar();
        
        // Handle parallax effects
        this.animationController.handleParallax();
        
        // Update scroll animations
        this.animationController.updateScrollAnimations();
    }

    handleResize() {
        // Update modules that need to respond to resize
        this.projectGallery.handleResize();
        this.navigation.handleResize();
    }

    pauseAnimations() {
        // Pause any running animations
        if (this.projectGallery.swiper) {
            this.projectGallery.swiper.autoplay.stop();
        }
    }

    resumeAnimations() {
        // Resume any paused animations
        if (this.projectGallery.swiper) {
            this.projectGallery.swiper.autoplay.start();
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new App();
});

// Export for potential external use
export default App;
