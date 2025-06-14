// Authentication JavaScript for SwasthyaAI

// Form validation patterns
const validationPatterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\+]?[1-9][\d]{0,15}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
};

// Show notification function
function showNotification(message, type = 'info', duration = 5000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('notification-show');
    }, 10);
    
    // Auto remove
    if (duration > 0) {
        setTimeout(() => {
            notification.classList.remove('notification-show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, duration);
    }
}

// Get translation function (fallback if not available)
function getTranslation(key) {
    // Try to get from global translations if available
    if (typeof window !== 'undefined' && window.translations && window.translations[key]) {
        return window.translations[key];
    }
    return null;
}

// Initialize authentication
function initAuth() {
    setupFormValidation();
    setupFormSubmission();
    setupPasswordToggle();
    setupFormAnimations();
    checkAuthRedirect();
}

// Setup form validation
function setupFormValidation() {
    const forms = document.querySelectorAll('.auth-form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    });
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name || field.id;
    
    // Clear previous errors
    clearFieldError(field);
    
    // Check if field is empty
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, getTranslation('field-required') || 'This field is required');
        return false;
    }
    
    // Validate specific field types
    switch (fieldType) {
        case 'email':
            if (value && !validationPatterns.email.test(value)) {
                showFieldError(field, getTranslation('invalid-email') || 'Please enter a valid email address');
                return false;
            }
            break;
            
        case 'password':
            if (value && value.length < 8) {
                showFieldError(field, getTranslation('password-too-short') || 'Password must be at least 8 characters');
                return false;
            }
            break;
            
        case 'tel':
            if (value && !validationPatterns.phone.test(value)) {
                showFieldError(field, getTranslation('invalid-phone') || 'Please enter a valid phone number');
                return false;
            }
            break;
    }
    
    // Validate confirm password
    if (fieldName === 'confirmPassword') {
        const passwordField = document.getElementById('password');
        if (passwordField && value !== passwordField.value) {
            showFieldError(field, getTranslation('password-mismatch') || 'Passwords do not match');
            return false;
        }
    }
    
    // Validate age
    if (fieldName === 'age') {
        const age = parseInt(value);
        if (age < 1 || age > 120) {
            showFieldError(field, getTranslation('invalid-age') || 'Please enter a valid age');
            return false;
        }
    }
    
    return true;
}

// Show field error
function showFieldError(field, message) {
    // Remove existing error
    clearFieldError(field);
    
    // Create error element
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    // Add error styles
    field.style.borderColor = '#EF4444';
    field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    
    // Insert error message
    field.parentNode.appendChild(errorElement);
    
    // Add error class to form group
    field.closest('.form-group').classList.add('has-error');
}

// Clear field error
function clearFieldError(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    
    // Reset field styles
    field.style.borderColor = '';
    field.style.boxShadow = '';
    
    // Remove error class
    field.closest('.form-group').classList.remove('has-error');
}

// Setup form submission
function setupFormSubmission() {
    // Doctor login form
    const doctorLoginForm = document.getElementById('doctorLoginForm');
    if (doctorLoginForm) {
        doctorLoginForm.addEventListener('submit', handleDoctorLogin);
    }
    
    // Patient login form
    const patientLoginForm = document.getElementById('patientLoginForm');
    if (patientLoginForm) {
        patientLoginForm.addEventListener('submit', handlePatientLogin);
    }
    
    // Patient signup form
    const patientSignupForm = document.getElementById('patientSignupForm');
    if (patientSignupForm) {
        patientSignupForm.addEventListener('submit', handlePatientSignup);
    }
}

// Handle doctor login
async function handleDoctorLogin(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const email = formData.get('email') || document.getElementById('email').value;
    const password = formData.get('password') || document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Validate form
    if (!validateForm(form)) {
        return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    setButtonLoading(submitButton, true);
    
    try {
        // Simulate API call
        await simulateAuth({ email, password, role: 'doctor', remember });
        
        // Success - redirect to doctor dashboard
        showNotification(getTranslation('login-success') || 'Login successful!', 'success');
        
        setTimeout(() => {
            window.location.href = '/doctor-dashboard.html';
        }, 1000);
        
    } catch (error) {
        console.error('Doctor login error:', error);
        showNotification(getTranslation('login-error') || 'Login failed. Please check your credentials.', 'error');
        setButtonLoading(submitButton, false, originalText);
    }
}

// Handle patient login
async function handlePatientLogin(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const email = formData.get('email') || document.getElementById('email').value;
    const password = formData.get('password') || document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Validate form
    if (!validateForm(form)) {
        return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    setButtonLoading(submitButton, true);
    
    try {
        // Simulate API call
        await simulateAuth({ email, password, role: 'patient', remember });
        
        // Success - redirect to patient dashboard
        showNotification(getTranslation('login-success') || 'Login successful!', 'success');
        
        setTimeout(() => {
            window.location.href = '/patient-dashboard.html';
        }, 1000);
        
    } catch (error) {
        console.error('Patient login error:', error);
        showNotification(getTranslation('login-error') || 'Login failed. Please check your credentials.', 'error');
        setButtonLoading(submitButton, false, originalText);
    }
}

// Handle patient signup
async function handlePatientSignup(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Get form data
    const userData = {
        firstName: formData.get('firstName') || document.getElementById('firstName').value,
        lastName: formData.get('lastName') || document.getElementById('lastName').value,
        email: formData.get('email') || document.getElementById('email').value,
        phone: formData.get('phone') || document.getElementById('phone').value,
        age: formData.get('age') || document.getElementById('age').value,
        gender: formData.get('gender') || document.getElementById('gender').value,
        password: formData.get('password') || document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value,
        terms: document.getElementById('terms').checked
    };
    
    // Validate form
    if (!validateForm(form)) {
        return;
    }
    
    // Check terms acceptance
    if (!userData.terms) {
        showNotification(getTranslation('accept-terms') || 'Please accept the terms and conditions', 'error');
        return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    setButtonLoading(submitButton, true);
    
    try {
        // Simulate API call
        await simulateSignup(userData);
        
        // Success - redirect to patient login
        showNotification(getTranslation('signup-success') || 'Account created successfully!', 'success');
        
        setTimeout(() => {
            window.location.href = '/patient-login.html';
        }, 1500);
        
    } catch (error) {
        console.error('Patient signup error:', error);
        showNotification(getTranslation('signup-error') || 'Signup failed. Please try again.', 'error');
        setButtonLoading(submitButton, false, originalText);
    }
}

// Validate entire form
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Set button loading state
function setButtonLoading(button, isLoading, originalText = '') {
    if (isLoading) {
        button.disabled = true;
        button.innerHTML = `
            <div class="loading" style="width: 20px; height: 20px; margin-right: 8px;"></div>
            ${getTranslation('loading') || 'Loading...'}
        `;
        button.style.opacity = '0.7';
    } else {
        button.disabled = false;
        button.innerHTML = originalText;
        button.style.opacity = '1';
    }
}

// Simulate authentication (replace with real API calls)
async function simulateAuth(credentials) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simple validation for demo
            if (credentials.email && credentials.password.length >= 6) {
                // Store auth data
                const authData = {
                    token: 'demo-token-' + Date.now(),
                    user: {
                        email: credentials.email,
                        role: credentials.role,
                        loginTime: new Date().toISOString()
                    }
                };
                
                localStorage.setItem('swasthya-auth', JSON.stringify(authData));
                
                if (credentials.remember) {
                    localStorage.setItem('swasthya-remember', 'true');
                }
                
                resolve(authData);
            } else {
                reject(new Error('Invalid credentials'));
            }
        }, 1500); // Simulate network delay
    });
}

