import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  FileText, 
  MessageSquare, 
  Clock, 
  TrendingUp,
  Heart,
  Activity,
  Shield,
  IndianRupee,
  Phone,
  Video
} from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { Patient } from '../../types';

interface PatientDashboardProps {
  patient: Patient;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ patient }) => {
  const { t } = useTranslation();

  const quickStats = [
    {
      title: 'Upcoming Appointments',
      value: '2',
      icon: Calendar,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      title: 'Medical Reports',
      value: '8',
      icon: FileText,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      title: 'Health Score',
      value: '87%',
      icon: Heart,
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
    },
    {
      title: 'Active Prescriptions',
      value: '3',
      icon: Shield,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
    },
  ];

  const upcomingAppointments = [
    {
      id: '1',
      doctor: 'Dr. Priya Sharma',
      specialty: 'Cardiologist',
      date: '2024-01-15',
      time: '10:00 AM',
      type: 'Regular Checkup',
      fee: 800,
      mode: 'in-person',
      hospital: 'AIIMS Delhi',
    },
    {
      id: '2',
      doctor: 'Dr. Rajesh Kumar',
      specialty: 'Neurologist',
      date: '2024-01-18',
      time: '2:30 PM',
      type: 'Follow-up Consultation',
      fee: 1000,
      mode: 'video',
      hospital: 'KGMU Lucknow',
    },
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'report',
      title: 'Blood Test Results Uploaded',
      description: 'Complete Blood Count - Normal Range',
      date: '2024-01-10',
      icon: FileText,
    },
    {
      id: '2',
      type: 'appointment',
      title: 'Appointment with Dr. Sunita Patel Completed',
      description: 'Dermatology consultation - Skin allergy treatment',
      date: '2024-01-08',
      icon: Calendar,
    },
    {
      id: '3',
      type: 'prescription',
      title: 'New Prescription Added',
      description: 'Antihistamine for allergic reaction - 7 days',
      date: '2024-01-05',
      icon: Shield,
    },
    {
      id: '4',
      type: 'health',
      title: 'Health Score Updated',
      description: 'Your health score improved to 87%',
      date: '2024-01-03',
      icon: TrendingUp,
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Namaste, {patient.name}! 🙏
        </h1>
        <p className="text-gray-400">
          Here's your health overview for today. Stay healthy, stay happy!
        </p>
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
        {/* Upcoming Appointments */}
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
                Upcoming Appointments
              </h2>
              <button className="text-neon-blue hover:text-neon-cyan transition-colors text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-5 bg-dark-card/50 rounded-xl border border-dark-border/50 hover:border-neon-blue/30 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-white text-lg">{appointment.doctor}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          appointment.mode === 'video' 
                            ? 'bg-green-400/10 text-green-400' 
                            : 'bg-blue-400/10 text-blue-400'
                        }`}>
                          {appointment.mode === 'video' ? 'Video Call' : 'In-Person'}
                        </span>
                      </div>
                      <p className="text-neon-blue text-sm font-medium">{appointment.specialty}</p>
                      <p className="text-gray-400 text-sm">{appointment.hospital}</p>
                      <p className="text-sm text-white mt-2 font-medium">{appointment.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">{formatDate(appointment.date).split(',')[0]}</p>
                      <p className="text-gray-400 text-sm">{appointment.time}</p>
                      <div className="flex items-center gap-1 mt-2 justify-end">
                        <IndianRupee className="w-4 h-4 text-neon-blue" />
                        <span className="text-neon-blue font-semibold">{appointment.fee}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-3 border-t border-dark-border/30">
                    {appointment.mode === 'video' ? (
                      <button className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg text-sm font-medium hover:bg-green-500/20 transition-colors">
                        <Video size={16} />
                        Join Video Call
                      </button>
                    ) : (
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-500/20 transition-colors">
                        <Phone size={16} />
                        Call Hospital
                      </button>
                    )}
                    <button className="px-4 py-2 bg-dark-card border border-dark-border text-white rounded-lg text-sm font-medium hover:border-neon-blue transition-colors">
                      Reschedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Quick Actions & Recent Activity */}
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
              <button className="w-full p-4 bg-gradient-to-r from-neon-blue to-neon-cyan text-dark-bg rounded-lg font-medium hover:from-neon-cyan hover:to-neon-blue transition-all duration-300 shadow-lg">
                <MessageSquare className="w-5 h-5 mx-auto mb-1" />
                Describe Symptoms
              </button>
              <button className="w-full p-4 bg-dark-card border border-neon-blue text-neon-blue rounded-lg font-medium hover:bg-neon-blue hover:text-dark-bg transition-all duration-300">
                <Calendar className="w-5 h-5 mx-auto mb-1" />
                Book Appointment
              </button>
              <button className="w-full p-4 bg-dark-card border border-dark-border text-white rounded-lg font-medium hover:border-neon-blue transition-colors">
                <FileText className="w-5 h-5 mx-auto mb-1" />
                Upload Report
              </button>
            </div>
          </GlassCard>

          {/* Recent Activity */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-neon-blue" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="p-2 bg-neon-blue/10 rounded-lg flex-shrink-0">
                      <Icon className="w-4 h-4 text-neon-blue" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">{activity.title}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* Health Tips */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400" />
              Today's Health Tip
            </h2>
            <div className="p-4 bg-gradient-to-r from-red-400/10 to-pink-400/10 rounded-lg border border-red-400/20">
              <p className="text-sm text-white font-medium mb-2">Stay Hydrated! 💧</p>
              <p className="text-xs text-gray-300">
                Drink at least 8-10 glasses of water daily to maintain good health and boost your immune system.
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default PatientDashboard;