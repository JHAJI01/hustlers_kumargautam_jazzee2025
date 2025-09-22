export interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'doctor' | 'admin';
  phone?: string;
  avatar?: string;
  isVerified: boolean;
  createdAt: Date;
}

export interface Patient extends User {
  role: 'patient';
  medicalHistory: MedicalRecord[];
  appointments: Appointment[];
  emergencyContact?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  bloodGroup?: string;
  allergies?: string[];
}

export interface Doctor extends User {
  role: 'doctor';
  specialization: string;
  licenseNumber: string;
  experience: number;
  qualifications: string[];
  availability: TimeSlot[];
  rating: number;
  consultationFee: number;
  patients: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  symptoms: string;
  notes?: string;
  prescription?: string;
  followUp?: Date;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  diagnosis: string;
  treatment: string;
  prescription: string;
  files: UploadedFile[];
  followUpRequired: boolean;
}

export interface UploadedFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadDate: Date;
}

export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  message: string;
  timestamp: Date;
  type: 'text' | 'voice';
}

export interface SymptomAnalysis {
  symptoms: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  suggestedSpecialist: string;
  immediateAction: string;
  possibleConditions: string[];
  confidence: number;
}