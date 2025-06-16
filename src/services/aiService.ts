import { SymptomAnalysis } from '../types';

// Mock AI service - In production, this would connect to actual AI APIs
export class AIService {
  private static symptomDatabase = {
    'fever': { severity: 'medium', specialist: 'General Physician' },
    'headache': { severity: 'low', specialist: 'Neurologist' },
    'chest pain': { severity: 'high', specialist: 'Cardiologist' },
    'difficulty breathing': { severity: 'critical', specialist: 'Pulmonologist' },
    'abdominal pain': { severity: 'medium', specialist: 'Gastroenterologist' },
    'joint pain': { severity: 'low', specialist: 'Orthopedist' },
    'skin rash': { severity: 'low', specialist: 'Dermatologist' },
    'vision problems': { severity: 'medium', specialist: 'Ophthalmologist' },
    'hearing loss': { severity: 'medium', specialist: 'ENT Specialist' },
    'mental health': { severity: 'medium', specialist: 'Psychiatrist' },
  };

  private static emergencyKeywords = [
    'chest pain', 'difficulty breathing', 'severe bleeding', 'unconscious',
    'heart attack', 'stroke', 'seizure', 'severe burns', 'overdose'
  ];

  static async analyzeSymptoms(symptomsText: string): Promise<SymptomAnalysis> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const symptoms = this.extractSymptoms(symptomsText.toLowerCase());
    const severity = this.determineSeverity(symptoms);
    const specialist = this.suggestSpecialist(symptoms);
    const immediateAction = this.getImmediateAction(severity);
    const possibleConditions = this.getPossibleConditions(symptoms);
    const confidence = this.calculateConfidence(symptoms);

    return {
      symptoms,
      severity,
      suggestedSpecialist: specialist,
      immediateAction,
      possibleConditions,
      confidence,
    };
  }

  private static extractSymptoms(text: string): string[] {
    const extractedSymptoms: string[] = [];
    
    Object.keys(this.symptomDatabase).forEach(symptom => {
      if (text.includes(symptom)) {
        extractedSymptoms.push(symptom);
      }
    });

    return extractedSymptoms;
  }

  private static determineSeverity(symptoms: string[]): 'low' | 'medium' | 'high' | 'critical' {
    const hasEmergency = symptoms.some(symptom => 
      this.emergencyKeywords.some(keyword => symptom.includes(keyword))
    );

    if (hasEmergency) return 'critical';

    const severityLevels = symptoms.map(symptom => {
      const match = Object.entries(this.symptomDatabase).find(([key]) => 
        symptom.includes(key)
      );
      return match ? match[1].severity : 'low';
    });

    if (severityLevels.includes('high')) return 'high';
    if (severityLevels.includes('medium')) return 'medium';
    return 'low';
  }

  private static suggestSpecialist(symptoms: string[]): string {
    const specialistCounts: { [key: string]: number } = {};

    symptoms.forEach(symptom => {
      const match = Object.entries(this.symptomDatabase).find(([key]) => 
        symptom.includes(key)
      );
      if (match) {
        const specialist = match[1].specialist;
        specialistCounts[specialist] = (specialistCounts[specialist] || 0) + 1;
      }
    });

    const mostRelevantSpecialist = Object.entries(specialistCounts).reduce(
      (a, b) => (a[1] > b[1] ? a : b),
      ['General Physician', 0]
    );

    return mostRelevantSpecialist[0];
  }

  private static getImmediateAction(severity: string): string {
    switch (severity) {
      case 'critical':
        return 'Seek immediate emergency care. Call emergency services.';
      case 'high':
        return 'Schedule an urgent appointment with a doctor within 24 hours.';
      case 'medium':
        return 'Schedule an appointment with a specialist within a week.';
      case 'low':
        return 'Monitor symptoms and schedule a routine checkup if they persist.';
      default:
        return 'Consult with a healthcare professional for proper evaluation.';
    }
  }

  private static getPossibleConditions(symptoms: string[]): string[] {
    const conditionsMap: { [key: string]: string[] } = {
      'fever': ['Viral infection', 'Bacterial infection', 'Flu'],
      'headache': ['Tension headache', 'Migraine', 'Sinus headache'],
      'chest pain': ['Angina', 'Heart attack', 'Acid reflux', 'Muscle strain'],
      'difficulty breathing': ['Asthma', 'Pneumonia', 'Heart condition'],
      'abdominal pain': ['Gastritis', 'Appendicitis', 'Food poisoning'],
    };

    const possibleConditions: string[] = [];
    symptoms.forEach(symptom => {
      const conditions = conditionsMap[symptom];
      if (conditions) {
        possibleConditions.push(...conditions);
      }
    });

    return [...new Set(possibleConditions)];
  }

  private static calculateConfidence(symptoms: string[]): number {
    if (symptoms.length === 0) return 0;
    if (symptoms.length === 1) return 0.6;
    if (symptoms.length === 2) return 0.8;
    return 0.9;
  }

  static async getChatbotResponse(message: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! I'm your AI health assistant. How can I help you today? Please describe your symptoms or health concerns.";
    }
    
    if (lowerMessage.includes('help')) {
      return "I can help you with:\n• Symptom analysis\n• Doctor recommendations\n• Appointment booking\n• Health information\n\nWhat would you like to know?";
    }
    
    if (lowerMessage.includes('emergency')) {
      return "If this is a medical emergency, please call emergency services immediately. For urgent but non-emergency symptoms, I can help you find the right doctor.";
    }
    
    return "I understand you're experiencing some symptoms. Can you provide more details about what you're feeling? This will help me provide better guidance.";
  }
}