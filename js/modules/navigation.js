// Navigation Module
export class Navigation {
    constructor() {
        this.navbar = document.querySelector('nav');
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.mobileMenuIcon = this.mobileMenuBtn?.querySelector('i');
        this.isMenuOpen = false;
        
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupActiveNavigation();
    }

    setupMobileMenu() {
        if (!this.mobileMenuBtn) return;

        this.mobileMenuBtn.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close menu when clicking on links
        const mobileMenuLinks = this.mobileMenu?.querySelectorAll('a');
        mobileMenuLinks?.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && 
                !this.navbar.contains(e.target) && 
                !this.mobileMenu.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        
        if (this.isMenuOpen) {
            this.openMobileMenu();
        } else {
            this.closeMobileMenu();
        }
    }

    openMobileMenu() {
        this.mobileMenu.classList.remove('hidden');
        this.mobileMenu.classList.add('mobile-menu-enter');
        this.mobileMenuIcon?.classList.remove('fa-bars');
        this.mobileMenuIcon?.classList.add('fa-times');
        this.isMenuOpen = true;
    }

    closeMobileMenu() {
        this.mobileMenu.classList.add('mobile-menu-exit');
        this.mobileMenuIcon?.classList.remove('fa-times');
        this.mobileMenuIcon?.classList.add('fa-bars');
        
        setTimeout(() => {
            this.mobileMenu.classList.add('hidden');
            this.mobileMenu.classList.remove('mobile-menu-enter', 'mobile-menu-exit');
        }, 300);
        
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
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && this.isMenuOpen) {
            this.closeMobileMenu();
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
