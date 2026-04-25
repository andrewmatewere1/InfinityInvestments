// Project Gallery Module
export class ProjectGallery {
    constructor() {
        this.swiper = null;
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.swiperSlides = document.querySelectorAll('.swiper-slide');
        this.currentFilter = 'all';
        
        this.init();
    }

    init() {
        this.initializeSwiper();
        this.setupFilterButtons();
        this.setupKeyboardNavigation();
    }

    initializeSwiper() {
        if (typeof Swiper !== 'undefined') {
            this.swiper = new Swiper('.projectSwiper', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                },
                // Accessibility
                a11y: {
                    prevSlideMessage: 'Previous slide',
                    nextSlideMessage: 'Next slide',
                    firstSlideMessage: 'This is the first slide',
                    lastSlideMessage: 'This is the last slide',
                    paginationBulletMessage: 'Go to slide {{index}}',
                }
            });
        }
    }

    setupFilterButtons() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                this.filterProjects(filter);
                this.updateActiveButton(button);
            });
        });
    }

    filterProjects(filter) {
        this.currentFilter = filter;
        
        // Filter slides
        this.swiperSlides.forEach(slide => {
            const category = slide.dataset.category;
            
            if (filter === 'all' || category === filter) {
                slide.style.display = 'flex';
                slide.classList.remove('filtered-out');
            } else {
                slide.style.display = 'none';
                slide.classList.add('filtered-out');
            }
        });
        
        // Update swiper
        if (this.swiper) {
            this.swiper.update();
            this.swiper.slideTo(0, 0); // Reset to first slide
        }
        
        // Update ARIA live region for screen readers
        this.announceFilterChange(filter);
    }

    updateActiveButton(activeButton) {
        // Remove active class from all buttons
        this.filterButtons.forEach(btn => {
            btn.classList.remove('bg-navy', 'text-white');
            btn.classList.add('bg-white', 'dark:bg-gray-800', 'text-gray-700', 'dark:text-gray-300');
            btn.setAttribute('aria-pressed', 'false');
        });
        
        // Add active class to clicked button
        activeButton.classList.remove('bg-white', 'dark:bg-gray-800', 'text-gray-700', 'dark:text-gray-300');
        activeButton.classList.add('bg-navy', 'text-white');
        activeButton.setAttribute('aria-pressed', 'true');
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (!this.swiper) return;
            
            // Only handle keyboard events when project gallery is in view
            const projectsSection = document.getElementById('projects');
            const isInView = this.isElementInView(projectsSection);
            
            if (!isInView) return;
            
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.swiper.slidePrev();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.swiper.slideNext();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.swiper.slideTo(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.swiper.slideTo(this.swiper.slides.length - 1);
                    break;
            }
        });
    }

    isElementInView(element) {
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0 &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
            rect.right >= 0
        );
    }

    announceFilterChange(filter) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        
        const filterText = filter === 'all' ? 'all projects' : `${filter} projects`;
        announcement.textContent = `Showing ${filterText}`;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    handleResize() {
        if (this.swiper) {
            this.swiper.update();
        }
    }

    // Public methods
    nextSlide() {
        if (this.swiper) {
            this.swiper.slideNext();
        }
    }

    prevSlide() {
        if (this.swiper) {
            this.swiper.slidePrev();
        }
    }

    goToSlide(index) {
        if (this.swiper) {
            this.swiper.slideTo(index);
        }
    }

    pauseAutoplay() {
        if (this.swiper && this.swiper.autoplay) {
            this.swiper.autoplay.stop();
        }
    }

    resumeAutoplay() {
        if (this.swiper && this.swiper.autoplay) {
            this.swiper.autoplay.start();
        }
    }

    getCurrentSlide() {
        if (this.swiper) {
            return this.swiper.activeIndex;
        }
        return 0;
    }

    getVisibleSlides() {
        if (!this.swiper) return [];
        
        const visibleSlides = [];
        const activeIndex = this.swiper.activeIndex;
        const slidesPerView = this.swiper.params.slidesPerView;
        
        for (let i = 0; i < slidesPerView; i++) {
            const slideIndex = (activeIndex + i) % this.swiper.slides.length;
            visibleSlides.push(this.swiper.slides[slideIndex]);
        }
        
        return visibleSlides;
    }

    // Method to add new projects dynamically
    addProject(projectData) {
        const swiperWrapper = document.querySelector('.swiper-wrapper');
        if (!swiperWrapper) return;

        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.dataset.category = projectData.category;
        
        slide.innerHTML = `
            <div class="project-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                <img src="${projectData.image}" alt="${projectData.title}" class="w-full h-64 object-cover">
                <div class="p-6">
                    <h3 class="text-xl font-bold text-navy dark:text-white mb-2">${projectData.title}</h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-2">Client: ${projectData.client}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">Timeline: ${projectData.timeline}</p>
                    <span class="inline-block px-3 py-1 ${projectData.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} text-sm rounded-full">${projectData.status}</span>
                </div>
            </div>
        `;
        
        swiperWrapper.appendChild(slide);
        
        // Re-initialize swiper to include new slide
        if (this.swiper) {
            this.swiper.update();
        }
    }

    // Method to get project statistics
    getProjectStats() {
        const totalProjects = this.swiperSlides.length;
        const completedProjects = document.querySelectorAll('.swiper-slide[data-category="completed"]').length;
        const inProgressProjects = document.querySelectorAll('.swiper-slide[data-category="in-progress"]').length;
        
        return {
            total: totalProjects,
            completed: completedProjects,
            inProgress: inProgressProjects
        };
    }
}
