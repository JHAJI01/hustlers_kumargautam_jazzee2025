import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Common
      'welcome': 'Welcome to SwasthyaAI',
      'login': 'Login',
      'signup': 'Sign Up',
      'logout': 'Logout',
      'loading': 'Loading...',
      'save': 'Save',
      'cancel': 'Cancel',
      'submit': 'Submit',
      'search': 'Search',
      'language': 'Language',
      
      // Landing Page
      'chooserole': 'Choose Your Role',
      'doctor': 'Doctor',
      'patient': 'Patient',
      'doctordesc': 'Manage patients and provide care',
      'patientdesc': 'Get medical consultation and care',
      
      // Auth
      'email': 'Email',
      'password': 'Password',
      'name': 'Full Name',
      'phone': 'Phone Number',
      'confirmpassword': 'Confirm Password',
      'forgotpassword': 'Forgot Password?',
      'alreadyaccount': 'Already have an account?',
      'noAccount': 'Don\'t have an account?',
      
      // Dashboard
      'dashboard': 'Dashboard',
      'appointments': 'Appointments',
      'patients': 'Patients',
      'reports': 'Medical Reports',
      'profile': 'Profile',
      'settings': 'Settings',
      'notifications': 'Notifications',
      
      // Symptoms
      'symptoms': 'Symptoms',
      'describe': 'Describe your symptoms',
      'voiceinput': 'Voice Input',
      'startvoice': 'Start Voice Input',
      'stopvoice': 'Stop Voice Input',
      'analyzing': 'Analyzing symptoms...',
      
      // Appointments
      'bookappointment': 'Book Appointment',
      'selectdoctor': 'Select Doctor',
      'selectdate': 'Select Date',
      'selecttime': 'Select Time',
      'appointmentbooked': 'Appointment Booked Successfully',
      
      // Medical Records
      'uploadreport': 'Upload Medical Report',
      'viewreports': 'View Reports',
      'medicalhistory': 'Medical History',
      'prescription': 'Prescription',
      'diagnosis': 'Diagnosis',
      'treatment': 'Treatment',
    }
  },
  hi: {
    translation: {
      // Common
      'welcome': 'स्वास्थ्य AI में आपका स्वागत है',
      'login': 'लॉगिन',
      'signup': 'साइन अप',
      'logout': 'लॉगआउट',
      'loading': 'लोड हो रहा है...',
      'save': 'सेव करें',
      'cancel': 'रद्द करें',
      'submit': 'सबमिट करें',
      'search': 'खोजें',
      'language': 'भाषा',
      
      // Landing Page
      'chooserole': 'अपनी भूमिका चुनें',
      'doctor': 'डॉक्टर',
      'patient': 'मरीज़',
      'doctordesc': 'मरीज़ों का प्रबंधन और देखभाल करें',
      'patientdesc': 'चिकित्सा परामर्श और देखभाल प्राप्त करें',
      
      // Auth
      'email': 'ईमेल',
      'password': 'पासवर्ड',
      'name': 'पूरा नाम',
      'phone': 'फ़ोन नंबर',
      'confirmpassword': 'पासवर्ड की पुष्टि करें',
      'forgotpassword': 'पासवर्ड भूल गए?',
      'alreadyaccount': 'पहले से खाता है?',
      'noAccount': 'कोई खाता नहीं है?',
      
      // Dashboard
      'dashboard': 'डैशबोर्ड',
      'appointments': 'अपॉइंटमेंट',
      'patients': 'मरीज़',
      'reports': 'चिकित्सा रिपोर्ट',
      'profile': 'प्रोफ़ाइल',
      'settings': 'सेटिंग्स',
      'notifications': 'सूचनाएं',
      
      // Symptoms
      'symptoms': 'लक्षण',
      'describe': 'अपने लक्षणों का वर्णन करें',
      'voiceinput': 'आवाज़ इनपुट',
      'startvoice': 'आवाज़ इनपुट शुरू करें',
      'stopvoice': 'आवाज़ इनपुट रोकें',
      'analyzing': 'लक्षणों का विश्लेषण कर रहे हैं...',
      
      // Appointments
      'bookappointment': 'अपॉइंटमेंट बुक करें',
      'selectdoctor': 'डॉक्टर चुनें',
      'selectdate': 'तारीख चुनें',
      'selecttime': 'समय चुनें',
      'appointmentbooked': 'अपॉइंटमेंट सफलतापूर्वक बुक किया गया',
      
      // Medical Records
      'uploadreport': 'चिकित्सा रिपोर्ट अपलोड करें',
      'viewreports': 'रिपोर्ट देखें',
      'medicalhistory': 'चिकित्सा इतिहास',
      'prescription': 'नुस्खा',
      'diagnosis': 'निदान',
      'treatment': 'उपचार',
    }
  },
  ta: {
    translation: {
      // Common
      'welcome': 'SwasthyaAI க்கு வரவேற்கிறோம்',
      'login': 'உள்நுழைய',
      'signup': 'பதிவு செய்க',
      'logout': 'வெளியேறு',
      'loading': 'ஏற்றுகிறது...',
      'save': 'சேமி',
      'cancel': 'ரத்து செய்',
      'submit': 'சமர்ப்பிக்க',
      'search': 'தேடு',
      'language': 'மொழி',
      
      // Landing Page
      'chooserole': 'உங்கள் பாத்திரத்தை தேர்ந்தெடுக்கவும்',
      'doctor': 'மருத்துவர்',
      'patient': 'நோயாளி',
      'doctordesc': 'நோயாளிகளை நிர்வகித்து பராமரிப்பு வழங்கவும்',
      'patientdesc': 'மருத்துவ ஆலோசனை மற்றும் பராமரிப்பு பெறவும்',
      
      // Auth
      'email': 'மின்னஞ்சல்',
      'password': 'கடவுச்சொல்',
      'name': 'முழு பெயர்',
      'phone': 'தொலைபேசி எண்',
      'confirmpassword': 'கடவுச்சொல்லை உறுதிப்படுத்தவும்',
      'forgotpassword': 'கடவுச்சொல் மறந்துவிட்டதா?',
      'alreadyaccount': 'ஏற்கனவே கணக்கு உள்ளதா?',
      'noAccount': 'கணக்கு இல்லையா?',
      
      // Dashboard
      'dashboard': 'டாஷ்போர்டு',
      'appointments': 'சந்திப்புகள்',
      'patients': 'நோயாளிகள்',
      'reports': 'மருத்துவ அறிக்கைகள்',
      'profile': 'சுயவிவரம்',
      'settings': 'அமைப்புகள்',
      'notifications': 'அறிவிப்புகள்',
      
      // Symptoms
      'symptoms': 'அறிகுறிகள்',
      'describe': 'உங்கள் அறிகுறிகளை விவரிக்கவும்',
      'voiceinput': 'குரல் உள்ளீடு',
      'startvoice': 'குரல் உள்ளீட்டைத் தொடங்கவும்',
      'stopvoice': 'குரல் உள்ளீட்டை நிறுத்தவும்',
      'analyzing': 'அறிகுறிகளை பகுப்பாய்வு செய்கிறது...',
      
      // Appointments
      'bookappointment': 'சந்திப்பு முன்பதிவு',
      'selectdoctor': 'மருத்துவரைத் தேர்ந்தெடுக்கவும்',
      'selectdate': 'தேதியைத் தேர்ந்தெடுக்கவும்',
      'selecttime': 'நேரத்தைத் தேர்ந்தெடுக்கவும்',
      'appointmentbooked': 'சந்திப்பு வெற்றிகரமாக முன்பதிவு செய்யப்பட்டது',
      
      // Medical Records
      'uploadreport': 'மருத்துவ அறிக்கையை பதிவேற்றவும்',
      'viewreports': 'அறிக்கைகளைப் பார்க்கவும்',
      'medicalhistory': 'மருத்துவ வரலாறு',
      'prescription': 'மருந்து பரிந்துரை',
      'diagnosis': 'நோய் கண்டறிதல்',
      'treatment': 'சிகிச்சை',
    }
  },
  te: {
    translation: {
      // Common
      'welcome': 'SwasthyaAI కి స్వాగతం',
      'login': 'లాగిన్',
      'signup': 'సైన్ అప్',
      'logout': 'లాగ్ అవుట్',
      'loading': 'లోడ్ అవుతోంది...',
      'save': 'సేవ్',
      'cancel': 'రద్దు',
      'submit': 'సమర్పించు',
      'search': 'వెతుకు',
      'language': 'భాష',
      
      // Landing Page
      'chooserole': 'మీ పాత్రను ఎంచుకోండి',
      'doctor': 'వైద్యుడు',
      'patient': 'రోగి',
      'doctordesc': 'రోగులను నిర్వహించి సంరక్షణ అందించండి',
      'patientdesc': 'వైద్య సలహా మరియు సంరక్షణ పొందండి',
      
      // Auth
      'email': 'ఇమెయిల్',
      'password': 'పాస్‌వర్డ్',
      'name': 'పూర్తి పేరు',
      'phone': 'ఫోన్ నంబర్',
      'confirmpassword': 'పాస్‌వర్డ్‌ను నిర్ధారించండి',
      'forgotpassword': 'పాస్‌వర్డ్ మర్చిపోయారా?',
      'alreadyaccount': 'ఇప్పటికే ఖాతా ఉందా?',
      'noAccount': 'ఖాతా లేదా?',
      
      // Dashboard
      'dashboard': 'డాష్‌బోర్డ్',
      'appointments': 'అపాయింట్‌మెంట్‌లు',
      'patients': 'రోగులు',
      'reports': 'వైద్య నివేదికలు',
      'profile': 'ప్రొఫైల్',
      'settings': 'సెట్టింగ్‌లు',
      'notifications': 'నోటిఫికేషన్‌లు',
      
      // Symptoms
      'symptoms': 'లక్షణాలు',
      'describe': 'మీ లక్షణాలను వివరించండి',
      'voiceinput': 'వాయిస్ ఇన్‌పుట్',
      'startvoice': 'వాయిస్ ఇన్‌పుట్ ప్రారంభించండి',
      'stopvoice': 'వాయిస్ ఇన్‌పుట్ ఆపండి',
      'analyzing': 'లక్షణాలను విశ్లేషిస్తోంది...',
      
      // Appointments
      'bookappointment': 'అపాయింట్‌మెంట్ బుక్ చేయండి',
      'selectdoctor': 'వైద్యుడిని ఎంచుకోండి',
      'selectdate': 'తేదీని ఎంచుకోండి',
      'selecttime': 'సమయాన్ని ఎంచుకోండి',
      'appointmentbooked': 'అపాయింట్‌మెంట్ విజయవంతంగా బుక్ చేయబడింది',
      
      // Medical Records
      'uploadreport': 'వైద్య నివేదికను అప్‌లోడ్ చేయండి',
      'viewreports': 'నివేదికలను చూడండి',
      'medicalhistory': 'వైద్య చరిత్ర',
      'prescription': 'ప్రిస్క్రిప్షన్',
      'diagnosis': 'రోగ నిర్ధారణ',
      'treatment': 'చికిత్స',
    }
  },
  bn: {
    translation: {
      // Common
      'welcome': 'SwasthyaAI তে স্বাগতম',
      'login': 'লগইন',
      'signup': 'সাইন আপ',
      'logout': 'লগআউট',
      'loading': 'লোড হচ্ছে...',
      'save': 'সেভ',
      'cancel': 'বাতিল',
      'submit': 'জমা দিন',
      'search': 'খুঁজুন',
      'language': 'ভাষা',
      
      // Landing Page
      'chooserole': 'আপনার ভূমিকা বেছে নিন',
      'doctor': 'ডাক্তার',
      'patient': 'রোগী',
      'doctordesc': 'রোগীদের পরিচালনা এবং যত্ন প্রদান করুন',
      'patientdesc': 'চিকিৎসা পরামর্শ এবং যত্ন নিন',
      
      // Auth
      'email': 'ইমেইল',
      'password': 'পাসওয়ার্ড',
      'name': 'পূর্ণ নাম',
      'phone': 'ফোন নম্বর',
      'confirmpassword': 'পাসওয়ার্ড নিশ্চিত করুন',
      'forgotpassword': 'পাসওয়ার্ড ভুলে গেছেন?',
      'alreadyaccount': 'ইতিমধ্যে অ্যাকাউন্ট আছে?',
      'noAccount': 'কোন অ্যাকাউন্ট নেই?',
      
      // Dashboard
      'dashboard': 'ড্যাশবোর্ড',
      'appointments': 'অ্যাপয়েন্টমেন্ট',
      'patients': 'রোগীরা',
      'reports': 'চিকিৎসা রিপোর্ট',
      'profile': 'প্রোফাইল',
      'settings': 'সেটিংস',
      'notifications': 'বিজ্ঞপ্তি',
      
      // Symptoms
      'symptoms': 'লক্ষণ',
      'describe': 'আপনার লক্ষণগুলি বর্ণনা করুন',
      'voiceinput': 'ভয়েস ইনপুট',
      'startvoice': 'ভয়েস ইনপুট শুরু করুন',
      'stopvoice': 'ভয়েস ইনপুট বন্ধ করুন',
      'analyzing': 'লক্ষণ বিশ্লেষণ করা হচ্ছে...',
      
      // Appointments
      'bookappointment': 'অ্যাপয়েন্টমেন্ট বুক করুন',
      'selectdoctor': 'ডাক্তার নির্বাচন করুন',
      'selectdate': 'তারিখ নির্বাচন করুন',
      'selecttime': 'সময় নির্বাচন করুন',
      'appointmentbooked': 'অ্যাপয়েন্টমেন্ট সফলভাবে বুক হয়েছে',
      
      // Medical Records
      'uploadreport': 'চিকিৎসা রিপোর্ট আপলোড করুন',
      'viewreports': 'রিপোর্ট দেখুন',
      'medicalhistory': 'চিকিৎসা ইতিহাস',
      'prescription': 'প্রেসক্রিপশন',
      'diagnosis': 'রোগ নির্ণয়',
      'treatment': 'চিকিৎসা',
    }
  },
  gu: {
    translation: {
      // Common
      'welcome': 'SwasthyaAI માં આપનું સ્વાગત છે',
      'login': 'લોગિન',
      'signup': 'સાઇન અપ',
      'logout': 'લોગઆઉટ',
      'loading': 'લોડ થઈ રહ્યું છે...',
      'save': 'સેવ',
      'cancel': 'રદ કરો',
      'submit': 'સબમિટ',
      'search': 'શોધો',
      'language': 'ભાષા',
      
      // Landing Page
      'chooserole': 'તમારી ભૂમિકા પસંદ કરો',
      'doctor': 'ડૉક્ટર',
      'patient': 'દર્દી',
      'doctordesc': 'દર્દીઓનું સંચાલન અને સંભાળ પૂરી પાડો',
      'patientdesc': 'તબીબી સલાહ અને સંભાળ મેળવો',
      
      // Auth
      'email': 'ઈમેઈલ',
      'password': 'પાસવર્ડ',
      'name': 'પૂરું નામ',
      'phone': 'ફોન નંબર',
      'confirmpassword': 'પાસવર્ડની પુષ્ટિ કરો',
      'forgotpassword': 'પાસવર્ડ ભૂલી ગયા?',
      'alreadyaccount': 'પહેલેથી એકાઉન્ટ છે?',
      'noAccount': 'કોઈ એકાઉન્ટ નથી?',
      
      // Dashboard
      'dashboard': 'ડેશબોર્ડ',
      'appointments': 'એપોઇન્ટમેન્ટ',
      'patients': 'દર્દીઓ',
      'reports': 'તબીબી રિપોર્ટ',
      'profile': 'પ્રોફાઇલ',
      'settings': 'સેટિંગ્સ',
      'notifications': 'સૂચનાઓ',
      
      // Symptoms
      'symptoms': 'લક્ષણો',
      'describe': 'તમારા લક્ષણોનું વર્ણન કરો',
      'voiceinput': 'વૉઇસ ઇનપુટ',
      'startvoice': 'વૉઇસ ઇનપુટ શરૂ કરો',
      'stopvoice': 'વૉઇસ ઇનપુટ બંધ કરો',
      'analyzing': 'લક્ષણોનું વિશ્લેષણ કરી રહ્યું છે...',
      
      // Appointments
      'bookappointment': 'એપોઇન્ટમેન્ટ બુક કરો',
      'selectdoctor': 'ડૉક્ટર પસંદ કરો',
      'selectdate': 'તારીખ પસંદ કરો',
      'selecttime': 'સમય પસંદ કરો',
      'appointmentbooked': 'એપોઇન્ટમેન્ટ સફળતાપૂર્વક બુક થઈ',
      
      // Medical Records
      'uploadreport': 'તબીબી રિપોર્ટ અપલોડ કરો',
      'viewreports': 'રિપોર્ટ જુઓ',
      'medicalhistory': 'તબીબી ઇતિહાસ',
      'prescription': 'પ્રિસ્ક્રિપ્શન',
      'diagnosis': 'નિદાન',
      'treatment': 'સારવાર',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;