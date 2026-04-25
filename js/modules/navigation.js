// Navigation Module
export class Navigation {
    constructor() {
        this.navbar = document.querySelector('nav');
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.offCanvasMenu = document.getElementById('offCanvasMenu');
        this.offCanvasOverlay = document.getElementById('offCanvasOverlay');
        this.offCanvasClose = document.getElementById('offCanvasClose');
        this.isMenuOpen = false;
        
        // Ensure body scroll is enabled on initialization
        document.body.style.overflow = '';
        
        this.init();
    }

    init() {
        this.setupOffCanvasMenu();
        this.setupSmoothScrolling();
        this.setupActiveNavigation();
    }

    setupOffCanvasMenu() {
        if (!this.mobileMenuBtn) return;

        // Hamburger menu toggle
        this.mobileMenuBtn.addEventListener('click', () => {
            this.toggleOffCanvasMenu();
        });

        // Close button functionality
        this.offCanvasClose?.addEventListener('click', () => {
            this.closeOffCanvasMenu();
        });

        // Overlay click to close
        this.offCanvasOverlay?.addEventListener('click', () => {
            this.closeOffCanvasMenu();
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeOffCanvasMenu();
            }
        });
    }

    toggleOffCanvasMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        
        if (this.isMenuOpen) {
            this.openOffCanvasMenu();
        } else {
            this.closeOffCanvasMenu();
        }
    }

    openOffCanvasMenu() {
        this.offCanvasMenu?.classList.add('active');
        this.offCanvasOverlay?.classList.add('active');
        this.mobileMenuBtn?.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.isMenuOpen = true;
    }

    closeOffCanvasMenu() {
        this.offCanvasMenu?.classList.remove('active');
        this.offCanvasOverlay?.classList.remove('active');
        this.mobileMenuBtn?.classList.remove('active');
        // Ensure body scroll is always enabled
        document.body.style.overflow = '';
        document.body.style.position = '';
        this.isMenuOpen = false;
    }

    setupSmoothScrolling() {
        // Handle all anchor links with hash
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            // Add both click and touchend events for mobile compatibility
            const handleNavigation = (e) => {
                const targetId = anchor.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close off-canvas menu if open
                    if (this.isMenuOpen) {
                        this.closeOffCanvasMenu();
                    }
                    
                    // Scroll to target after menu closes
                    setTimeout(() => {
                        // Use multiple methods for maximum compatibility
                        try {
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start',
                                inline: 'nearest'
                            });
                        } catch (error) {
                            // Fallback for older browsers
                            const targetPosition = target.offsetTop - 80;
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }, 100); // Reduced delay for better mobile responsiveness
                }
            };
            
            // Add both click and touchend listeners
            anchor.addEventListener('click', handleNavigation);
            anchor.addEventListener('touchend', handleNavigation);
        });
    }

    setupActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    this.updateActiveNavLink(currentId, navLinks);
                }
            });
        };

        const observerOptions = {
            root: null,
            rootMargin: '-80px 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach(section => observer.observe(section));
    }

    updateActiveNavLink(currentId, navLinks) {
        navLinks.forEach(link => {
            link.classList.remove('text-navy', 'dark:text-blue-400');
            link.classList.add('text-gray-700', 'dark:text-gray-300');
            
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.remove('text-gray-700', 'dark:text-gray-300');
                link.classList.add('text-navy', 'dark:text-blue-400');
            }
        });
    }

    updateNavbar() {
        if (!this.navbar) return;

        const scrolled = window.pageYOffset;
        
        if (scrolled > 100) {
            this.navbar.classList.add('shadow-xl');
        } else {
            this.navbar.classList.remove('shadow-xl');
        }

        // Hide/show navbar on scroll (optional enhancement)
        if (scrolled > this.lastScrollY && scrolled > 300) {
            this.navbar.style.transform = 'translateY(-100%)';
        } else {
            this.navbar.style.transform = 'translateY(0)';
        }
        
        this.lastScrollY = scrolled;
    }

    handleResize() {
        // Close off-canvas menu on resize to desktop
        if (window.innerWidth > 768 && this.isMenuOpen) {
            this.closeOffCanvasMenu();
        }
    }

    // Public method to scroll to specific section
    scrollToSection(sectionId) {
        const section = document.querySelector(sectionId);
        if (section) {
            // Close off-canvas menu if open
            if (this.isMenuOpen) {
                this.closeOffCanvasMenu();
            }
            
            // Small delay to ensure menu closes first
            setTimeout(() => {
                const offsetTop = section.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }, 300);
        }
    }
    
    // Enhanced smooth scroll method for mobile compatibility
    smoothScrollTo(targetElement) {
        if (!targetElement) return;
        
        const targetPosition = targetElement.offsetTop - 80;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        
        let start = null;
        
        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };
        
        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
        
        requestAnimationFrame(animation);
    }
}
