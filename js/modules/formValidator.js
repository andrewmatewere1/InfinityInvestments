// Form Validator Module
export class FormValidator {
    constructor() {
        this.contactForm = document.getElementById('contactForm');
        this.nameInput = document.getElementById('name');
        this.emailInput = document.getElementById('email');
        this.phoneInput = document.getElementById('phone');
        this.messageInput = document.getElementById('message');
        this.successMessage = document.getElementById('successMessage');
        
        // Error elements
        this.nameError = document.getElementById('nameError');
        this.emailError = document.getElementById('emailError');
        this.messageError = document.getElementById('messageError');
        
        this.init();
    }

    init() {
        if (this.contactForm) {
            this.setupFormValidation();
            this.setupRealTimeValidation();
        }
    }

    setupFormValidation() {
        this.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validateForm()) {
                this.handleFormSubmit();
            }
        });
    }

    setupRealTimeValidation() {
        // Name validation
        this.nameInput?.addEventListener('blur', () => {
            this.validateName();
        });

        this.nameInput?.addEventListener('input', () => {
            if (this.nameInput.value.trim() !== '') {
                this.hideError(this.nameInput, this.nameError);
            }
        });

        // Email validation
        this.emailInput?.addEventListener('blur', () => {
            this.validateEmail();
        });

        this.emailInput?.addEventListener('input', () => {
            if (this.validateEmailFormat(this.emailInput.value)) {
                this.hideError(this.emailInput, this.emailError);
            }
        });

        // Message validation
        this.messageInput?.addEventListener('blur', () => {
            this.validateMessage();
        });

        this.messageInput?.addEventListener('input', () => {
            if (this.messageInput.value.trim() !== '') {
                this.hideError(this.messageInput, this.messageError);
            }
        });

        // Phone validation (optional)
        this.phoneInput?.addEventListener('input', () => {
            this.formatPhoneNumber();
        });
    }

    validateEmailFormat(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validateName() {
        if (this.nameInput.value.trim() === '') {
            this.showError(this.nameInput, this.nameError);
            return false;
        } else {
            this.hideError(this.nameInput, this.nameError);
            return true;
        }
    }

    validateEmail() {
        if (!this.validateEmailFormat(this.emailInput.value.trim())) {
            this.showError(this.emailInput, this.emailError);
            return false;
        } else {
            this.hideError(this.emailInput, this.emailError);
            return true;
        }
    }

    validateMessage() {
        if (this.messageInput.value.trim() === '') {
            this.showError(this.messageInput, this.messageError);
            return false;
        } else {
            this.hideError(this.messageInput, this.messageError);
            return true;
        }
    }

    validatePhone() {
        const phoneValue = this.phoneInput.value.trim();
        if (phoneValue !== '' && !this.validatePhoneFormat(phoneValue)) {
            // Phone is optional but if provided, should be valid
            this.phoneInput.classList.add('border-red-500');
            return false;
        } else {
            this.phoneInput.classList.remove('border-red-500');
            return true;
        }
    }

    validatePhoneFormat(phone) {
        // Basic phone validation - can be enhanced based on requirements
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        return phoneRegex.test(phone) && phone.length >= 10;
    }

    validateForm() {
        const isNameValid = this.validateName();
        const isEmailValid = this.validateEmail();
        const isMessageValid = this.validateMessage();
        const isPhoneValid = this.validatePhone();

        return isNameValid && isEmailValid && isMessageValid && isPhoneValid;
    }

    showError(input, errorElement) {
        input.classList.add('border-red-500');
        if (errorElement) {
            errorElement.classList.remove('hidden');
        }
    }

    hideError(input, errorElement) {
        input.classList.remove('border-red-500');
        if (errorElement) {
            errorElement.classList.add('hidden');
        }
    }

    formatPhoneNumber() {
        let phoneValue = this.phoneInput.value.replace(/\D/g, '');
        
        // Basic formatting - can be enhanced based on requirements
        if (phoneValue.length > 0) {
            if (phoneValue.length <= 3) {
                phoneValue = phoneValue;
            } else if (phoneValue.length <= 6) {
                phoneValue = phoneValue.slice(0, 3) + '-' + phoneValue.slice(3);
            } else if (phoneValue.length <= 10) {
                phoneValue = phoneValue.slice(0, 3) + '-' + phoneValue.slice(3, 6) + '-' + phoneValue.slice(6);
            } else {
                phoneValue = phoneValue.slice(0, 3) + '-' + phoneValue.slice(3, 6) + '-' + phoneValue.slice(6, 10);
            }
        }
        
        this.phoneInput.value = phoneValue;
    }

    async handleFormSubmit() {
        // Show loading state
        this.setFormLoadingState(true);
        
        try {
            // Simulate form submission (replace with actual API call)
            await this.simulateFormSubmission();
            
            // Show success message
            this.showSuccessMessage();
            
            // Reset form
            this.resetForm();
            
        } catch (error) {
            this.showErrorMessage(error.message);
        } finally {
            // Remove loading state
            this.setFormLoadingState(false);
        }
    }

    simulateFormSubmission() {
        return new Promise((resolve) => {
            setTimeout(resolve, 1500); // Simulate API call
        });
    }

    setFormLoadingState(isLoading) {
        const submitButton = this.contactForm.querySelector('button[type="submit"]');
        
        if (isLoading) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="loading-spinner inline-block mr-2"></span>Sending...';
            submitButton.classList.add('opacity-75', 'cursor-not-allowed');
        } else {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message';
            submitButton.classList.remove('opacity-75', 'cursor-not-allowed');
        }
    }

    showSuccessMessage() {
        if (this.successMessage) {
            this.successMessage.classList.remove('hidden');
            this.successMessage.classList.add('animate-fade-in');
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                this.hideSuccessMessage();
            }, 5000);
        }
    }

    hideSuccessMessage() {
        if (this.successMessage) {
            this.successMessage.classList.add('hidden');
            this.successMessage.classList.remove('animate-fade-in');
        }
    }

    showErrorMessage(message) {
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'mt-4 p-4 bg-red-100 text-red-800 rounded-lg animate-fade-in';
        errorDiv.textContent = message || 'An error occurred. Please try again.';
        
        this.contactForm.appendChild(errorDiv);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    resetForm() {
        this.contactForm.reset();
        
        // Clear any error states
        this.hideError(this.nameInput, this.nameError);
        this.hideError(this.emailInput, this.emailError);
        this.hideError(this.messageInput, this.messageError);
        this.phoneInput.classList.remove('border-red-500');
    }

    // Public method to validate a single field
    validateField(fieldName) {
        switch (fieldName) {
            case 'name':
                return this.validateName();
            case 'email':
                return this.validateEmail();
            case 'phone':
                return this.validatePhone();
            case 'message':
                return this.validateMessage();
            default:
                return false;
        }
    }

    // Public method to get form data
    getFormData() {
        return {
            name: this.nameInput?.value || '',
            email: this.emailInput?.value || '',
            phone: this.phoneInput?.value || '',
            message: this.messageInput?.value || ''
        };
    }
}
