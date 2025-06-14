// Patient Dashboard JavaScript for SwasthyaAI

let currentSection = 'overview';
let isRecording = false;
let mediaRecorder = null;
let audioChunks = [];
let currentInputMode = 'text';

// Initialize patient dashboard
function initPatientDashboard() {
    checkAuthentication();
    setupNavigation();
    setupEventListeners();
    loadDashboardData();
    initializeVoiceInput();
    setupChatSystem();
    initializeSymptomsAnalyzer();
}

// Check if user is authenticated
function checkAuthentication() {
    const authData = localStorage.getItem('swasthya-auth');
    
    if (!authData) {
        window.location.href = '/patient-login.html';
        return;
    }
    
    try {
        const auth = JSON.parse(authData);
        if (auth.user.role !== 'patient') {
            window.location.href = '/index.html';
            return;
        }
        
        // Update welcome message with patient name
        updateWelcomeMessage(auth.user);
        
    } catch (error) {
        console.error('Error parsing auth data:', error);
        localStorage.removeItem('swasthya-auth');
        window.location.href = '/patient-login.html';
    }
}

// Update welcome message
function updateWelcomeMessage(user) {
    const welcomeElement = document.querySelector('[data-translate="welcome-patient"]');
    if (welcomeElement) {
        const patientName = extractPatientName(user.email);
        welcomeElement.textContent = `Welcome back, ${patientName}`;
    }
}

// Extract patient name from email
function extractPatientName(email) {
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
    // Emergency button
    const emergencyBtn = document.querySelector('.emergency-btn');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', handleEmergency);
    }
    
    // Quick action cards
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const sectionToShow = card.getAttribute('onclick')?.match(/showSection\('(.+?)'\)/)?.[1];
            if (sectionToShow) {
                showSection(sectionToShow);
            }
        });
    });
    
    // Input mode toggle
    const modeButtons = document.querySelectorAll('.mode-btn');
    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.getAttribute('data-mode');
            switchInputMode(mode);
        });
    });
    
    // Symptoms form
    const clearBtn = document.querySelector('.clear-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearSymptoms);
    }
    
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', submitSymptoms);
    }
    
    // Booking modal
    setupBookingModal();
    
    // Chat input
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
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
    loadHealthSummary();
    loadAppointments();
    loadHealthRecords();
    
    // Load current section data
    loadSectionData(currentSection);
}

// Load health summary
function loadHealthSummary() {
    const summary = {
        lastCheckup: 'Dec 10, 2024',
        nextAppointment: 'Dec 20, 2024',
        medicationReminder: '2 hours'
    };
    
    // Update summary cards
    console.log('Health summary loaded:', summary);
}

// Load section-specific data
function loadSectionData(sectionName) {
    switch (sectionName) {
        case 'appointments':
            loadAppointments();
            break;
        case 'health-records':
            loadHealthRecords();
            break;
        case 'ai-assistant':
            initializeChatMessages();
            break;
        default:
            break;
    }
}

// Load appointments
function loadAppointments() {
    const appointments = [
        {
            id: 1,
            doctor: 'Dr. Rajesh Kumar',
            type: 'General Consultation',
            date: '20',
            month: 'Dec',
            time: '10:30 AM',
            status: 'upcoming'
        },
        {
            id: 2,
            doctor: 'Dr. Priya Patel',
            type: 'Follow-up',
            date: '10',
            month: 'Dec',
            time: '2:00 PM',
            status: 'completed'
        }
    ];
    
    updateAppointmentsList(appointments);
}

// Update appointments list
function updateAppointmentsList(appointments) {
    const appointmentsList = document.querySelector('.appointments-list');
    if (!appointmentsList) return;
    
    appointmentsList.innerHTML = appointments.map(appointment => `
        <div class="appointment-item ${appointment.status}">
            <div class="appointment-date">
                <div class="date-day">${appointment.date}</div>
                <div class="date-month">${appointment.month}</div>
            </div>
            <div class="appointment-details">
                <h4>${appointment.doctor}</h4>
                <p data-translate="${appointment.type.toLowerCase().replace(' ', '-')}">${appointment.type}</p>
                <span class="appointment-time">${appointment.time}</span>
            </div>
            <div class="appointment-status">
                <span class="status-badge ${appointment.status}" data-translate="${appointment.status}">${appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}</span>
            </div>
        </div>
    `).join('');
}

// Load health records
function loadHealthRecords() {
    const records = [
        {
            date: 'Dec 10, 2024',
            doctor: 'Dr. Priya Patel',
            type: 'General Checkup',
            details: [
                'Blood pressure: 120/80 mmHg (Normal)',
                'Weight: 65 kg, Height: 165 cm',
                'Recommendations: Continue current diet, increase water intake'
            ]
        },
        {
            date: 'Nov 15, 2024',
            doctor: 'Lab Results',
            type: 'Blood Test Results',
            details: [
                'Hemoglobin: 12.5 g/dL (Normal)',
                'Blood Sugar: 95 mg/dL (Normal)',
                'Cholesterol: 180 mg/dL (Good)'
            ]
        }
    ];
    
    updateHealthRecords(records);
}

