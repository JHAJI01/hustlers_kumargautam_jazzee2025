// Doctor Dashboard JavaScript for SwasthyaAI

let currentSection = 'overview';
let appointmentDate = new Date().toISOString().split('T')[0];

// Initialize dashboard
function initDashboard() {
    checkAuthentication();
    setupNavigation();
    setupEventListeners();
    loadDashboardData();
    initializeCharts();
    setupRealTimeUpdates();
}

// Check if user is authenticated
function checkAuthentication() {
    const authData = localStorage.getItem('swasthya-auth');
    
    if (!authData) {
        window.location.href = '/doctor-login.html';
        return;
    }
    
    try {
        const auth = JSON.parse(authData);
        if (auth.user.role !== 'doctor') {
            window.location.href = '/index.html';
            return;
        }
        
        // Update welcome message with doctor name
        updateWelcomeMessage(auth.user);
        
    } catch (error) {
        console.error('Error parsing auth data:', error);
        localStorage.removeItem('swasthya-auth');
        window.location.href = '/doctor-login.html';
    }
}

// Update welcome message
function updateWelcomeMessage(user) {
    const welcomeElement = document.querySelector('[data-translate="welcome-doctor"]');
    if (welcomeElement) {
        const doctorName = extractDoctorName(user.email);
        welcomeElement.textContent = `Welcome back, Dr. ${doctorName}`;
    }
}

// Extract doctor name from email (simple implementation)
function extractDoctorName(email) {
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
}

// Setup navigation
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.getAttribute('data-section');
            if (section) {
                showSection(section);
            }
        });
    });
}

// Show specific section
function showSection(sectionName) {
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeNavItem = document.querySelector(`[data-section="${sectionName}"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
    
    // Update content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const activeSection = document.getElementById(`${sectionName}-section`);
    if (activeSection) {
        activeSection.classList.add('active');
        currentSection = sectionName;
        
        // Load section-specific data
        loadSectionData(sectionName);
    }
    
    // Update URL without page refresh
    history.pushState({ section: sectionName }, '', `#${sectionName}`);
}

// Setup event listeners
function setupEventListeners() {
    // Date selector for appointments
    const appointmentDateInput = document.getElementById('appointmentDate');
    if (appointmentDateInput) {
        appointmentDateInput.value = appointmentDate;
        appointmentDateInput.addEventListener('change', (e) => {
            appointmentDate = e.target.value;
            if (currentSection === 'appointments') {
                loadAppointments();
            }
        });
    }
    
    // Add patient button
    const addPatientBtn = document.querySelector('.primary-button');
    if (addPatientBtn && addPatientBtn.textContent.includes('Add Patient')) {
        addPatientBtn.addEventListener('click', openAddPatientModal);
    }
    
    // Add treatment button
    const addTreatmentBtn = document.querySelector('button:contains("New Treatment")');
    if (addTreatmentBtn) {
        addTreatmentBtn.addEventListener('click', openAddTreatmentModal);
    }
    
    // Action buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('action-btn')) {
            handleActionButton(e.target);
        }
    });
    
    // Handle browser back/forward
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.section) {
            showSection(event.state.section);
        }
    });
    
    // Initialize with URL hash
    const hash = window.location.hash.slice(1);
    if (hash && document.getElementById(`${hash}-section`)) {
        showSection(hash);
    }
}

// Load dashboard data
function loadDashboardData() {
    loadOverviewStats();
    loadRecentActivities();
    
    // Load current section data
    loadSectionData(currentSection);
}

// Load overview statistics
function loadOverviewStats() {
    const stats = {
        totalPatients: 248,
        todayAppointments: 12,
        patientSatisfaction: 89,
        avgRating: 4.8
    };
    
    // Update stat cards with animation
    Object.keys(stats).forEach(key => {
        const element = document.querySelector(`[data-stat="${key}"]`);
        if (element) {
            animateNumber(element, 0, stats[key], 1000);
        }
    });
}

