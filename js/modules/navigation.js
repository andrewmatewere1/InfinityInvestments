// Navigation Module
export class Navigation {
    constructor() {
        this.navbar = document.querySelector('nav');
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.offCanvasMenu = document.getElementById('offCanvasMenu');
        this.offCanvasOverlay = document.getElementById('offCanvasOverlay');
        this.offCanvasClose = document.getElementById('offCanvasClose');
        this.isMenuOpen = false;
        
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

        // Close menu when clicking on links
        const offCanvasLinks = this.offCanvasMenu?.querySelectorAll('a');
        offCanvasLinks?.forEach(link => {
            link.addEventListener('click', () => {
                this.closeOffCanvasMenu();
            });
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
        document.body.style.overflow = '';
        this.isMenuOpen = false;
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for sticky navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
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
            const offsetTop = section.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}
