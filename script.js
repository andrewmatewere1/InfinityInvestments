// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuIcon = mobileMenuBtn.querySelector('i');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenuIcon.classList.remove('fa-times');
        mobileMenuIcon.classList.add('fa-bars');
    } else {
        mobileMenuIcon.classList.remove('fa-bars');
        mobileMenuIcon.classList.add('fa-times');
    }
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuIcon.classList.remove('fa-times');
        mobileMenuIcon.classList.add('fa-bars');
    });
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
const html = document.documentElement;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    html.classList.add(currentTheme);
}

function toggleDarkMode() {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

darkModeToggle.addEventListener('click', toggleDarkMode);
darkModeToggleMobile.addEventListener('click', toggleDarkMode);

// Smooth Scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('successMessage');

// Error elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(input, errorElement) {
    input.classList.add('border-red-500');
    errorElement.classList.remove('hidden');
}

function hideError(input, errorElement) {
    input.classList.remove('border-red-500');
    errorElement.classList.add('hidden');
}

function validateForm() {
    let isValid = true;

    // Validate name
    if (nameInput.value.trim() === '') {
        showError(nameInput, nameError);
        isValid = false;
    } else {
        hideError(nameInput, nameError);
    }

    // Validate email
    if (!validateEmail(emailInput.value.trim())) {
        showError(emailInput, emailError);
        isValid = false;
    } else {
        hideError(emailInput, emailError);
    }

    // Validate message
    if (messageInput.value.trim() === '') {
        showError(messageInput, messageError);
        isValid = false;
    } else {
        hideError(messageInput, messageError);
    }

    return isValid;
}

// Real-time validation
nameInput.addEventListener('blur', () => {
    if (nameInput.value.trim() === '') {
        showError(nameInput, nameError);
    } else {
        hideError(nameInput, nameError);
    }
});

emailInput.addEventListener('blur', () => {
    if (!validateEmail(emailInput.value.trim())) {
        showError(emailInput, emailError);
    } else {
        hideError(emailInput, emailError);
    }
});

messageInput.addEventListener('blur', () => {
    if (messageInput.value.trim() === '') {
        showError(messageInput, messageError);
    } else {
        hideError(messageInput, messageError);
    }
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        // Show success message
        successMessage.classList.remove('hidden');
        
        // Reset form
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 5000);
    }
});

// Initialize Swiper
const swiper = new Swiper('.projectSwiper', {
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
});

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const swiperSlides = document.querySelectorAll('.swiper-slide');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        
        // Update button styles
        filterButtons.forEach(btn => {
            btn.classList.remove('bg-navy', 'text-white');
            btn.classList.add('bg-white', 'dark:bg-gray-800', 'text-gray-700', 'dark:text-gray-300');
        });
        button.classList.remove('bg-white', 'dark:bg-gray-800', 'text-gray-700', 'dark:text-gray-300');
        button.classList.add('bg-navy', 'text-white');
        
        // Filter slides
        swiperSlides.forEach(slide => {
            if (filter === 'all' || slide.dataset.category === filter) {
                slide.style.display = 'flex';
            } else {
                slide.style.display = 'none';
            }
        });
        
        // Update swiper
        swiper.update();
    });
});

// Navbar scroll effect
const navbar = document.querySelector('nav');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('shadow-xl');
    } else {
        navbar.classList.remove('shadow-xl');
    }
    
    lastScrollY = window.scrollY;
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });
});

// Counter animation for statistics (if needed in future)
function animateCounter(element, target, duration = 2000) {
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

// Parallax effect for hero section (optional enhancement)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-bg');
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add CSS animation class
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in {
        animation: fadeIn 0.8s ease-in-out;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    img {
        transition: opacity 0.3s ease;
    }
    
    img:not(.loaded) {
        opacity: 0.7;
    }
    
    img.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Console welcome message
console.log('%c🏗️ Infinity Investments Website', 'font-size: 20px; font-weight: bold; color: #f97316;');
console.log('%cBuilding with Integrity • Delivering Quality • Engineering the Future', 'font-size: 14px; color: #1e3a8a;');
