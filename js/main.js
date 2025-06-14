// Main JavaScript for SwasthyaAI Landing Page

// Role selection functionality
function selectRole(role) {
    // Add loading state
    const roleCards = document.querySelectorAll('.role-card');
    roleCards.forEach(card => {
        card.style.pointerEvents = 'none';
        card.style.opacity = '0.7';
    });
    
    // Add loading animation
    const selectedCard = document.querySelector(`.${role}-card`);
    if (selectedCard) {
        const icon = selectedCard.querySelector('.role-icon');
        icon.innerHTML = '<div class="loading"></div>';
    }
    
    // Simulate loading and redirect
    setTimeout(() => {
        if (role === 'doctor') {
            window.location.href = '/doctor-login.html';
        } else if (role === 'patient') {
            window.location.href = '/patient-login.html';
        }
    }, 1000);
}

// Smooth scrolling for better UX
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add intersection observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.role-card, .feature-item, .stat-card');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Handle keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open modals or dropdowns
            closeAllModals();
        }
        
        if (e.key === 'Tab') {
            // Ensure proper tab navigation
            handleTabNavigation(e);
        }
    });
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
}

function handleTabNavigation(e) {
    const focusableElements = document.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
    }
}

// Add ripple effect to buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('.role-card, .primary-button, .secondary-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Handle browser back button
function initHistoryHandling() {
    window.addEventListener('popstate', (event) => {
        // Handle browser back/forward navigation
        if (event.state && event.state.section) {
            showSection(event.state.section);
        }
    });
}

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        // Add any image URLs that need preloading
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize theme based on system preference
function initTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('swasthya-theme');
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('swasthya-theme')) {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
}

// Handle network status
function initNetworkStatus() {
    function updateNetworkStatus() {
        if (navigator.onLine) {
            document.body.classList.remove('offline');
            // Show online indicator if needed
        } else {
            document.body.classList.add('offline');
            // Show offline message
            showNotification('You are currently offline. Some features may not be available.', 'warning');
        }
    }
    
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    
    // Initial check
    updateNetworkStatus();
}

// Show notification system
function showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                z-index: 10000;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease;
                max-width: 400px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            }
            .notification.show {
                opacity: 1;
                transform: translateX(0);
            }
            .notification-info { background: linear-gradient(135deg, #3B82F6, #2563EB); }
            .notification-success { background: linear-gradient(135deg, #10B981, #059669); }
            .notification-warning { background: linear-gradient(135deg, #F59E0B, #D97706); }
            .notification-error { background: linear-gradient(135deg, #EF4444, #DC2626); }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// Add CSS for ripple effect
function addRippleStyles() {
    if (!document.querySelector('#ripple-styles')) {
        const styles = document.createElement('style');
        styles.id = 'ripple-styles';
        styles.textContent = `
            .role-card, .primary-button, .secondary-button {
                position: relative;
                overflow: hidden;
            }
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                pointer-events: none;
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
            }
            @keyframes ripple-animation {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styles);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initScrollAnimations();
    initKeyboardNavigation();
    initHistoryHandling();
    initTheme();
    initNetworkStatus();
    preloadImages();
    addRippleStyles();
    addRippleEffect();
    
    // Add global click handler for role selection
    document.addEventListener('click', (e) => {
        if (e.target.closest('.role-card')) {
            const roleCard = e.target.closest('.role-card');
            if (roleCard.classList.contains('doctor-card')) {
                selectRole('doctor');
            } else if (roleCard.classList.contains('patient-card')) {
                selectRole('patient');
            }
        }
    });
    
    // Add hover effects for better UX
    const roleCards = document.querySelectorAll('.role-card');
    roleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    console.log('SwasthyaAI: Landing page initialized successfully');
});

// Export functions for global use
window.SwasthyaMain = {
    selectRole,
    smoothScrollTo,
    showNotification
};