// Animate number counting
function animateNumber(element, start, end, duration) {
    const range = end - start;
    const stepTime = Math.abs(Math.floor(duration / range));
    const timer = setInterval(() => {
        start += range > 0 ? 1 : -1;
        element.textContent = start;
        if (start === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Load recent activities
function loadRecentActivities() {
    const activities = [
        {
            type: 'patient',
            message: 'New patient registration: Priya Sharma',
            time: '2 minutes ago',
            icon: 'user'
        },
        {
            type: 'appointment',
            message: 'Appointment scheduled: Raj Patel - 3:00 PM',
            time: '15 minutes ago',
            icon: 'calendar'
        },
        {
            type: 'treatment',
            message: 'Treatment plan updated: Anita Gupta',
            time: '1 hour ago',
            icon: 'file-text'
        }
    ];
    
    // This would normally come from an API
    console.log('Recent activities loaded:', activities);
}

// Load section-specific data
function loadSectionData(sectionName) {
    switch (sectionName) {
        case 'patients':
            loadPatients();
            break;
        case 'appointments':
            loadAppointments();
            break;
        case 'treatments':
            loadTreatments();
            break;
        default:
            break;
    }
}

// Load patients data
function loadPatients() {
    const patients = [
        {
            id: 1,
            name: 'Raj Singh',
            age: 45,
            lastVisit: 'Dec 15, 2024',
            condition: 'Hypertension',
            avatar: 'RS'
        },
        {
            id: 2,
            name: 'Priya Sharma',
            age: 32,
            lastVisit: 'Dec 14, 2024',
            condition: 'Diabetes',
            avatar: 'PS'
        },
        {
            id: 3,
            name: 'Anita Gupta',
            age: 28,
            lastVisit: 'Dec 13, 2024',
            condition: 'Routine Checkup',
            avatar: 'AG'
        }
    ];
    
    updatePatientsTable(patients);
}

// Update patients table
function updatePatientsTable(patients) {
    const tbody = document.querySelector('.patients-table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = patients.map(patient => `
        <tr data-patient-id="${patient.id}">
            <td>
                <div class="patient-info">
                    <div class="patient-avatar">${patient.avatar}</div>
                    <span>${patient.name}</span>
                </div>
            </td>
            <td>${patient.age}</td>
            <td>${patient.lastVisit}</td>
            <td><span class="condition-tag ${patient.condition.toLowerCase().replace(' ', '-')}">${patient.condition}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view" data-action="view" data-patient-id="${patient.id}">View</button>
                    <button class="action-btn edit" data-action="edit" data-patient-id="${patient.id}">Edit</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Load appointments data
function loadAppointments() {
    const appointments = [
        {
            id: 1,
            time: '09:00 AM',
            patient: {
                name: 'Raj Singh',
                avatar: 'RS'
            },
            type: 'Follow-up consultation',
            status: 'scheduled'
        },
        {
            id: 2,
            time: '10:30 AM',
            patient: {
                name: 'Priya Sharma',
                avatar: 'PS'
            },
            type: 'Initial consultation',
            status: 'scheduled'
        },
        {
            id: 3,
            time: '12:00 PM',
            patient: null,
            type: 'Available',
            status: 'empty'
        }
    ];
    
    updateAppointmentsTimeline(appointments);
}

// Update appointments timeline
function updateAppointmentsTimeline(appointments) {
    const timeline = document.querySelector('.appointments-timeline');
    if (!timeline) return;
    
    timeline.innerHTML = appointments.map(appointment => {
        if (appointment.status === 'empty') {
            return `
                <div class="appointment-slot empty">
                    <div class="appointment-time">${appointment.time}</div>
                    <div class="empty-slot">
                        <p data-translate="no-appointment">No appointment scheduled</p>
                    </div>
                </div>
            `;
        }
        
        return `
            <div class="appointment-slot">
                <div class="appointment-time">${appointment.time}</div>
                <div class="appointment-card">
                    <div class="appointment-patient">
                        <div class="patient-avatar">${appointment.patient.avatar}</div>
                        <div class="patient-details">
                            <h4>${appointment.patient.name}</h4>
                            <p>${appointment.type}</p>
                        </div>
                    </div>
                    <div class="appointment-actions">
                        <button class="action-btn start" data-action="start" data-appointment-id="${appointment.id}">Start</button>
                        <button class="action-btn reschedule" data-action="reschedule" data-appointment-id="${appointment.id}">Reschedule</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Load treatments data
function loadTreatments() {
    const treatments = [
        {
            id: 1,
            patient: 'Raj Singh',
            condition: 'Hypertension Management',
            medications: 'Lisinopril 10mg, Hydrochlorothiazide 25mg',
            duration: '3 months',
            nextReview: 'Jan 15, 2025',
            status: 'active'
        },
        {
            id: 2,
            patient: 'Priya Sharma',
            condition: 'Diabetes Control',
            medications: 'Metformin 500mg, Insulin',
            duration: 'Ongoing',
            nextReview: 'Dec 25, 2024',
            status: 'active'
        }
    ];
    
    updateTreatmentsGrid(treatments);
}

// Update treatments grid
function updateTreatmentsGrid(treatments) {
    const grid = document.querySelector('.treatments-grid');
    if (!grid) return;
    
    grid.innerHTML = treatments.map(treatment => `
        <div class="treatment-card" data-treatment-id="${treatment.id}">
            <div class="treatment-header">
                <h3>${treatment.patient} - ${treatment.condition}</h3>
                <span class="treatment-status ${treatment.status}">${treatment.status.charAt(0).toUpperCase() + treatment.status.slice(1)}</span>
            </div>
            <div class="treatment-details">
                <p><strong>Medications:</strong> ${treatment.medications}</p>
                <p><strong>Duration:</strong> ${treatment.duration}</p>
                <p><strong>Next Review:</strong> ${treatment.nextReview}</p>
            </div>
            <div class="treatment-actions">
                <button class="action-btn edit" data-action="edit" data-treatment-id="${treatment.id}">Edit Plan</button>
                <button class="action-btn view" data-action="view" data-treatment-id="${treatment.id}">View Progress</button>
            </div>
        </div>
    `).join('');
}

// Handle action buttons
function handleActionButton(button) {
    const action = button.getAttribute('data-action');
    const patientId = button.getAttribute('data-patient-id');
    const appointmentId = button.getAttribute('data-appointment-id');
    const treatmentId = button.getAttribute('data-treatment-id');
    
    switch (action) {
        case 'view':
            if (patientId) viewPatient(patientId);
            else if (treatmentId) viewTreatment(treatmentId);
            break;
        case 'edit':
            if (patientId) editPatient(patientId);
            else if (treatmentId) editTreatment(treatmentId);
            break;
        case 'start':
            if (appointmentId) startAppointment(appointmentId);
            break;
        case 'reschedule':
            if (appointmentId) rescheduleAppointment(appointmentId);
            break;
    }
}

// Action functions (to be implemented)
function viewPatient(patientId) {
    showNotification(`Viewing patient ${patientId}`, 'info');
    // Implement patient view modal
}

function editPatient(patientId) {
    showNotification(`Editing patient ${patientId}`, 'info');
    // Implement patient edit modal
}

function viewTreatment(treatmentId) {
    showNotification(`Viewing treatment ${treatmentId}`, 'info');
    // Implement treatment view modal
}

function editTreatment(treatmentId) {
    showNotification(`Editing treatment ${treatmentId}`, 'info');
    // Implement treatment edit modal
}

function startAppointment(appointmentId) {
    showNotification(`Starting appointment ${appointmentId}`, 'success');
    // Implement appointment start functionality
}

function rescheduleAppointment(appointmentId) {
    showNotification(`Rescheduling appointment ${appointmentId}`, 'info');
    // Implement appointment reschedule modal
}

function openAddPatientModal() {
    showNotification('Opening add patient modal', 'info');
    // Implement add patient modal
}

function openAddTreatmentModal() {
    showNotification('Opening add treatment modal', 'info');
    // Implement add treatment modal
}

// Initialize charts (placeholder for future implementation)
function initializeCharts() {
    // This would integrate with a charting library like Chart.js
    console.log('Charts would be initialized here');
}

// Setup real-time updates
function setupRealTimeUpdates() {
    // Simulate real-time updates
    setInterval(() => {
        if (currentSection === 'overview') {
            // Update overview stats occasionally
            const randomStat = Math.floor(Math.random() * 4);
            // updateRandomStat(randomStat);
        }
    }, 30000); // Update every 30 seconds
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('swasthya-auth');
        showNotification('Logged out successfully!', 'success');
        
        setTimeout(() => {
            window.location.href = '/index.html';
        }, 1000);
    }
}

// Add notification function (if not already available)
function showNotification(message, type = 'info', duration = 3000) {
    // Use the same notification system from main.js
    if (window.SwasthyaMain && window.SwasthyaMain.showNotification) {
        window.SwasthyaMain.showNotification(message, type, duration);
    } else {
        // Fallback notification
        console.log(`${type.toUpperCase()}: ${message}`);
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initDashboard();
    
    // Add mobile menu button if on mobile
    if (window.innerWidth <= 768) {
        addMobileMenuButton();
    }
    
    console.log('SwasthyaAI: Doctor dashboard initialized successfully');
});

// Add mobile menu button
function addMobileMenuButton() {
    const header = document.querySelector('.main-header');
    if (header && !header.querySelector('.mobile-menu-btn')) {
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-btn';
        menuButton.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
        `;
        menuButton.addEventListener('click', toggleMobileMenu);
        
        header.insertBefore(menuButton, header.firstChild);
    }
}

// Export functions for global use
window.SwasthyaDashboard = {
    showSection,
    logout,
    toggleMobileMenu
};