// Simulate signup (replace with real API calls)
async function simulateSignup(userData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simple validation for demo
            if (userData.email && userData.password.length >= 8) {
                // Store user data
                const users = JSON.parse(localStorage.getItem('swasthya-users') || '[]');
                
                // Check if user already exists
                const existingUser = users.find(user => user.email === userData.email);
                if (existingUser) {
                    reject(new Error('User already exists'));
                    return;
                }
                
                // Add new user
                const newUser = {
                    id: Date.now(),
                    ...userData,
                    password: undefined, // Don't store password in real app
                    createdAt: new Date().toISOString()
                };
                
                users.push(newUser);
                localStorage.setItem('swasthya-users', JSON.stringify(users));
                
                resolve(newUser);
            } else {
                reject(new Error('Invalid data'));
            }
        }, 2000); // Simulate network delay
    });
}

// Setup password toggle functionality
function setupPasswordToggle() {
    const passwordFields = document.querySelectorAll('input[type="password"]');
    
    passwordFields.forEach(field => {
        const toggleButton = document.createElement('button');
        toggleButton.type = 'button';
        toggleButton.className = 'password-toggle';
        toggleButton.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
            </svg>
        `;
        
        toggleButton.addEventListener('click', () => {
            const isPassword = field.type === 'password';
            field.type = isPassword ? 'text' : 'password';
            
            toggleButton.innerHTML = isPassword ? `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
            ` : `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                </svg>
            `;
        });
        
        // Add styles and append button
        if (!field.parentNode.querySelector('.password-toggle')) {
            field.parentNode.style.position = 'relative';
            field.style.paddingRight = '40px';
            
            toggleButton.style.position = 'absolute';
            toggleButton.style.right = '12px';
            toggleButton.style.top = '50%';
            toggleButton.style.transform = 'translateY(-50%)';
            toggleButton.style.background = 'none';
            toggleButton.style.border = 'none';
            toggleButton.style.color = '#94A3B8';
            toggleButton.style.cursor = 'pointer';
            toggleButton.style.zIndex = '10';
            
            field.parentNode.appendChild(toggleButton);
        }
    });
}

// Setup form animations
function setupFormAnimations() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        group.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Check for existing authentication and redirect
function checkAuthRedirect() {
    const authData = localStorage.getItem('swasthya-auth');
    
    if (authData) {
        try {
            const auth = JSON.parse(authData);
            const currentPath = window.location.pathname;
            
            // If user is authenticated and on login page, redirect to dashboard
            if (currentPath.includes('login') && auth.user) {
                const redirectPath = auth.user.role === 'doctor' 
                    ? '/doctor-dashboard.html' 
                    : '/patient-dashboard.html';
                
                window.location.href = redirectPath;
            }
        } catch (error) {
            console.error('Error parsing auth data:', error);
            localStorage.removeItem('swasthya-auth');
        }
    }
}

// Logout function
function logout() {
    localStorage.removeItem('swasthya-auth');
    localStorage.removeItem('swasthya-remember');
    
    showNotification(getTranslation('logout-success') || 'Logged out successfully!', 'success');
    
    setTimeout(() => {
        window.location.href = '/index.html';
    }, 1000);
}

// Add notification styles for auth pages
function addAuthNotificationStyles() {
    if (!document.querySelector('#auth-notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'auth-notification-styles';
        styles.textContent = `
            .field-error {
                color: #F87171;
                font-size: 0.75rem;
                margin-top: 0.25rem;
                display: block;
                animation: slideDown 0.3s ease;
            }
            
            .form-group.has-error input,
            .form-group.has-error select {
                border-color: #EF4444 !important;
                box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
            }
            
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            /* Notification styles */
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                max-width: 400px;
                min-width: 300px;
                padding: 0;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                transform: translateX(100%);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                opacity: 0;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .notification.notification-show {
                transform: translateX(0);
                opacity: 1;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px 20px;
                border-radius: 12px;
            }
            
            .notification-success {
                background: linear-gradient(135deg, #10B981, #059669);
                color: white;
            }
            
            .notification-error {
                background: linear-gradient(135deg, #EF4444, #DC2626);
                color: white;
            }
            
            .notification-info {
                background: linear-gradient(135deg, #3B82F6, #2563EB);
                color: white;
            }
            
            .notification-warning {
                background: linear-gradient(135deg, #F59E0B, #D97706);
                color: white;
            }
            
            .notification-message {
                flex: 1;
                font-weight: 500;
                font-size: 14px;
                line-height: 1.4;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: currentColor;
                cursor: pointer;
                padding: 4px;
                margin-left: 12px;
                border-radius: 6px;
                transition: background-color 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0.8;
            }
            
            .notification-close:hover {
                background-color: rgba(255, 255, 255, 0.2);
                opacity: 1;
            }
            
            .notification-close svg {
                width: 16px;
                height: 16px;
            }
            
            @media (max-width: 640px) {
                .notification {
                    left: 20px;
                    right: 20px;
                    max-width: none;
                    min-width: auto;
                }
            }
        `;
        document.head.appendChild(styles);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAuth();
    addAuthNotificationStyles();
    
    console.log('SwasthyaAI: Authentication system initialized');
});

// Export functions for global use
window.SwasthyaAuth = {
    logout,
    validateField,
    showNotification
};