// Update health records
function updateHealthRecords(records) {
    const timeline = document.querySelector('.records-timeline');
    if (!timeline) return;
    
    timeline.innerHTML = records.map(record => `
        <div class="record-item">
            <div class="record-date">${record.date}</div>
            <div class="record-content">
                <h4>${record.type} - ${record.doctor}</h4>
                ${record.details.map(detail => `<p>${detail}</p>`).join('')}
            </div>
        </div>
    `).join('');
}

// Handle emergency button
function handleEmergency() {
    if (confirm('Are you experiencing a medical emergency? This will connect you to emergency services.')) {
        showNotification('Connecting to emergency services...', 'error');
        
        // In a real app, this would:
        // 1. Get user's location
        // 2. Call emergency services API
        // 3. Send emergency contacts notification
        // 4. Provide immediate guidance
        
        setTimeout(() => {
            alert('Emergency services have been notified. Help is on the way.\n\nEmergency Number: 108\nStay calm and follow any instructions given.');
        }, 2000);
    }
}

// Initialize voice input
function initializeVoiceInput() {
    const recordBtn = document.getElementById('recordBtn');
    if (!recordBtn) return;
    
    recordBtn.addEventListener('click', toggleRecording);
    
    // Check if browser supports speech recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        console.warn('Speech recognition not supported in this browser');
        recordBtn.disabled = true;
        recordBtn.innerHTML = '<span>Voice not supported</span>';
    }
}

// Switch input mode between text and voice
function switchInputMode(mode) {
    currentInputMode = mode;
    
    // Update buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    
    // Show/hide input modes
    const textMode = document.querySelector('.text-input-mode');
    const voiceMode = document.querySelector('.voice-input-mode');
    
    if (mode === 'text') {
        textMode.classList.add('active');
        voiceMode.classList.remove('active');
    } else {
        textMode.classList.remove('active');
        voiceMode.classList.add('active');
    }
}

// Toggle recording
function toggleRecording() {
    if (isRecording) {
        stopRecording();
    } else {
        startRecording();
    }
}

// Start recording
function startRecording() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        showNotification('Speech recognition not supported', 'error');
        return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = getCurrentLanguage() === 'hi' ? 'hi-IN' : 'en-US';
    
    const recordBtn = document.getElementById('recordBtn');
    const recordingStatus = document.querySelector('.recording-status');
    const voiceTranscript = document.getElementById('voiceTranscript');
    const waveform = document.querySelector('.voice-waveform');
    
    recognition.onstart = () => {
        isRecording = true;
        recordBtn.classList.add('recording');
        recordingStatus.textContent = 'Recording... Speak now';
        waveform.classList.add('recording');
    };
    
    recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
        }
        
        voiceTranscript.textContent = finalTranscript + interimTranscript;
    };
    
    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        stopRecording();
        showNotification('Speech recognition error. Please try again.', 'error');
    };
    
    recognition.onend = () => {
        stopRecording();
    };
    
    recognition.start();
    window.currentRecognition = recognition;
}

// Stop recording
function stopRecording() {
    if (window.currentRecognition) {
        window.currentRecognition.stop();
    }
    
    isRecording = false;
    const recordBtn = document.getElementById('recordBtn');
    const recordingStatus = document.querySelector('.recording-status');
    const waveform = document.querySelector('.voice-waveform');
    
    recordBtn.classList.remove('recording');
    recordingStatus.textContent = 'Tap to start recording';
    waveform.classList.remove('recording');
}

// Clear symptoms
function clearSymptoms() {
    const symptomsText = document.getElementById('symptomsText');
    const voiceTranscript = document.getElementById('voiceTranscript');
    
    if (symptomsText) symptomsText.value = '';
    if (voiceTranscript) voiceTranscript.textContent = '';
    
    // Clear analysis
    const analysisContent = document.querySelector('.analysis-content');
    if (analysisContent) {
        analysisContent.innerHTML = '<p data-translate="analysis-pending">Submit your symptoms for AI analysis...</p>';
    }
}

