import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Calendar,
  FileText,
  Users,
  Star,
  IndianRupee,
  Activity,
  Heart,
  Video,
  Phone,
  MessageSquare,
  Upload,
  Settings,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Stethoscope,
  User,
  Building2,
  CircleDot,
  Circle,
  CircleOff,
  Search,
  Filter,
  Download,
  Plus,
  Send,
  Camera,
  Mic,
  Share2,
  Bot,
  Bell,
  ChevronDown,
  Edit,
  Eye,
  UserPlus,
  ClipboardList,
  TrendingUp,
  Award,
  MapPin,
  Mail,
  Briefcase,
} from 'lucide-react';
import GlassCard from '../common/GlassCard';
import GlowingButton from '../common/GlowingButton';
import { Doctor, Appointment, MedicalRecord, UploadedFile } from '../../types';

interface DoctorDashboardProps {
  doctor: Doctor;
}

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ doctor }) => {
  const { t } = useTranslation();
  const [availabilityStatus, setAvailabilityStatus] = useState<'online' | 'offline' | 'in-surgery'>('online');
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showPatientModal, setShowPatientModal] = useState(false);

  // Enhanced sample data for doctor dashboard
  const todayAppointments: Appointment[] = [
    {
      id: '1',
      patientId: 'P001',
      doctorId: doctor.id,
      date: new Date(),
      time: '10:00 AM',
      status: 'scheduled',
      symptoms: 'Chest pain, shortness of breath',
      notes: 'Follow-up for cardiac evaluation',
    },
    {
      id: '2',
      patientId: 'P002',
      doctorId: doctor.id,
      date: new Date(),
      time: '11:30 AM',
      status: 'in-progress',
      symptoms: 'Severe headache, nausea',
      notes: 'New patient - possible migraine',
    },
    {
      id: '3',
      patientId: 'P003',
      doctorId: doctor.id,
      date: new Date(),
      time: '2:00 PM',
      status: 'scheduled',
      symptoms: 'Joint pain, morning stiffness',
      notes: 'Rheumatology consultation',
    },
    {
      id: '4',
      patientId: 'P004',
      doctorId: doctor.id,
      date: new Date(),
      time: '3:30 PM',
      status: 'scheduled',
      symptoms: 'Diabetes follow-up',
      notes: 'HbA1c results review',
    },
  ];

  const patientDatabase = [
    {
      id: 'P001',
      name: 'Rajesh Kumar',
      age: 45,
      gender: 'Male',
      phone: '+91-9876543210',
      lastVisit: '2024-01-08',
      condition: 'Hypertension',
      status: 'stable',
    },
    {
      id: 'P002',
      name: 'Priya Sharma',
      age: 32,
      gender: 'Female',
      phone: '+91-9876543211',
      lastVisit: '2024-01-10',
      condition: 'Migraine',
      status: 'under-treatment',
    },
    {
      id: 'P003',
      name: 'Amit Singh',
      age: 58,
      gender: 'Male',
      phone: '+91-9876543212',
      lastVisit: '2024-01-05',
      condition: 'Arthritis',
      status: 'chronic',
    },
    {
      id: 'P004',
      name: 'Sunita Patel',
      age: 41,
      gender: 'Female',
      phone: '+91-9876543213',
      lastVisit: '2024-01-12',
      condition: 'Type 2 Diabetes',
      status: 'controlled',
    },
  ];

  const recentCaseFiles: MedicalRecord[] = [
    {
      id: '1',
      patientId: 'P001',
      doctorId: doctor.id,
      date: new Date('2024-01-08'),
      diagnosis: 'Essential Hypertension',
      treatment: 'Lifestyle modification + ACE inhibitor',
      prescription: 'Lisinopril 10mg OD, Amlodipine 5mg OD',
      files: [
        {
          id: '1',
          name: 'ECG_Report_Jan2024.pdf',
          url: '#',
          type: 'application/pdf',
          size: 1024,
          uploadDate: new Date(),
        },
      ],
      followUpRequired: true,
    },
    {
      id: '2',
      patientId: 'P002',
      doctorId: doctor.id,
      date: new Date('2024-01-10'),
      diagnosis: 'Migraine with Aura',
      treatment: 'Prophylactic therapy + lifestyle counseling',
      prescription: 'Sumatriptan 50mg PRN, Propranolol 40mg BD',
      files: [],
      followUpRequired: true,
    },
  ];

  const quickStats = [
    {
      title: 'Today\'s Patients',
      value: todayAppointments.length.toString(),
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      trend: '+2 from yesterday',
    },
    {
      title: 'Total Patients',
      value: Array.isArray(doctor.patients) ? doctor.patients.length.toString() : '156',
      icon: UserPlus,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      trend: '+8 this month',
    },
    {
      title: 'Success Rate',
      value: '94%',
      icon: Award,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      trend: '+2% this quarter',
    },
    {
      title: 'Monthly Revenue',
      value: '₹2,45,000',
      icon: TrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      trend: '+15% from last month',
    },
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-400/10 text-blue-400 border-blue-400/30';
      case 'in-progress':
        return 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30';
      case 'completed':
        return 'bg-green-400/10 text-green-400 border-green-400/30';
      case 'cancelled':
        return 'bg-red-400/10 text-red-400 border-red-400/30';
      default:
        return 'bg-gray-400/10 text-gray-400 border-gray-400/30';
    }
  };

  const getPatientStatusColor = (status: string) => {
    switch (status) {
      case 'stable':
        return 'bg-green-400/10 text-green-400';
      case 'under-treatment':
        return 'bg-yellow-400/10 text-yellow-400';
      case 'chronic':
        return 'bg-orange-400/10 text-orange-400';
      case 'critical':
        return 'bg-red-400/10 text-red-400';
      default:
        return 'bg-gray-400/10 text-gray-400';
    }
  };

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'offline':
        return 'bg-gray-500';
      case 'in-surgery':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleStartConsultation = (appointmentId: string) => {
    console.log('Starting consultation for appointment:', appointmentId);
    // In a real app, this would start a video call or open consultation interface
    alert('Starting video consultation...');
  };

  const handleViewPatient = (patientId: string) => {
    setSelectedPatient(patientId);
    setShowPatientModal(true);
  };

  const handlePrescription = (patientId: string) => {
    setSelectedPatient(patientId);
    setShowPrescriptionModal(true);
  };

  const handleMarkComplete = (appointmentId: string) => {
    console.log('Marking appointment complete:', appointmentId);
    alert('Appointment marked as complete');
  };

  const handleEditProfile = () => {
    console.log('Opening profile editor');
    alert('Profile editor will open here');
  };

  const handleViewSchedule = () => {
    console.log('Opening schedule view');
    alert('Schedule view will open here');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Enhanced Doctor Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <GlassCard className="p-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-blue to-neon-cyan flex items-center justify-center">
                <User className="w-12 h-12 text-dark-bg" />
              </div>
              <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${getAvailabilityColor(availabilityStatus)} rounded-full border-2 border-dark-card`}></div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-2xl font-bold text-white">{doctor.name}</h1>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-neon-blue/10 text-neon-blue border border-neon-blue/30">
                  {doctor.specialization}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-yellow-400 font-medium">{doctor.rating}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-400 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{doctor.experience} years exp.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>AIIMS Delhi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{doctor.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{doctor.phone}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Status:</span>
                  <select
                    value={availabilityStatus}
                    onChange={(e) => setAvailabilityStatus(e.target.value as any)}
                    className="bg-dark-card border border-dark-border text-white rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-neon-blue"
                  >
                    <option value="online">🟢 Available</option>
                    <option value="in-surgery">🔴 In Surgery</option>
                    <option value="offline">⚫ Offline</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-neon-blue" />
                  <span className="text-neon-blue font-semibold">₹{doctor.consultationFee}/consultation</span>
                </div>
              </div>
              <div className="flex gap-3">
                <GlowingButton
                  onClick={handleEditProfile}
                  size="md"
                  icon={Edit}
                >
                  Edit Profile
                </GlowingButton>
                <button 
                  onClick={handleViewSchedule}
                  className="px-4 py-2 bg-dark-card border border-dark-border text-white rounded-lg font-medium hover:border-neon-blue transition-colors flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  View Schedule
                </button>
                <button className="px-4 py-2 bg-dark-card border border-dark-border text-white rounded-lg font-medium hover:border-neon-blue transition-colors flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Enhanced Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-6 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <p className="text-xs text-green-400 mt-1">{stat.trend}</p>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Appointments - Enhanced */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-neon-blue" />
                Today's Appointments ({todayAppointments.length})
              </h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search patients..."
                    className="bg-dark-card/50 border border-dark-border text-white rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-neon-blue"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                </div>
                <button className="p-2 bg-dark-card/50 border border-dark-border text-white rounded-lg hover:border-neon-blue transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {todayAppointments.map((appointment) => {
                const patient = patientDatabase.find(p => p.id === appointment.patientId);
                return (
                  <div
                    key={appointment.id}
                    className="p-5 bg-dark-card/50 rounded-xl border border-dark-border/50 hover:border-neon-blue/30 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-white text-lg">
                            {patient ? patient.name : `Patient #${appointment.patientId}`}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                          {patient && (
                            <span className="text-xs text-gray-400">
                              {patient.age}y, {patient.gender}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm mb-2">
                          <strong>Symptoms:</strong> {appointment.symptoms}
                        </p>
                        <p className="text-neon-blue text-sm">
                          <strong>Notes:</strong> {appointment.notes}
                        </p>
                        {patient && (
                          <p className="text-xs text-gray-500 mt-1">
                            Last visit: {patient.lastVisit} | Condition: {patient.condition}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">{appointment.time}</p>
                        <p className="text-gray-400 text-sm">30 mins</p>
                        <div className="flex items-center gap-1 mt-2 justify-end">
                          <IndianRupee className="w-4 h-4 text-neon-blue" />
                          <span className="text-neon-blue font-semibold">{doctor.consultationFee}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-3 border-t border-dark-border/30">
                      {appointment.status === 'scheduled' && (
                        <GlowingButton
                          onClick={() => handleStartConsultation(appointment.id)}
                          size="sm"
                          icon={Video}
                        >
                          Start Consultation
                        </GlowingButton>
                      )}
                      {appointment.status === 'in-progress' && (
                        <button 
                          onClick={() => handleMarkComplete(appointment.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg text-sm font-medium hover:bg-green-500/20 transition-colors"
                        >
                          <CheckCircle2 size={16} />
                          Mark Complete
                        </button>
                      )}
                      <button 
                        onClick={() => handleViewPatient(appointment.patientId)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-500/20 transition-colors"
                      >
                        <Eye size={16} />
                        View Patient
                      </button>
                      <button 
                        onClick={() => handlePrescription(appointment.patientId)}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-lg text-sm font-medium hover:bg-purple-500/20 transition-colors"
                      >
                        <ClipboardList size={16} />
                        Prescribe
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>

        {/* Right Sidebar - Enhanced */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Quick Actions */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <GlowingButton
                onClick={() => setShowPrescriptionModal(true)}
                className="w-full"
                size="md"
                icon={Plus}
              >
                New Prescription
              </GlowingButton>
              <button 
                onClick={() => alert('Opening report upload')}
                className="w-full p-4 bg-dark-card border border-neon-blue text-neon-blue rounded-lg font-medium hover:bg-neon-blue hover:text-dark-bg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Upload className="w-5 h-5" />
                Upload Report
              </button>
              <button 
                onClick={() => alert('Opening AI assistant')}
                className="w-full p-4 bg-dark-card border border-dark-border text-white rounded-lg font-medium hover:border-neon-blue transition-colors flex items-center justify-center gap-2"
              >
                <Bot className="w-5 h-5" />
                AI Assistant
              </button>
              <button 
                onClick={() => alert('Opening patient search')}
                className="w-full p-4 bg-dark-card border border-dark-border text-white rounded-lg font-medium hover:border-neon-blue transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Find Patient
              </button>
            </div>
          </GlassCard>

          {/* Patient Summary */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-neon-blue" />
              Recent Patients
            </h2>
            <div className="space-y-4">
              {patientDatabase.slice(0, 4).map((patient) => (
                <div key={patient.id} className="p-4 bg-dark-card/50 rounded-xl border border-dark-border/50 hover:border-neon-blue/30 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-neon-blue/10 rounded-lg flex-shrink-0">
                      <User className="w-4 h-4 text-neon-blue" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-white">{patient.name}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPatientStatusColor(patient.status)}`}>
                          {patient.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mb-1">{patient.age}y, {patient.gender}</p>
                      <p className="text-xs text-gray-400">{patient.condition}</p>
                      <div className="flex gap-2 mt-2">
                        <button 
                          onClick={() => handleViewPatient(patient.id)}
                          className="text-xs text-neon-blue hover:text-neon-cyan transition-colors"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => alert(`Calling ${patient.phone}`)}
                          className="text-xs text-neon-blue hover:text-neon-cyan transition-colors"
                        >
                          Call
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* AI Insights */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-400" />
              AI Insights
            </h2>
            <div className="space-y-3">
              <div className="p-4 bg-purple-400/10 rounded-lg border border-purple-400/20">
                <p className="text-sm text-white font-medium mb-2">Pattern Alert</p>
                <p className="text-xs text-gray-300 mb-2">
                  3 patients with similar symptoms this week
                </p>
                <p className="text-xs text-purple-400">
                  Possible seasonal flu outbreak
                </p>
              </div>
              <div className="p-4 bg-blue-400/10 rounded-lg border border-blue-400/20">
                <p className="text-sm text-white font-medium mb-2">Recommendation</p>
                <p className="text-xs text-gray-300 mb-2">
                  Consider prescribing vitamin D supplements
                </p>
                <p className="text-xs text-blue-400">
                  Based on recent lab results
                </p>
              </div>
              <button 
                onClick={() => alert('Opening AI assistant')}
                className="w-full p-3 bg-dark-card border border-dark-border text-white rounded-lg text-sm font-medium hover:border-neon-blue transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Ask AI Assistant
              </button>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Modals */}
      {showPrescriptionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-card rounded-xl p-6 max-w-md w-full border border-dark-border">
            <h3 className="text-xl font-semibold text-white mb-4">New Prescription</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Patient name"
                className="w-full p-3 bg-dark-surface border border-dark-border rounded-lg text-white"
              />
              <textarea
                placeholder="Prescription details..."
                className="w-full p-3 bg-dark-surface border border-dark-border rounded-lg text-white h-32 resize-none"
              />
              <div className="flex gap-3">
                <GlowingButton
                  onClick={() => {
                    alert('Prescription saved');
                    setShowPrescriptionModal(false);
                  }}
                  className="flex-1"
                >
                  Save Prescription
                </GlowingButton>
                <button
                  onClick={() => setShowPrescriptionModal(false)}
                  className="px-4 py-2 bg-dark-surface border border-dark-border text-white rounded-lg hover:border-neon-blue transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPatientModal && selectedPatient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-card rounded-xl p-6 max-w-2xl w-full border border-dark-border max-h-[80vh] overflow-y-auto">
            {(() => {
              const patient = patientDatabase.find(p => p.id === selectedPatient);
              return patient ? (
                <>
                  <h3 className="text-xl font-semibold text-white mb-4">Patient Details</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">Name</p>
                        <p className="text-white font-medium">{patient.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Age</p>
                        <p className="text-white font-medium">{patient.age} years</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Gender</p>
                        <p className="text-white font-medium">{patient.gender}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Phone</p>
                        <p className="text-white font-medium">{patient.phone}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Condition</p>
                        <p className="text-white font-medium">{patient.condition}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Status</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPatientStatusColor(patient.status)}`}>
                          {patient.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => alert(`Calling ${patient.phone}`)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg font-medium hover:bg-green-500/20 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        Call Patient
                      </button>
                      <button
                        onClick={() => {
                          setShowPatientModal(false);
                          setShowPrescriptionModal(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-lg font-medium hover:bg-purple-500/20 transition-colors"
                      >
                        <ClipboardList className="w-4 h-4" />
                        Prescribe
                      </button>
                      <button
                        onClick={() => setShowPatientModal(false)}
                        className="px-4 py-2 bg-dark-surface border border-dark-border text-white rounded-lg hover:border-neon-blue transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-white">Patient not found</p>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;