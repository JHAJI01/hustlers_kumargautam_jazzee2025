import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Video,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Edit,
  Plus,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  MapPin,
  FileText,
  MessageSquare,
} from 'lucide-react';
import GlassCard from '../common/GlassCard';
import GlowingButton from '../common/GlowingButton';
import { Doctor, Appointment } from '../../types';

interface DoctorScheduleProps {
  doctor: Doctor;
}

const DoctorSchedule: React.FC<DoctorScheduleProps> = ({ doctor }) => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [showAddSlot, setShowAddSlot] = useState(false);

  // Enhanced appointment data with patient details
  const appointmentSlots = [
    {
      id: 'A001',
      patientId: 'P001',
      patientName: 'Rajesh Kumar',
      patientPhone: '+91-9876543210',
      date: new Date(),
      time: '09:00 AM',
      duration: 30,
      status: 'confirmed',
      type: 'in-person',
      symptoms: 'Chest pain, shortness of breath',
      notes: 'Follow-up for cardiac evaluation',
      isEmergency: false,
    },
    {
      id: 'A002',
      patientId: 'P002',
      patientName: 'Priya Sharma',
      patientPhone: '+91-9876543211',
      date: new Date(),
      time: '09:30 AM',
      duration: 30,
      status: 'confirmed',
      type: 'video',
      symptoms: 'Severe headache, nausea',
      notes: 'New patient - possible migraine',
      isEmergency: false,
    },
    {
      id: 'A003',
      patientId: 'P003',
      patientName: 'Amit Singh',
      patientPhone: '+91-9876543212',
      date: new Date(),
      time: '10:00 AM',
      duration: 45,
      status: 'pending',
      type: 'in-person',
      symptoms: 'Joint pain, morning stiffness',
      notes: 'Rheumatology consultation',
      isEmergency: false,
    },
    {
      id: 'A004',
      patientId: 'P004',
      patientName: 'Sunita Patel',
      patientPhone: '+91-9876543213',
      date: new Date(),
      time: '11:00 AM',
      duration: 30,
      status: 'confirmed',
      type: 'video',
      symptoms: 'Diabetes follow-up',
      notes: 'HbA1c results review',
      isEmergency: false,
    },
    {
      id: 'A005',
      patientId: 'P005',
      patientName: 'Vikram Gupta',
      patientPhone: '+91-9876543214',
      date: new Date(),
      time: '02:00 PM',
      duration: 30,
      status: 'confirmed',
      type: 'in-person',
      symptoms: 'Hypertension check-up',
      notes: 'Monthly BP monitoring',
      isEmergency: false,
    },
    {
      id: 'A006',
      patientId: 'P006',
      patientName: 'Kavita Reddy',
      patientPhone: '+91-9876543215',
      date: new Date(),
      time: '02:30 PM',
      duration: 30,
      status: 'cancelled',
      type: 'video',
      symptoms: 'Skin allergy',
      notes: 'Dermatology consultation',
      isEmergency: false,
    },
    {
      id: 'A007',
      patientId: 'P007',
      patientName: 'Arjun Mehta',
      patientPhone: '+91-9876543216',
      date: new Date(),
      time: '03:30 PM',
      duration: 60,
      status: 'confirmed',
      type: 'in-person',
      symptoms: 'Chest pain - URGENT',
      notes: 'Emergency consultation',
      isEmergency: true,
    },
  ];

  // Available time slots for booking
  const availableSlots = [
    '10:30 AM', '11:30 AM', '12:00 PM', '03:00 PM', '04:00 PM', '04:30 PM', '05:00 PM'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-400/10 text-green-400 border-green-400/30';
      case 'pending':
        return 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30';
      case 'cancelled':
        return 'bg-red-400/10 text-red-400 border-red-400/30';
      case 'completed':
        return 'bg-blue-400/10 text-blue-400 border-blue-400/30';
      default:
        return 'bg-gray-400/10 text-gray-400 border-gray-400/30';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'video' ? Video : MapPin;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleSlotAction = (action: string, appointmentId: string) => {
    console.log(`${action} appointment:`, appointmentId);
    switch (action) {
      case 'start':
        alert('Starting consultation...');
        break;
      case 'reschedule':
        alert('Opening reschedule dialog...');
        break;
      case 'cancel':
        alert('Cancelling appointment...');
        break;
      case 'complete':
        alert('Marking as complete...');
        break;
      default:
        break;
    }
  };

  const handleAddSlot = () => {
    setShowAddSlot(true);
  };

  const todaySlots = appointmentSlots.filter(slot => 
    slot.date.toDateString() === selectedDate.toDateString()
  );

  const confirmedSlots = todaySlots.filter(slot => slot.status === 'confirmed').length;
  const pendingSlots = todaySlots.filter(slot => slot.status === 'pending').length;
  const totalRevenue = todaySlots.filter(slot => slot.status === 'confirmed').length * doctor.consultationFee;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Calendar className="w-8 h-8 text-neon-blue" />
            Schedule Management
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex bg-dark-card border border-dark-border rounded-lg">
              {['day', 'week', 'month'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as any)}
                  className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
                    viewMode === mode
                      ? 'bg-neon-blue text-dark-bg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
            <GlowingButton
              onClick={handleAddSlot}
              size="md"
              icon={Plus}
            >
              Add Slot
            </GlowingButton>
          </div>
        </div>
        
        {/* Date Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000))}
              className="p-2 bg-dark-card border border-dark-border text-white rounded-lg hover:border-neon-blue transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="text-xl font-semibold text-white">
              {formatDate(selectedDate)}
            </h2>
            <button
              onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000))}
              className="p-2 bg-dark-card border border-dark-border text-white rounded-lg hover:border-neon-blue transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          {/* Quick Stats */}
          <div className="flex items-center gap-6 text-sm">
            <div className="text-center">
              <p className="text-gray-400">Confirmed</p>
              <p className="text-green-400 font-bold text-lg">{confirmedSlots}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400">Pending</p>
              <p className="text-yellow-400 font-bold text-lg">{pendingSlots}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400">Revenue</p>
              <p className="text-neon-blue font-bold text-lg">₹{totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Schedule View */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-3"
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                Patient Appointments ({todaySlots.length})
              </h3>
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
              {todaySlots.map((slot) => {
                const TypeIcon = getTypeIcon(slot.type);
                return (
                  <motion.div
                    key={slot.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-5 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
                      slot.isEmergency 
                        ? 'bg-red-400/5 border-red-400/30 shadow-lg shadow-red-400/10' 
                        : 'bg-dark-card/50 border-dark-border/50 hover:border-neon-blue/30'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-neon-blue" />
                            <span className="font-bold text-white text-lg">{slot.time}</span>
                            <span className="text-gray-400 text-sm">({slot.duration} min)</span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(slot.status)}`}>
                            {slot.status}
                          </span>
                          <div className="flex items-center gap-1">
                            <TypeIcon className="w-4 h-4 text-gray-400" />
                            <span className="text-xs text-gray-400 capitalize">{slot.type}</span>
                          </div>
                          {slot.isEmergency && (
                            <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-medium border border-red-500/30">
                              URGENT
                            </span>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <h4 className="font-semibold text-white text-lg mb-1">{slot.patientName}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Phone className="w-3 h-3" />
                              <span>{slot.patientPhone}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 mb-1">
                              <strong>Symptoms:</strong> {slot.symptoms}
                            </p>
                            <p className="text-sm text-neon-blue">
                              <strong>Notes:</strong> {slot.notes}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-dark-border/30">
                      {slot.status === 'confirmed' && (
                        <>
                          <GlowingButton
                            onClick={() => handleSlotAction('start', slot.id)}
                            size="sm"
                            icon={slot.type === 'video' ? Video : MapPin}
                          >
                            {slot.type === 'video' ? 'Start Video Call' : 'Start Consultation'}
                          </GlowingButton>
                          <button
                            onClick={() => handleSlotAction('complete', slot.id)}
                            className="flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg text-sm font-medium hover:bg-green-500/20 transition-colors"
                          >
                            <CheckCircle2 size={14} />
                            Complete
                          </button>
                        </>
                      )}
                      
                      {slot.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleSlotAction('confirm', slot.id)}
                            className="flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg text-sm font-medium hover:bg-green-500/20 transition-colors"
                          >
                            <CheckCircle2 size={14} />
                            Confirm
                          </button>
                          <button
                            onClick={() => handleSlotAction('cancel', slot.id)}
                            className="flex items-center gap-2 px-3 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors"
                          >
                            <XCircle size={14} />
                            Decline
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => alert(`Calling ${slot.patientPhone}`)}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-500/20 transition-colors"
                      >
                        <Phone size={14} />
                        Call
                      </button>
                      
                      <button
                        onClick={() => handleSlotAction('reschedule', slot.id)}
                        className="flex items-center gap-2 px-3 py-2 bg-dark-card border border-dark-border text-white rounded-lg text-sm font-medium hover:border-neon-blue transition-colors"
                      >
                        <Edit size={14} />
                        Reschedule
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Available Slots */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-400" />
              Available Slots
            </h3>
            <div className="space-y-2">
              {availableSlots.map((time) => (
                <div
                  key={time}
                  className="p-3 bg-green-400/5 border border-green-400/20 rounded-lg text-center cursor-pointer hover:bg-green-400/10 transition-colors"
                >
                  <p className="text-green-400 font-medium">{time}</p>
                  <p className="text-xs text-gray-400">Available</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Quick Actions */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => alert('Opening emergency slot')}
                className="w-full p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg font-medium hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                Emergency Slot
              </button>
              <button
                onClick={() => alert('Blocking time slot')}
                className="w-full p-3 bg-dark-card border border-dark-border text-white rounded-lg font-medium hover:border-neon-blue transition-colors flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                Block Time
              </button>
              <button
                onClick={() => alert('Opening schedule settings')}
                className="w-full p-3 bg-dark-card border border-dark-border text-white rounded-lg font-medium hover:border-neon-blue transition-colors flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Schedule
              </button>
            </div>
          </GlassCard>

          {/* Today's Summary */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Today's Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Appointments</span>
                <span className="text-white font-semibold">{todaySlots.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Confirmed</span>
                <span className="text-green-400 font-semibold">{confirmedSlots}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Pending</span>
                <span className="text-yellow-400 font-semibold">{pendingSlots}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Revenue</span>
                <span className="text-neon-blue font-semibold">₹{totalRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-dark-border">
                <span className="text-gray-400">Next Patient</span>
                <span className="text-white font-semibold">
                  {todaySlots.find(s => s.status === 'confirmed')?.time || 'None'}
                </span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Add Slot Modal */}
      {showAddSlot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-card rounded-xl p-6 max-w-md w-full border border-dark-border">
            <h3 className="text-xl font-semibold text-white mb-4">Add New Time Slot</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Time</label>
                <input
                  type="time"
                  className="w-full p-3 bg-dark-surface border border-dark-border rounded-lg text-white focus:outline-none focus:border-neon-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Duration (minutes)</label>
                <select className="w-full p-3 bg-dark-surface border border-dark-border rounded-lg text-white focus:outline-none focus:border-neon-blue">
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
                <select className="w-full p-3 bg-dark-surface border border-dark-border rounded-lg text-white focus:outline-none focus:border-neon-blue">
                  <option value="available">Available for booking</option>
                  <option value="blocked">Blocked time</option>
                  <option value="emergency">Emergency slot</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <GlowingButton
                  onClick={() => {
                    alert('Time slot added');
                    setShowAddSlot(false);
                  }}
                  className="flex-1"
                >
                  Add Slot
                </GlowingButton>
                <button
                  onClick={() => setShowAddSlot(false)}
                  className="px-4 py-2 bg-dark-surface border border-dark-border text-white rounded-lg hover:border-neon-blue transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorSchedule;