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
} from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { Doctor, Appointment, MedicalRecord, UploadedFile } from '../../types';

interface DoctorDashboardProps {
  doctor: Doctor;
}

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ doctor }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('appointments');
  const [availabilityStatus, setAvailabilityStatus] = useState<'online' | 'offline' | 'in-surgery'>('online');

  // Sample data - In real app, this would come from API
  const todayAppointments: Appointment[] = [
    {
      id: '1',
      patientId: 'P001',
      doctorId: doctor.id,
      date: new Date(),
      time: '10:00 AM',
      status: 'scheduled',
      symptoms: 'Fever and cough',
      notes: 'Follow-up consultation',
    },
    {
      id: '2',
      patientId: 'P002',
      doctorId: doctor.id,
      date: new Date(),
      time: '11:30 AM',
      status: 'in-progress',
      symptoms: 'Headache and fatigue',
      notes: 'New patient',
    },
  ];

  const recentCaseFiles: MedicalRecord[] = [
    {
      id: '1',
      patientId: 'P001',
      doctorId: doctor.id,
      date: new Date(),
      diagnosis: 'Common cold',
      treatment: 'Rest and medication',
      prescription: 'Paracetamol 500mg',
      files: [
        {
          id: '1',
          name: 'Blood Test Report.pdf',
          url: '#',
          type: 'application/pdf',
          size: 1024,
          uploadDate: new Date(),
        },
      ],
      followUpRequired: true,
    },
  ];

  const quickStats = [
    {
      title: 'Today\'s Appointments',
      value: todayAppointments.length.toString(),
      icon: Calendar,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      title: 'Active Patients',
      value: Array.isArray(doctor.patients) ? doctor.patients.length.toString() : '0',
      icon: Users,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      title: 'Rating',
      value: doctor.rating.toFixed(1),
      icon: Star,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
    },
    {
      title: 'Today\'s Earnings',
      value: '₹12,500',
      icon: IndianRupee,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
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
        return 'bg-blue-400/10 text-blue-400';
      case 'in-progress':
        return 'bg-yellow-400/10 text-yellow-400';
      case 'completed':
        return 'bg-green-400/10 text-green-400';
      case 'cancelled':
        return 'bg-red-400/10 text-red-400';
      default:
        return 'bg-gray-400/10 text-gray-400';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Profile Section */}
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
              <div className="absolute bottom-0 right-0">
                <select
                  value={availabilityStatus}
                  onChange={(e) => setAvailabilityStatus(e.target.value as any)}
                  className="bg-dark-card border border-dark-border text-white rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-neon-blue"
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="in-surgery">In Surgery</option>
                </select>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-2xl font-bold text-white">Dr. {doctor.name}</h1>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-400/10 text-green-400">
                  {doctor.specialization}
                </span>
              </div>
              <div className="flex items-center gap-4 text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>AIIMS Delhi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{doctor.experience} years experience</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-neon-blue text-dark-bg rounded-lg font-medium hover:bg-neon-cyan transition-colors">
                  Edit Profile
                </button>
                <button className="px-4 py-2 bg-dark-card border border-dark-border text-white rounded-lg font-medium hover:border-neon-blue transition-colors">
                  View Schedule
                </button>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Quick Stats */}
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
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Appointments */}
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
                Today's Appointments
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
              {todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-5 bg-dark-card/50 rounded-xl border border-dark-border/50 hover:border-neon-blue/30 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-white text-lg">Patient #{appointment.patientId}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{appointment.symptoms}</p>
                      <p className="text-neon-blue text-sm">{appointment.notes}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">{appointment.time}</p>
                      <p className="text-gray-400 text-sm">Duration: 30 mins</p>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-3 border-t border-dark-border/30">
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg text-sm font-medium hover:bg-green-500/20 transition-colors">
                      <Video size={16} />
                      Start Video Call
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-500/20 transition-colors">
                      <FileText size={16} />
                      View Case
                    </button>
                    <button className="px-4 py-2 bg-dark-card border border-dark-border text-white rounded-lg text-sm font-medium hover:border-neon-blue transition-colors">
                      Mark Done
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Right Sidebar */}
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
              <button className="w-full p-4 bg-gradient-to-r from-neon-blue to-neon-cyan text-dark-bg rounded-lg font-medium hover:from-neon-cyan hover:to-neon-blue transition-all duration-300 shadow-lg flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                New Prescription
              </button>
              <button className="w-full p-4 bg-dark-card border border-neon-blue text-neon-blue rounded-lg font-medium hover:bg-neon-blue hover:text-dark-bg transition-all duration-300 flex items-center justify-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Report
              </button>
              <button className="w-full p-4 bg-dark-card border border-dark-border text-white rounded-lg font-medium hover:border-neon-blue transition-colors flex items-center justify-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Chat with AI Assistant
              </button>
            </div>
          </GlassCard>

          {/* Recent Case Files */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-neon-blue" />
              Recent Case Files
            </h2>
            <div className="space-y-4">
              {recentCaseFiles.map((caseFile) => (
                <div key={caseFile.id} className="p-4 bg-dark-card/50 rounded-xl border border-dark-border/50">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-neon-blue/10 rounded-lg flex-shrink-0">
                      <FileText className="w-4 h-4 text-neon-blue" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white mb-1">Patient #{caseFile.patientId}</p>
                      <p className="text-xs text-gray-400 mb-2">{caseFile.diagnosis}</p>
                      <div className="flex gap-2">
                        <button className="text-xs text-neon-blue hover:text-neon-cyan transition-colors">
                          View Details
                        </button>
                        <button className="text-xs text-neon-blue hover:text-neon-cyan transition-colors">
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* AI Assistant */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-400" />
              AI Assistant
            </h2>
            <div className="space-y-3">
              <div className="p-4 bg-purple-400/10 rounded-lg border border-purple-400/20">
                <p className="text-sm text-white font-medium mb-2">Suggested Diagnosis</p>
                <p className="text-xs text-gray-300">
                  Based on symptoms: Fever, cough, fatigue
                </p>
                <p className="text-xs text-purple-400 mt-2">
                  Possible conditions: Common cold, Influenza
                </p>
              </div>
              <button className="w-full p-3 bg-dark-card border border-dark-border text-white rounded-lg text-sm font-medium hover:border-neon-blue transition-colors flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Ask AI Assistant
              </button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorDashboard;