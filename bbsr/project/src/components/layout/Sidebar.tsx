import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  Users, 
  MessageSquare,
  Settings,
  Stethoscope,
  Upload
} from 'lucide-react';
import { User } from '../../types';

interface SidebarProps {
  user: User;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, activeTab, onTabChange }) => {
  const { t } = useTranslation();

  const patientTabs = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'symptoms', label: t('symptoms'), icon: MessageSquare },
    { id: 'appointments', label: t('appointments'), icon: Calendar },
    { id: 'reports', label: 'Patient Medical Reports', icon: FileText },
    { id: 'settings', label: t('settings'), icon: Settings },
    { id: 'ayurveda', label: 'Ayurvedic Remedies', icon: Stethoscope },
  ];

  const doctorTabs = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'patients', label: t('patients'), icon: Users },
    { id: 'appointments', label: 'Schedule', icon: Calendar },
    { id: 'reports', label: 'Patient Medical Reports', icon: FileText },
    { id: 'settings', label: t('settings'), icon: Settings },
  ];

  const tabs = user.role === 'patient' ? patientTabs : doctorTabs;

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-64 bg-dark-surface border-r border-dark-border h-full"
    >
      <div className="p-6">
        <nav className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-neon-blue to-neon-cyan text-dark-bg shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-dark-card'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{tab.label}</span>
              </motion.button>
            );
          })}
        </nav>
      </div>
    </motion.aside>
  );
};

export default Sidebar;