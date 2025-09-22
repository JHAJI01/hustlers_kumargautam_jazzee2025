import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  Star, 
  MapPin, 
  Phone,
  Video,
  CheckCircle,
  IndianRupee
} from 'lucide-react';
import GlassCard from '../common/GlassCard';
import GlowingButton from '../common/GlowingButton';
import FloatingInput from '../common/FloatingInput';
import { Doctor } from '../../types';

interface AppointmentBookingProps {
  onBookingComplete?: (appointmentData: any) => void;
}

const AppointmentBooking: React.FC<AppointmentBookingProps> = ({ 
  onBookingComplete 
}) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState<'in-person' | 'video'>('in-person');
  const [symptoms, setSymptoms] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  // Indian doctors data with realistic names and specializations
  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      email: 'priya.sharma@aiims.edu',
      role: 'doctor',
      specialization: 'Cardiologist',
      licenseNumber: 'MH/2018/45678',
      experience: 12,
      qualifications: ['MBBS - AIIMS Delhi', 'MD Cardiology - PGIMER', 'Fellowship in Interventional Cardiology'],
      availability: [],
      rating: 4.8,
      consultationFee: 800,
      patients: [],
      phone: '+91-9876543210',
      isVerified: true,
      createdAt: new Date(),
    },
    {
      id: '2',
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh.kumar@kgmu.org',
      role: 'doctor',
      specialization: 'Neurologist',
      licenseNumber: 'UP/2016/78901',
      experience: 15,
      qualifications: ['MBBS - KGMU Lucknow', 'MD Neurology - NIMHANS', 'Fellowship in Epilepsy'],
      availability: [],
      rating: 4.9,
      consultationFee: 1000,
      patients: [],
      phone: '+91-9876543211',
      isVerified: true,
      createdAt: new Date(),
    },
    {
      id: '3',
      name: 'Dr. Sunita Patel',
      email: 'sunita.patel@bhu.ac.in',
      role: 'doctor',
      specialization: 'Dermatologist',
      licenseNumber: 'UP/2019/23456',
      experience: 8,
      qualifications: ['MBBS - BHU Varanasi', 'MD Dermatology - JIPMER', 'Fellowship in Cosmetic Dermatology'],
      availability: [],
      rating: 4.7,
      consultationFee: 600,
      patients: [],
      phone: '+91-9876543212',
      isVerified: true,
      createdAt: new Date(),
    },
    {
      id: '4',
      name: 'Dr. Amit Singh',
      email: 'amit.singh@sctimst.ac.in',
      role: 'doctor',
      specialization: 'Orthopedist',
      licenseNumber: 'KL/2017/34567',
      experience: 10,
      qualifications: ['MBBS - CMC Vellore', 'MS Orthopedics - SCTIMST', 'Fellowship in Joint Replacement'],
      availability: [],
      rating: 4.6,
      consultationFee: 700,
      patients: [],
      phone: '+91-9876543213',
      isVerified: true,
      createdAt: new Date(),
    },
    {
      id: '5',
      name: 'Dr. Kavitha Reddy',
      email: 'kavitha.reddy@nims.edu.in',
      role: 'doctor',
      specialization: 'Gynecologist',
      licenseNumber: 'AP/2020/56789',
      experience: 9,
      qualifications: ['MBBS - NIMS Hyderabad', 'MD Obstetrics & Gynecology - JIPMER', 'Fellowship in Reproductive Medicine'],
      availability: [],
      rating: 4.8,
      consultationFee: 750,
      patients: [],
      phone: '+91-9876543214',
      isVerified: true,
      createdAt: new Date(),
    },
    {
      id: '6',
      name: 'Dr. Arjun Mehta',
      email: 'arjun.mehta@tmc.gov.in',
      role: 'doctor',
      specialization: 'Pediatrician',
      licenseNumber: 'MH/2021/67890',
      experience: 6,
      qualifications: ['MBBS - Grant Medical College', 'MD Pediatrics - Tata Memorial', 'Fellowship in Pediatric Cardiology'],
      availability: [],
      rating: 4.9,
      consultationFee: 650,
      patients: [],
      phone: '+91-9876543215',
      isVerified: true,
      createdAt: new Date(),
    },
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM',
  ];

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setStep(2);
  };

  const handleDateTimeSelect = () => {
    if (selectedDate && selectedTime) {
      setStep(3);
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) return;

    setIsBooking(true);
    
    // Simulate API call with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const appointmentData = {
      id: `APT-${Date.now().toString().slice(-6)}`,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      specialization: selectedDoctor.specialization,
      date: selectedDate,
      time: selectedTime,
      type: appointmentType,
      symptoms,
      fee: selectedDoctor.consultationFee,
      status: 'confirmed',
      bookingTime: new Date(),
    };

    setIsBooking(false);
    setStep(4);
    
    if (onBookingComplete) {
      onBookingComplete(appointmentData);
    }
  };

  const getNextAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 21; i++) { // Show 3 weeks of dates
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Skip Sundays for most doctors
      if (date.getDay() !== 0) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    return dates;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString('en-IN', { weekday: 'short' }),
      date: date.getDate(),
      month: date.toLocaleDateString('en-IN', { month: 'short' })
    };
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Calendar className="w-8 h-8 text-neon-blue" />
          {t('bookappointment')}
        </h1>
        <p className="text-gray-400">
          Book an appointment with our experienced Indian doctors
        </p>
      </motion.div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`flex items-center ${stepNumber < 4 ? 'flex-1' : ''}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-300 ${
                  step >= stepNumber
                    ? 'bg-gradient-to-r from-neon-blue to-neon-cyan text-dark-bg shadow-lg'
                    : 'bg-dark-card border border-dark-border text-gray-400'
                }`}
              >
                {step > stepNumber ? <CheckCircle size={20} /> : stepNumber}
              </div>
              {stepNumber < 4 && (
                <div
                  className={`flex-1 h-1 mx-4 rounded transition-all duration-300 ${
                    step > stepNumber ? 'bg-gradient-to-r from-neon-blue to-neon-cyan' : 'bg-dark-border'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-3 text-sm">
          <span className={step >= 1 ? 'text-neon-blue font-medium' : 'text-gray-400'}>
            Select Doctor
          </span>
          <span className={step >= 2 ? 'text-neon-blue font-medium' : 'text-gray-400'}>
            Choose Date & Time
          </span>
          <span className={step >= 3 ? 'text-neon-blue font-medium' : 'text-gray-400'}>
            Appointment Details
          </span>
          <span className={step >= 4 ? 'text-neon-blue font-medium' : 'text-gray-400'}>
            Confirmation
          </span>
        </div>
      </div>

      {/* Step 1: Select Doctor */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {doctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => handleDoctorSelect(doctor)}
              className="cursor-pointer"
            >
              <GlassCard className="p-6 hover:border-neon-blue/50 transition-all duration-300 h-full">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-neon-blue to-neon-cyan rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <User size={28} className="text-dark-bg" />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-1">{doctor.name}</h3>
                  <p className="text-neon-blue text-sm font-medium">{doctor.specialization}</p>
                  <p className="text-xs text-gray-400 mt-1">{doctor.licenseNumber}</p>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-white font-medium">{doctor.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400">{doctor.experience} years exp.</span>
                  </div>
                  
                  <div className="text-xs text-gray-400 space-y-1">
                    {doctor.qualifications.slice(0, 2).map((qual, index) => (
                      <p key={index}>• {qual}</p>
                    ))}
                    {doctor.qualifications.length > 2 && (
                      <p className="text-neon-blue">+{doctor.qualifications.length - 2} more</p>
                    )}
                  </div>
                </div>
                
                <div className="text-center pt-4 border-t border-dark-border/50">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <IndianRupee className="w-4 h-4 text-neon-blue" />
                    <span className="text-neon-blue font-bold text-lg">{doctor.consultationFee}</span>
                  </div>
                  <p className="text-xs text-gray-400">Consultation Fee</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Step 2: Select Date & Time */}
      {step === 2 && selectedDoctor && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <GlassCard className="p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-neon-blue" />
              Select Date
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {getNextAvailableDates().slice(0, 15).map((date) => {
                const dateInfo = formatDateShort(date);
                return (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`p-4 rounded-xl text-center transition-all duration-300 ${
                      selectedDate === date
                        ? 'bg-gradient-to-r from-neon-blue to-neon-cyan text-dark-bg shadow-lg transform scale-105'
                        : 'bg-dark-card border border-dark-border text-white hover:border-neon-blue hover:scale-102'
                    }`}
                  >
                    <div className="text-xs font-medium opacity-80">{dateInfo.day}</div>
                    <div className="text-lg font-bold">{dateInfo.date}</div>
                    <div className="text-xs opacity-80">{dateInfo.month}</div>
                  </button>
                );
              })}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-neon-blue" />
              Select Time
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedTime === time
                      ? 'bg-gradient-to-r from-neon-blue to-neon-cyan text-dark-bg shadow-lg'
                      : 'bg-dark-card border border-dark-border text-white hover:border-neon-blue'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
            
            {selectedDate && selectedTime && (
              <div className="space-y-4">
                <div className="p-4 bg-neon-blue/10 rounded-lg border border-neon-blue/30">
                  <p className="text-neon-blue font-medium text-sm">Selected Appointment</p>
                  <p className="text-white font-semibold">{formatDate(selectedDate)}</p>
                  <p className="text-white">{selectedTime}</p>
                </div>
                <GlowingButton
                  onClick={handleDateTimeSelect}
                  className="w-full"
                  size="lg"
                >
                  Continue to Details
                </GlowingButton>
              </div>
            )}
          </GlassCard>
        </motion.div>
      )}

      {/* Step 3: Appointment Details */}
      {step === 3 && selectedDoctor && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-3xl mx-auto"
        >
          <GlassCard className="p-8">
            <h3 className="text-2xl font-semibold text-white mb-8">Appointment Details</h3>
            
            <div className="space-y-8">
              {/* Appointment Type */}
              <div>
                <label className="block text-sm font-medium text-white mb-4">
                  Consultation Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setAppointmentType('in-person')}
                    className={`p-6 rounded-xl border transition-all duration-300 ${
                      appointmentType === 'in-person'
                        ? 'bg-neon-blue/10 border-neon-blue text-neon-blue shadow-lg'
                        : 'bg-dark-card border-dark-border text-white hover:border-neon-blue/50'
                    }`}
                  >
                    <MapPin className="w-8 h-8 mx-auto mb-3" />
                    <p className="font-semibold text-lg">In-Person</p>
                    <p className="text-sm opacity-70 mt-1">Visit clinic</p>
                  </button>
                  <button
                    onClick={() => setAppointmentType('video')}
                    className={`p-6 rounded-xl border transition-all duration-300 ${
                      appointmentType === 'video'
                        ? 'bg-neon-blue/10 border-neon-blue text-neon-blue shadow-lg'
                        : 'bg-dark-card border-dark-border text-white hover:border-neon-blue/50'
                    }`}
                  >
                    <Video className="w-8 h-8 mx-auto mb-3" />
                    <p className="font-semibold text-lg">Video Call</p>
                    <p className="text-sm opacity-70 mt-1">Online consultation</p>
                  </button>
                </div>
              </div>

              {/* Symptoms */}
              <div>
                <label className="block text-sm font-medium text-white mb-4">
                  Describe your symptoms or reason for consultation
                </label>
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Please describe your symptoms, medical concerns, or reason for this appointment in detail..."
                  className="w-full h-32 px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue transition-colors resize-none"
                />
              </div>

              {/* Appointment Summary */}
              <div className="bg-dark-card/50 rounded-xl p-6 border border-dark-border/50">
                <h4 className="font-semibold text-white mb-4 text-lg">Appointment Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Doctor:</span>
                      <span className="text-white font-medium">{selectedDoctor.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Specialization:</span>
                      <span className="text-white">{selectedDoctor.specialization}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Experience:</span>
                      <span className="text-white">{selectedDoctor.experience} years</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Date:</span>
                      <span className="text-white font-medium">{formatDate(selectedDate).split(',')[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Time:</span>
                      <span className="text-white">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Type:</span>
                      <span className="text-white capitalize">{appointmentType.replace('-', ' ')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center border-t border-dark-border pt-4 mt-4">
                  <span className="text-gray-400 font-medium text-lg">Consultation Fee:</span>
                  <div className="flex items-center gap-1">
                    <IndianRupee className="w-5 h-5 text-neon-blue" />
                    <span className="text-neon-blue font-bold text-xl">{selectedDoctor.consultationFee}</span>
                  </div>
                </div>
              </div>

              <GlowingButton
                onClick={handleBookAppointment}
                disabled={isBooking}
                className="w-full"
                size="lg"
              >
                {isBooking ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-dark-bg border-t-transparent rounded-full animate-spin"></div>
                    Booking Appointment...
                  </div>
                ) : (
                  'Confirm & Book Appointment'
                )}
              </GlowingButton>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && selectedDoctor && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto text-center"
        >
          <GlassCard className="p-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle size={40} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">
              Appointment Confirmed!
            </h3>
            <p className="text-gray-400 mb-6">
              Your appointment has been successfully booked with {selectedDoctor.name}. 
              You will receive a confirmation SMS and email shortly.
            </p>
            
            <div className="bg-dark-card/50 rounded-lg p-6 mb-6 text-left">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400 mb-1">Appointment ID</p>
                  <p className="text-neon-blue font-mono font-bold">APT-{Date.now().toString().slice(-6)}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Date & Time</p>
                  <p className="text-white font-medium">{formatDate(selectedDate).split(',')[0]}</p>
                  <p className="text-white">{selectedTime}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <GlowingButton
                onClick={() => {
                  setStep(1);
                  setSelectedDoctor(null);
                  setSelectedDate('');
                  setSelectedTime('');
                  setSymptoms('');
                }}
                className="w-full"
                size="md"
              >
                Book Another Appointment
              </GlowingButton>
              <button
                onClick={() => window.print()}
                className="w-full p-3 bg-dark-card border border-neon-blue text-neon-blue rounded-lg font-medium hover:bg-neon-blue hover:text-dark-bg transition-all duration-300"
              >
                Print Appointment Details
              </button>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
};

export default AppointmentBooking;