// Submit symptoms for analysis
async function submitSymptoms() {
    let symptoms = '';
    
    if (currentInputMode === 'text') {
        const symptomsText = document.getElementById('symptomsText');
        symptoms = symptomsText?.value.trim();
    } else {
        const voiceTranscript = document.getElementById('voiceTranscript');
        symptoms = voiceTranscript?.textContent.trim();
    }
    
    if (!symptoms) {
        showNotification('Please describe your symptoms first', 'warning');
        return;
    }
    
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <div class="loading" style="width: 16px; height: 16px; margin-right: 8px;"></div>
        Analyzing...
    `;
    
    try {
        // Simulate AI analysis
        const analysis = await analyzeSymptoms(symptoms);
        displayAnalysis(analysis);
        showNotification('Symptoms analyzed successfully', 'success');
        
    } catch (error) {
        console.error('Symptoms analysis error:', error);
        showNotification('Analysis failed. Please try again.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

// Initialize symptoms analyzer
function initializeSymptomsAnalyzer() {
    // Set up real-time translation if needed
    console.log('Symptoms analyzer initialized');
}

// Analyze symptoms (mock AI function)
async function analyzeSymptoms(symptoms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Mock AI analysis
            const analysis = {
                summary: 'Based on your symptoms, you may be experiencing common cold or flu symptoms.',
                recommendations: [
                    'Get plenty of rest',
                    'Stay hydrated',
                    'Consider over-the-counter medications for symptom relief',
                    'Monitor your temperature'
                ],
                urgency: 'low',
                specialist: 'General Practitioner',
                followUp: 'If symptoms persist for more than 7 days or worsen, please consult a doctor.'
            };
            
            resolve(analysis);
        }, 2000);
    });
}

// Display analysis results
function displayAnalysis(analysis) {
    const analysisContent = document.querySelector('.analysis-content');
    if (!analysisContent) return;
    
    const urgencyClass = analysis.urgency === 'high' ? 'urgent' : analysis.urgency === 'medium' ? 'moderate' : 'low';
    
    analysisContent.innerHTML = `
        <div class="analysis-summary">
            <h4>Analysis Summary</h4>
            <p>${analysis.summary}</p>
        </div>
        
        <div class="analysis-recommendations">
            <h4>Recommendations</h4>
            <ul>
                ${analysis.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>
        
        <div class="analysis-urgency urgency-${urgencyClass}">
            <h4>Urgency Level: ${analysis.urgency.toUpperCase()}</h4>
        </div>
        
        <div class="analysis-specialist">
            <h4>Recommended Specialist</h4>
            <p>${analysis.specialist}</p>
        </div>
        
        <div class="analysis-followup">
            <h4>Follow-up</h4>
            <p>${analysis.followUp}</p>
        </div>
        
        <div class="analysis-actions">
            <button class="primary-button patient-button" onclick="bookAppointmentFromAnalysis('${analysis.specialist}')">
                Book Appointment
            </button>
        </div>
    `;
}

// Book appointment from analysis
function bookAppointmentFromAnalysis(specialist) {
    openBookingModal();
    // Pre-select specialist if available
    const doctorSelect = document.getElementById('doctorSelect');
    if (doctorSelect) {
        // Find and select the appropriate doctor
        for (let option of doctorSelect.options) {
            if (option.text.includes(specialist.split(' ')[0])) {
                option.selected = true;
                break;
            }
        }
    }
}

// Setup booking modal
function setupBookingModal() {
    const modal = document.getElementById('bookingModal');
    const bookingForm = document.querySelector('.booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeBookingModal();
            }
        });
    }
}

// Open booking modal
function openBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.add('active');
        
        // Set minimum date to today
        const dateInput = document.getElementById('appointmentDate');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
            dateInput.value = today;
        }
    }
}

// Close booking modal
function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.remove('active');
        
        // Reset form
        const form = modal.querySelector('.booking-form');
        if (form) {
            form.reset();
        }
    }
}

// Handle booking form submission
async function handleBookingSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const bookingData = {
        doctor: formData.get('doctorSelect') || document.getElementById('doctorSelect').value,
        date: formData.get('appointmentDate') || document.getElementById('appointmentDate').value,
        time: formData.get('appointmentTime') || document.getElementById('appointmentTime').value,
        reason: formData.get('appointmentReason') || document.getElementById('appointmentReason').value
    };
    
    // Validate required fields
    if (!bookingData.doctor || !bookingData.date || !bookingData.time) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <div class="loading" style="width: 16px; height: 16px; margin-right: 8px;"></div>
        Booking...
    `;
    
    try {
        // Simulate API call
        await simulateBooking(bookingData);
        
        showNotification('Appointment booked successfully!', 'success');
        closeBookingModal();
        
        // Refresh appointments if on appointments section
        if (currentSection === 'appointments') {
            loadAppointments();
        }
        
    } catch (error) {
        console.error('Booking error:', error);
        showNotification('Booking failed. Please try again.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

// Simulate booking (replace with real API)
async function simulateBooking(bookingData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simple validation
            if (bookingData.doctor && bookingData.date && bookingData.time) {
                // Store booking
                const bookings = JSON.parse(localStorage.getItem('swasthya-bookings') || '[]');
                const newBooking = {
                    id: Date.now(),
                    ...bookingData,
                    status: 'upcoming',
                    createdAt: new Date().toISOString()
                };
                
                bookings.push(newBooking);
                localStorage.setItem('swasthya-bookings', JSON.stringify(bookings));
                
                resolve(newBooking);
            } else {
                reject(new Error('Invalid booking data'));
            }
        }, 1500);
    });
}

// Setup chat system
function setupChatSystem() {
    const sendBtn = document.querySelector('.send-btn');
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
}

// Initialize chat messages
function initializeChatMessages() {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    // Add welcome message if not present
    if (!chatMessages.querySelector('.bot-message')) {
        addChatMessage('Hello! I\'m your AI health assistant. How can I help you today?', 'bot');
    }
}

// Send chat message
async function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Simulate AI response
        const response = await getAIResponse(message);
        removeTypingIndicator();
        addChatMessage(response, 'bot');
        
    } catch (error) {
        console.error('AI response error:', error);
        removeTypingIndicator();
        addChatMessage('Sorry, I encountered an error. Please try again.', 'bot');
    }
}

// Add chat message
function addChatMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    
    if (sender === 'bot') {
        avatar.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
        `;
    } else {
        avatar.textContent = 'You';
    }
    
    const content = document.createElement('div');
    content.className = 'message-content';
    content.textContent = message;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
        </div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Get AI response (mock function)
async function getAIResponse(message) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simple keyword-based responses
            const lowerMessage = message.toLowerCase();
            
            if (lowerMessage.includes('pain') || lowerMessage.includes('hurt')) {
                resolve('I understand you\'re experiencing pain. Can you describe where it hurts and how severe it is on a scale of 1-10?');
            } else if (lowerMessage.includes('fever') || lowerMessage.includes('temperature')) {
                resolve('Fever can be concerning. Have you measured your temperature? Also, are you experiencing any other symptoms like chills, headache, or fatigue?');
            } else if (lowerMessage.includes('appointment') || lowerMessage.includes('book')) {
                resolve('I can help you book an appointment! You can use the appointment booking feature in your dashboard. Would you like me to guide you through the process?');
            } else if (lowerMessage.includes('medication') || lowerMessage.includes('medicine')) {
                resolve('For medication-related questions, I recommend consulting with your doctor or pharmacist. However, I can help you set medication reminders or provide general information about drug interactions.');
            } else if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent')) {
                resolve('If this is a medical emergency, please call emergency services immediately (108) or visit the nearest emergency room. For urgent but non-emergency concerns, consider booking an urgent care appointment.');
            } else {
                resolve('Thank you for your question. While I can provide general health information, I recommend discussing specific symptoms or concerns with a healthcare professional. Would you like me to help you book an appointment?');
            }
        }, 1500);
    });
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

// Show notification function
function showNotification(message, type = 'info', duration = 3000) {
    if (window.SwasthyaMain && window.SwasthyaMain.showNotification) {
        window.SwasthyaMain.showNotification(message, type, duration);
    } else {
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

// Add typing dots CSS
function addTypingDotsCSS() {
    if (!document.querySelector('#typing-dots-styles')) {
        const styles = document.createElement('style');
        styles.id = 'typing-dots-styles';
        styles.textContent = `
            .typing-dots {
                display: flex;
                gap: 4px;
                padding: 8px 0;
            }
            
            .typing-dots span {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #3B82F6;
                animation: typing-animation 1.4s infinite ease-in-out;
            }
            
            .typing-dots span:nth-child(1) { animation-delay: 0s; }
            .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
            .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
            
            @keyframes typing-animation {
                0%, 80%, 100% {
                    transform: scale(0.8);
                    opacity: 0.5;
                }
                40% {
                    transform: scale(1);
                    opacity: 1;
                }
            }
            
            .analysis-urgency {
                padding: 1rem;
                border-radius: 8px;
                margin: 1rem 0;
            }
            
            .urgency-low {
                background: rgba(34, 197, 94, 0.1);
                border-left: 4px solid #22C55E;
            }
            
            .urgency-moderate {
                background: rgba(245, 158, 11, 0.1);
                border-left: 4px solid #F59E0B;
            }
            
            .urgency-high {
                background: rgba(239, 68, 68, 0.1);
                border-left: 4px solid #EF4444;
            }
            
            .analysis-actions {
                margin-top: 1.5rem;
                text-align: center;
            }
        `;
        document.head.appendChild(styles);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initPatientDashboard();
    addTypingDotsCSS();
    
    // Add mobile menu button if on mobile
    if (window.innerWidth <= 768) {
        addMobileMenuButton();
    }
    
    console.log('SwasthyaAI: Patient dashboard initialized successfully');
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
window.SwasthyaPatientDashboard = {
    showSection,
    logout,
    openBookingModal,
    closeBookingModal,
    toggleMobileMenu
};