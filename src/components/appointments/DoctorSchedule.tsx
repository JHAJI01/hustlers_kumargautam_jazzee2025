import React from 'react';
import { Appointment, Doctor, User } from '../../types';
import GlassCard from '../common/GlassCard';
import { Calendar, User as UserIcon, Clock, CheckCircle2, XCircle } from 'lucide-react';

// Mock data for demonstration
const mockPatients: User[] = [
  { id: 'P001', name: 'Rahul Sharma', email: 'rahul@example.com', role: 'patient', isVerified: true, createdAt: new Date() },
  { id: 'P002', name: 'Anita Singh', email: 'anita@example.com', role: 'patient', isVerified: true, createdAt: new Date() },
];

const mockAppointments: Appointment[] = [
  {
    id: 'A1',
    patientId: 'P001',
    doctorId: 'D001',
    date: new Date(),
    time: '10:00 AM',
    status: 'scheduled',
    symptoms: 'Fever, cough',
    notes: 'Follow-up',
  },
  {
    id: 'A2',
    patientId: 'P002',
    doctorId: 'D001',
    date: new Date(),
    time: '11:30 AM',
    status: 'in-progress',
    symptoms: 'Headache',
    notes: '',
  },
];

interface DoctorScheduleProps {
  doctor: Doctor;
}

const DoctorSchedule: React.FC<DoctorScheduleProps> = ({ doctor }) => {
  // Filter today's appointments for this doctor
  const today = new Date();
  const todayAppointments = mockAppointments.filter(
    (appt) =>
      appt.doctorId === doctor.id &&
      new Date(appt.date).toDateString() === today.toDateString()
  );

  const getPatientName = (patientId: string) => {
    const patient = mockPatients.find((p) => p.id === patientId);
    return patient ? patient.name : patientId;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <CheckCircle2 className="text-blue-400" />;
      case 'in-progress':
        return <Clock className="text-yellow-400" />;
      case 'completed':
        return <CheckCircle2 className="text-green-400" />;
      case 'cancelled':
        return <XCircle className="text-red-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <GlassCard className="p-6 mb-6">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-neon-blue" />
          Today's Schedule
        </h2>
        {todayAppointments.length === 0 ? (
          <p className="text-gray-400">No appointments scheduled for today.</p>
        ) : (
          <div className="space-y-4">
            {todayAppointments.map((appt) => (
              <div key={appt.id} className="p-4 bg-dark-card/70 rounded-lg border border-dark-border flex items-center gap-4">
                <div className="flex-shrink-0">
                  <UserIcon className="w-8 h-8 text-neon-blue" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold text-lg">{getPatientName(appt.patientId)}</span>
                    <span className="text-xs px-2 py-1 rounded bg-dark-bg text-gray-300">{appt.time}</span>
                  </div>
                  <div className="text-gray-400 text-sm mt-1">Symptoms: {appt.symptoms}</div>
                  {appt.notes && <div className="text-gray-500 text-xs mt-1">Notes: {appt.notes}</div>}
                </div>
                <div className="flex-shrink-0">{getStatusIcon(appt.status)}</div>
              </div>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default DoctorSchedule; 