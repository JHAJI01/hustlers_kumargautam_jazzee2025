// Multilingual Translation System for SwasthyaAI
const translations = {
    en: {
        // Common
        'app-title': 'SwasthyaAI',
        'tagline': 'Bridging Healthcare Communication Across Languages',
        'welcome': 'Welcome to SwasthyaAI',
        'choose-role': 'Choose your role to continue',
        'doctor': 'Doctor',
        'patient': 'Patient',
        'email': 'Email Address',
        'password': 'Password',
        'remember-me': 'Remember me',
        'forgot-password': 'Forgot Password?',
        'sign-in': 'Sign In',
        'sign-up': 'Sign Up',
        'no-account': "Don't have an account?",
        'have-account': 'Already have an account?',
        'or': 'OR',
        'back-home': 'Back to Home',
        'logout': 'Logout',
        'cancel': 'Cancel',
        'save': 'Save',
        'edit': 'Edit',
        'delete': 'Delete',
        'view': 'View',
        'add': 'Add',
        'submit': 'Submit',
        'clear': 'Clear',
        'analyze': 'Analyze',
        'online': 'Online',
        'offline': 'Offline',
        
        // Landing Page
        'doctor-desc': 'Manage patients, treatments, and schedules',
        'patient-desc': 'Book appointments, describe symptoms, get AI assistance',
        'features': 'Key Features',
        'multilingual': 'Multilingual Support',
        'voice-input': 'Voice Input',
        'ai-assistant': 'AI Assistant',
        
        // Authentication
        'doctor-login': 'Doctor Login',
        'doctor-login-desc': 'Access your medical practice dashboard',
        'patient-login': 'Patient Login',
        'patient-login-desc': 'Access your healthcare dashboard',
        'patient-signup': 'Create Patient Account',
        'patient-signup-desc': 'Join SwasthyaAI for better healthcare access',
        'doctor-access': 'Doctor Access',
        'patient-access': 'Patient Access',
        'switch-to-doctor': 'Switch to Doctor Portal',
        'switch-to-patient': 'Switch to Patient Portal',
        'first-name': 'First Name',
        'last-name': 'Last Name',
        'phone': 'Phone Number',
        'age': 'Age',
        'gender': 'Gender',
        'male': 'Male',
        'female': 'Female',
        'other': 'Other',
        'confirm-password': 'Confirm Password',
        'agree-terms': 'I agree to the Terms of Service and Privacy Policy',
        'create-account': 'Create Account',
        
        // Dashboard Common
        'overview': 'Overview',
        'appointments': 'Appointments',
        'emergency': 'Emergency',
        
        // Doctor Dashboard
        'doctor-dashboard': 'Doctor Dashboard',
        'welcome-doctor': 'Welcome back, Dr. Smith',
        'today-appointments': "Today's Appointments",
        'pending-reviews': 'Pending Reviews',
        'total-patients': 'Total Patients',
        'patient-satisfaction': 'Patient Satisfaction',
        'avg-rating': 'Average Rating',
        'recent-activities': 'Recent Activities',
        'patients': 'Patients',
        'treatments': 'Treatments',
        'patient-management': 'Patient Management',
        'add-patient': 'Add Patient',
        'name': 'Name',
        'last-visit': 'Last Visit',
        'condition': 'Condition',
        'actions': 'Actions',
        'select-date': 'Select Date',
        'no-appointment': 'No appointment scheduled',
        'treatment-plans': 'Treatment Plans',
        'new-treatment': 'New Treatment',
        
        // Patient Dashboard
        'patient-dashboard': 'Patient Dashboard',
        'welcome-patient': 'Welcome back, Priya',
        'book-appointment': 'Book Appointment',
        'schedule-visit': 'Schedule your next visit',
        'describe-symptoms': 'Describe Symptoms',
        'voice-text-input': 'Use voice or text input',
        'ask-ai': 'Ask AI Assistant',
        'get-health-guidance': 'Get health guidance',
        'health-summary': 'Health Summary',
        'last-checkup': 'Last Checkup',
        'good': 'Good',
        'next-appointment': 'Next Appointment',
        'scheduled': 'Scheduled',
        'medication-reminder': 'Medication Reminder',
        'upcoming': 'Upcoming',
        'health-records': 'Health Records',
        'download-records': 'Download Records',
        'general-consultation': 'General Consultation',
        'follow-up': 'Follow-up',
        'completed': 'Completed',
        'text': 'Text',
        'voice': 'Voice',
        'describe-symptoms-placeholder': 'Describe your symptoms in detail...',
        'ai-analysis': 'AI Analysis',
        'analysis-pending': 'Submit your symptoms for AI analysis...',
        'tap-to-record': 'Tap to start recording',
        'ai-greeting': "Hello! I'm your AI health assistant. How can I help you today?",
        'chat-placeholder': 'Ask me anything about your health...',
        'select-doctor': 'Select Doctor',
        'select-time': 'Select Time',
        'reason': 'Reason for Visit'
    },
    
    hi: {
        // Common
        'app-title': 'स्वास्थ्यAI',
        'tagline': 'भाषाओं के पार स्वास्थ्य संचार को जोड़ना',
        'welcome': 'स्वास्थ्यAI में आपका स्वागत है',
        'choose-role': 'जारी रखने के लिए अपनी भूमिका चुनें',
        'doctor': 'डॉक्टर',
        'patient': 'मरीज़',
        'email': 'ईमेल पता',
        'password': 'पासवर्ड',
        'remember-me': 'मुझे याद रखें',
        'forgot-password': 'पासवर्ड भूल गए?',
        'sign-in': 'साइन इन',
        'sign-up': 'साइन अप',
        'no-account': 'कोई खाता नहीं है?',
        'have-account': 'पहले से खाता है?',
        'or': 'या',
        'back-home': 'होम पर वापस',
        'logout': 'लॉग आउट',
        'cancel': 'रद्द करें',
        'save': 'सेव करें',
        'edit': 'संपादित करें',
        'delete': 'हटाएं',
        'view': 'देखें',
        'add': 'जोड़ें',
        'submit': 'जमा करें',
        'clear': 'साफ करें',
        'analyze': 'विश्लेषण करें',
        'online': 'ऑनलाइन',
        'offline': 'ऑफलाइन',
        
        // Landing Page
        'doctor-desc': 'मरीजों, उपचार और कार्यक्रम का प्रबंधन करें',
        'patient-desc': 'अपॉइंटमेंट बुक करें, लक्षण बताएं, AI सहायता प्राप्त करें',
        'features': 'मुख्य विशेषताएं',
        'multilingual': 'बहुभाषी समर्थन',
        'voice-input': 'आवाज इनपुट',
        'ai-assistant': 'AI सहायक',
        
        // Authentication
        'doctor-login': 'डॉक्टर लॉगिन',
        'doctor-login-desc': 'अपने मेडिकल प्रैक्टिस डैशबोर्ड तक पहुंचें',
        'patient-login': 'मरीज़ लॉगिन',
        'patient-login-desc': 'अपने स्वास्थ्य डैशबोर्ड तक पहुंचें',
        'patient-signup': 'मरीज़ खाता बनाएं',
        'patient-signup-desc': 'बेहतर स्वास्थ्य पहुंच के लिए स्वास्थ्यAI में शामिल हों',
        'doctor-access': 'डॉक्टर पहुंच',
        'patient-access': 'मरीज़ पहुंच',
        'switch-to-doctor': 'डॉक्टर पोर्टल पर स्विच करें',
        'switch-to-patient': 'मरीज़ पोर्टल पर स्विच करें',
        'first-name': 'पहला नाम',
        'last-name': 'अंतिम नाम',
        'phone': 'फोन नंबर',
        'age': 'उम्र',
        'gender': 'लिंग',
        'male': 'पुरुष',
        'female': 'महिला',
        'other': 'अन्य',
        'confirm-password': 'पासवर्ड की पुष्टि करें',
        'agree-terms': 'मैं सेवा की शर्तों और गोपनीयता नीति से सहमत हूं',
        'create-account': 'खाता बनाएं',
        
        // Dashboard Common
        'overview': 'अवलोकन',
        'appointments': 'अपॉइंटमेंट',
        'emergency': 'आपातकाल',
        
        // Doctor Dashboard
        'doctor-dashboard': 'डॉक्टर डैशबोर्ड',
        'welcome-doctor': 'वापस स्वागत है, डॉ. स्मिथ',
        'today-appointments': 'आज के अपॉइंटमेंट',
        'pending-reviews': 'लंबित समीक्षाएं',
        'total-patients': 'कुल मरीज़',
        'patient-satisfaction': 'मरीज़ संतुष्टि',
        'avg-rating': 'औसत रेटिंग',
        'recent-activities': 'हाल की गतिविधियां',
        'patients': 'मरीज़',
        'treatments': 'उपचार',
        'patient-management': 'मरीज़ प्रबंधन',
        'add-patient': 'मरीज़ जोड़ें',
        'name': 'नाम',
        'last-visit': 'अंतिम यात्रा',
        'condition': 'स्थिति',
        'actions': 'कार्य',
        'select-date': 'तारीख चुनें',
        'no-appointment': 'कोई अपॉइंटमेंट निर्धारित नहीं',
        'treatment-plans': 'उपचार योजनाएं',
        'new-treatment': 'नया उपचार',
        
        // Patient Dashboard
        'patient-dashboard': 'मरीज़ डैशबोर्ड',
        'welcome-patient': 'वापस स्वागत है, प्रिया',
        'book-appointment': 'अपॉइंटमेंट बुक करें',
        'schedule-visit': 'अपनी अगली यात्रा निर्धारित करें',
        'describe-symptoms': 'लक्षण बताएं',
        'voice-text-input': 'आवाज या टेक्स्ट इनपुट का उपयोग करें',
        'ask-ai': 'AI सहायक से पूछें',
        'get-health-guidance': 'स्वास्थ्य मार्गदर्शन प्राप्त करें',
        'health-summary': 'स्वास्थ्य सारांश',
        'last-checkup': 'अंतिम जांच',
        'good': 'अच्छा',
        'next-appointment': 'अगला अपॉइंटमेंट',
        'scheduled': 'निर्धारित',
        'medication-reminder': 'दवा रिमाइंडर',
        'upcoming': 'आगामी',
        'health-records': 'स्वास्थ्य रिकॉर्ड',
        'download-records': 'रिकॉर्ड डाउनलोड करें',
        'general-consultation': 'सामान्य परामर्श',
        'follow-up': 'फॉलो-अप',
        'completed': 'पूर्ण',
        'text': 'टेक्स्ट',
        'voice': 'आवाज',
        'describe-symptoms-placeholder': 'अपने लक्षणों का विस्तार से वर्णन करें...',
        'ai-analysis': 'AI विश्लेषण',
        'analysis-pending': 'AI विश्लेषण के लिए अपने लक्षण जमा करें...',
        'tap-to-record': 'रिकॉर्डिंग शुरू करने के लिए टैप करें',
        'ai-greeting': 'नमस्ते! मैं आपका AI स्वास्थ्य सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?',
        'chat-placeholder': 'अपने स्वास्थ्य के बारे में मुझसे कुछ भी पूछें...',
        'select-doctor': 'डॉक्टर चुनें',
        'select-time': 'समय चुनें',
        'reason': 'यात्रा का कारण'
    },
    
    bn: {
        // Common
        'app-title': 'স্বাস্থ্যAI',
        'tagline': 'ভাষার সীমানা পেরিয়ে স্বাস্থ্যসেবা যোগাযোগ',
        'welcome': 'স্বাস্থ্যAI-তে স্বাগতম',
        'choose-role': 'চালিয়ে যেতে আপনার ভূমিকা বেছে নিন',
        'doctor': 'ডাক্তার',
        'patient': 'রোগী',
        'email': 'ইমেইল ঠিকানা',
        'password': 'পাসওয়ার্ড',
        'remember-me': 'আমাকে মনে রাখুন',
        'forgot-password': 'পাসওয়ার্ড ভুলে গেছেন?',
        'sign-in': 'সাইন ইন',
        'sign-up': 'সাইন আপ',
        'no-account': 'কোনো অ্যাকাউন্ট নেই?',
        'have-account': 'ইতিমধ্যে অ্যাকাউন্ট আছে?',
        'or': 'অথবা',
        'back-home': 'হোমে ফিরুন',
        'logout': 'লগ আউট',
        'cancel': 'বাতিল',
        'save': 'সংরক্ষণ',
        'edit': 'সম্পাদনা',
        'delete': 'মুছুন',
        'view': 'দেখুন',
        'add': 'যোগ করুন',
        'submit': 'জমা দিন',
        'clear': 'পরিষ্কার',
        'analyze': 'বিশ্লেষণ',
        'online': 'অনলাইন',
        'offline': 'অফলাইন'
    },
    
    ta: {
        // Common
        'app-title': 'ஸ்வாஸ்த்யAI',
        'tagline': 'மொழிகளில் சுகாதார தகவல்தொடர்பை இணைத்தல்',
        'welcome': 'ஸ்வாஸ்த்யAI-க்கு வரவேற்கிறோம்',
        'choose-role': 'தொடர உங்கள் பங்கைத் தேர்வு செய்யுங்கள்',
        'doctor': 'மருத்துவர்',
        'patient': 'நோயாளி',
        'email': 'மின்னஞ்சல் முகவரி',
        'password': 'கடவுச்சொல்',
        'remember-me': 'என்னை நினைவில் வைத்துக்கொள்ளுங்கள்',
        'forgot-password': 'கடவுச்சொல்லை மறந்துவிட்டீர்களா?',
        'sign-in': 'உள்நுழைய',
        'sign-up': 'பதிவு செய்க',
        'no-account': 'கணக்கு இல்லையா?',
        'have-account': 'ஏற்கனவே கணக்கு உள்ளதா?',
        'or': 'அல்லது',
        'back-home': 'வீட்டிற்கு திரும்பு',
        'logout': 'வெளியேறு',
        'cancel': 'ரத்து செய்',
        'save': 'சேமி',
        'edit': 'திருத்து',
        'delete': 'நீக்கு',
        'view': 'பார்',
        'add': 'சேர்',
        'submit': 'சமர்பிக்க',
        'clear': 'அழி',
        'analyze': 'பகுப்பாய்வு',
        'online': 'ஆன்லைன்',
        'offline': 'ஆஃப்லைன்'
    },
    
    te: {
        // Common
        'app-title': 'స్వాస్థ్యAI',
        'tagline': 'భాషల అంతటా ఆరోగ్య కమ్యూనికేషన్‌ను కలుపుట',
        'welcome': 'స్వాస్థ్యAIకి స్వాగతం',
        'choose-role': 'కొనసాగించడానికి మీ పాత్రను ఎంచుకోండి',
        'doctor': 'వైద్యుడు',
        'patient': 'రోగి',
        'email': 'ఇమెయిల్ చిరునామా',
        'password': 'పాస్‌వర్డ్',
        'remember-me': 'నన్ను గుర్తుంచుకోండి',
        'forgot-password': 'పాస్‌వర్డ్ మర్చిపోయారా?',
        'sign-in': 'సైన్ ఇన్',
        'sign-up': 'సైన్ అప్',
        'no-account': 'ఖాతా లేదా?',
        'have-account': 'ఇప్పటికే ఖాతా ఉందా?',
        'or': 'లేదా',
        'back-home': 'ఇంటికి తిరిగి',
        'logout': 'లాగ్ అవుట్',
        'cancel': 'రద్దు చేయి',
        'save': 'సేవ్ చేయి',
        'edit': 'సవరించు',
        'delete': 'తొలగించు',
        'view': 'చూడు',
        'add': 'జోడించు',
        'submit': 'సమర్పించు',
        'clear': 'క్లియర్',
        'analyze': 'విశ్లేషణ',
        'online': 'ఆన్‌లైన్',
        'offline': 'ఆఫ్‌లైన్'
    },
    
    mr: {
        // Common
        'app-title': 'स्वास्थ्यAI',
        'tagline': 'भाषांमध्ये आरोग्य संवाद जोडणे',
        'welcome': 'स्वास्थ्यAI मध्ये स्वागत आहे',
        'choose-role': 'सुरू ठेवण्यासाठी तुमची भूमिका निवडा',
        'doctor': 'डॉक्टर',
        'patient': 'रुग्ण',
        'email': 'ईमेल पत्ता',
        'password': 'पासवर्ड',
        'remember-me': 'मला लक्षात ठेवा',
        'forgot-password': 'पासवर्ड विसरलात?',
        'sign-in': 'साइन इन',
        'sign-up': 'साइन अप',
        'no-account': 'खाते नाही?',
        'have-account': 'आधीच खाते आहे?',
        'or': 'किंवा',
        'back-home': 'घरी परत',
        'logout': 'लॉग आउट',
        'cancel': 'रद्द करा',
        'save': 'जतन करा',
        'edit': 'संपादित करा',
        'delete': 'हटवा',
        'view': 'पहा',
        'add': 'जोडा',
        'submit': 'सबमिट करा',
        'clear': 'साफ करा',
        'analyze': 'विश्लेषण',
        'online': 'ऑनलाइन',
        'offline': 'ऑफलाइन'
    },
    
    gu: {
        // Common
        'app-title': 'સ્વાસ્થ્યAI',
        'tagline': 'ભાષાઓમાં આરોગ્ય સંચાર જોડવું',
        'welcome': 'સ્વાસ્થ્યAIમાં આપનું સ્વાગત છે',
        'choose-role': 'ચાલુ રાખવા માટે તમારી ભૂમિકા પસંદ કરો',
        'doctor': 'ડૉક્ટર',
        'patient': 'દર્દી',
        'email': 'ઈમેઈલ સરનામું',
        'password': 'પાસવર્ડ',
        'remember-me': 'મને યાદ રાખો',
        'forgot-password': 'પાસવર્ડ ભૂલી ગયા?',
        'sign-in': 'સાઈન ઈન',
        'sign-up': 'સાઈન અપ',
        'no-account': 'ખાતું નથી?',
        'have-account': 'પહેલેથી ખાતું છે?',
        'or': 'અથવા',
        'back-home': 'ઘરે પાછા',
        'logout': 'લોગ આઉટ',
        'cancel': 'રદ કરો',
        'save': 'સેવ કરો',
        'edit': 'સંપાદિત કરો',
        'delete': 'કાઢી નાખો',
        'view': 'જુઓ',
        'add': 'ઉમેરો',
        'submit': 'સબમિટ કરો',
        'clear': 'સાફ કરો',
        'analyze': 'વિશ્લેષણ',
        'online': 'ઓનલાઈન',
        'offline': 'ઓફલાઈન'
    }
};

let currentLanguage = 'en';

// Initialize translation system
function initTranslations() {
    // Get saved language from localStorage
    const savedLanguage = localStorage.getItem('swasthya-language');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
    }
    
    // Set language dropdown
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = currentLanguage;
        languageSelect.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
    }
    
    // Apply translations
    applyTranslations();
}

// Change language
function changeLanguage(languageCode) {
    if (!translations[languageCode]) {
        console.warn(`Language ${languageCode} not supported`);
        return;
    }
    
    currentLanguage = languageCode;
    localStorage.setItem('swasthya-language', languageCode);
    
    // Update dropdown
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = languageCode;
    }
    
    // Apply translations
    applyTranslations();
    
    // Update document language
    document.documentElement.lang = languageCode;
}

// Apply translations to the current page
function applyTranslations() {
    const elementsToTranslate = document.querySelectorAll('[data-translate]');
    
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getTranslation(key);
        
        if (translation) {
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translation;
            } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
    
    // Handle placeholder translations
    const elementsWithPlaceholders = document.querySelectorAll('[data-translate-placeholder]');
    elementsWithPlaceholders.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        const translation = getTranslation(key);
        if (translation) {
            element.placeholder = translation;
        }
    });
}

// Get translation for a key
function getTranslation(key) {
    return translations[currentLanguage] && translations[currentLanguage][key] 
        ? translations[currentLanguage][key] 
        : translations['en'][key] || key;
}

// Get current language
function getCurrentLanguage() {
    return currentLanguage;
}

// Check if language is RTL
function isRTL() {
    const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
    return rtlLanguages.includes(currentLanguage);
}

// Update text direction based on language
function updateTextDirection() {
    document.documentElement.dir = isRTL() ? 'rtl' : 'ltr';
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTranslations);
} else {
    initTranslations();
}

// Export functions for global use
window.SwasthyaTranslations = {
    changeLanguage,
    getTranslation,
    getCurrentLanguage,
    isRTL,
    updateTextDirection
};