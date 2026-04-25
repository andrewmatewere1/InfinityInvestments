// Animation Controller Module
export class AnimationController {
    constructor() {
        this.observer = null;
        this.animatedElements = new Set();
        this.parallaxElements = [];
        this.counters = [];
        
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupParallax();
        this.setupCounters();
        this.setupImageLazyLoading();
        this.setupScrollProgress();
        this.optimizeImageLoading();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    this.animateElement(entry.target);
                    this.animatedElements.add(entry.target);
                }
            });
        }, observerOptions);

        // Observe all sections and elements with animation classes
        this.observeElements();
    }

    observeElements() {
        const elementsToObserve = [
            ...document.querySelectorAll('section'),
            ...document.querySelectorAll('.service-card'),
            ...document.querySelectorAll('.team-card'),
            ...document.querySelectorAll('.value-card'),
            ...document.querySelectorAll('.project-card'),
            ...document.querySelectorAll('[data-aos]')
        ];

        elementsToObserve.forEach(element => {
            this.observer.observe(element);
        });
    }

    animateElement(element) {
        // Add fade-in animation
        element.classList.add('animate-fade-in');
        
        // Handle specific animations based on element type or data attributes
        if (element.dataset.animation) {
            this.handleCustomAnimation(element);
        }
        
        // Trigger counter animations if element has counters
        if (element.querySelector('.counter')) {
            this.animateCounters(element);
        }
    }

    handleCustomAnimation(element) {
        const animationType = element.dataset.animation;
        
        switch (animationType) {
            case 'slide-left':
                element.classList.add('animate-slide-left');
                break;
            case 'slide-right':
                element.classList.add('animate-slide-right');
                break;
            case 'slide-up':
                element.classList.add('animate-slide-up');
                break;
            case 'scale-up':
                element.classList.add('animate-scale-up');
                break;
            case 'rotate-in':
                element.classList.add('animate-rotate-in');
                break;
        }
    }

    setupParallax() {
        // Find elements with parallax effect
        this.parallaxElements = [
            document.querySelector('.hero-bg'),
            ...document.querySelectorAll('[data-parallax]')
        ].filter(Boolean);

        // Add parallax styles
        this.addParallaxStyles();
    }

    addParallaxStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .parallax {
                transform: translate3d(0, 0, 0);
                will-change: transform;
            }
            
            @keyframes slideLeft {
                from {
                    opacity: 0;
                    transform: translateX(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes slideRight {
                from {
                    opacity: 0;
                    transform: translateX(50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes scaleUp {
                from {
                    opacity: 0;
                    transform: scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            @keyframes rotateIn {
                from {
                    opacity: 0;
                    transform: rotate(-10deg);
                }
                to {
                    opacity: 1;
                    transform: rotate(0);
                }
            }
            
            .animate-slide-left {
                animation: slideLeft 0.8s ease-out forwards;
            }
            
            .animate-slide-right {
                animation: slideRight 0.8s ease-out forwards;
            }
            
            .animate-slide-up {
                animation: slideUp 0.8s ease-out forwards;
            }
            
            .animate-scale-up {
                animation: scaleUp 0.8s ease-out forwards;
            }
            
            .animate-rotate-in {
                animation: rotateIn 0.8s ease-out forwards;
            }
        `;
        document.head.appendChild(style);
    }

    handleParallax() {
        const scrolled = window.pageYOffset;
        
        this.parallaxElements.forEach(element => {
            const speed = element.dataset.parallaxSpeed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    setupCounters() {
        this.counters = document.querySelectorAll('.counter');
        
        this.counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = parseInt(counter.dataset.duration) || 2000;
            
            counter.dataset.animated = 'false';
            counter.dataset.target = target;
            counter.dataset.duration = duration;
        });
    }

    animateCounters(container) {
        const counters = container.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            if (counter.dataset.animated === 'true') return;
            
            const target = parseInt(counter.dataset.target);
            const duration = parseInt(counter.dataset.duration) || 2000;
            
            this.animateCounter(counter, target, duration);
            counter.dataset.animated = 'true';
        });
    }

    animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    setupImageLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.add('loaded');
            });
        }
    }

    setupScrollAnimations() {
        // Add smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Setup scroll progress indicator
        this.setupScrollProgress();
    }

    setupScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.className = 'fixed top-0 left-0 w-full h-1 bg-orange z-50 transform origin-left transition-transform duration-100';
        progressBar.style.transform = 'scaleX(0)';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = window.pageYOffset / scrollHeight;
            progressBar.style.transform = `scaleX(${scrollProgress})`;
        });
    }

    updateScrollAnimations() {
        // Handle scroll-based animations
        const scrolled = window.pageYOffset;
        
        // Update elements with scroll-based animations
        document.querySelectorAll('[data-scroll-animation]').forEach(element => {
            this.handleScrollAnimation(element, scrolled);
        });
    }
    
    // Optimize image loading for better performance
    optimizeImageLoading() {
        // Add loading="lazy" to all images for better performance
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Add fade-in effect for loaded images
            img.addEventListener('load', () => {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease-in-out';
                
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 100);
            });
            
            // Preload critical images
            if (img.classList.contains('critical')) {
                const preloadImg = new Image();
                preloadImg.src = img.src;
                preloadImg.onload = () => {
                    img.src = preloadImg.src;
                    img.classList.add('loaded');
                };
            }
        });
    }

    handleScrollAnimation(element, scrolled) {
        const animationType = element.dataset.scrollAnimation;
        const triggerPoint = element.dataset.triggerPoint || 0.5;
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        const windowHeight = window.innerHeight;
        
        const triggerPosition = elementTop + (elementHeight * triggerPoint);
        const isTriggered = scrolled + windowHeight > triggerPosition;
        
        if (isTriggered && !element.classList.contains('scroll-animated')) {
            this.triggerScrollAnimation(element, animationType);
            element.classList.add('scroll-animated');
        }
    }

    triggerScrollAnimation(element, animationType) {
        switch (animationType) {
            case 'fade-in-up':
                element.classList.add('animate-fade-in-up');
                break;
            case 'fade-in-left':
                element.classList.add('animate-fade-in-left');
                break;
            case 'fade-in-right':
                element.classList.add('animate-fade-in-right');
                break;
            case 'zoom-in':
                element.classList.add('animate-zoom-in');
                break;
        }
    }

    // Public methods
    animateElementOnScroll(element, animation) {
        element.dataset.scrollAnimation = animation;
        this.animatedElements.delete(element); // Remove from set to allow re-animation
        element.classList.remove('scroll-animated');
    }

    pauseAnimations() {
        // Pause any running animations
        document.querySelectorAll('[data-pausable]').forEach(element => {
            element.style.animationPlayState = 'paused';
        });
    }

    resumeAnimations() {
        // Resume any paused animations
        document.querySelectorAll('[data-pausable]').forEach(element => {
            element.style.animationPlayState = 'running';
        });
    }

    resetAnimations() {
        // Reset all animations
        this.animatedElements.clear();
        document.querySelectorAll('.animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-slide-up, .animate-scale-up, .animate-rotate-in').forEach(element => {
            element.classList.remove('animate-fade-in', 'animate-slide-left', 'animate-slide-right', 'animate-slide-up', 'animate-scale-up', 'animate-rotate-in', 'scroll-animated');
        });
        
        // Re-observe elements
        this.observeElements();
    }

    // Utility method to check if element is in viewport
    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Method to add custom animation
    addCustomAnimation(name, keyframes) {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ${name} {
                ${keyframes}
            }
        `;
        document.head.appendChild(style);
    }
}
