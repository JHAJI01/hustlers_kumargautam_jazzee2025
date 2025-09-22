import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Mic, 
  MicOff, 
  Send, 
  Bot, 
  User, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Stethoscope
} from 'lucide-react';
import GlassCard from '../common/GlassCard';
import GlowingButton from '../common/GlowingButton';
import LoadingSpinner from '../common/LoadingSpinner';
import { useVoiceInput } from '../../hooks/useVoiceInput';
import { AIService } from '../../services/aiService';
import { ChatMessage, SymptomAnalysis } from '../../types';

const SymptomChecker: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      message: "Hello! I'm your AI health assistant. Please describe your symptoms in detail, and I'll help analyze them and recommend the appropriate specialist.",
      timestamp: new Date(),
      type: 'text',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<SymptomAnalysis | null>(null);
  
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    isSupported,
  } = useVoiceInput();

  const handleSendMessage = async () => {
    if (!inputText.trim() && !transcript.trim()) return;

    const messageText = inputText.trim() || transcript.trim();
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: messageText,
      timestamp: new Date(),
      type: transcript.trim() ? 'voice' : 'text',
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    resetTranscript();
    setIsAnalyzing(true);

    try {
      // Get AI response
      const aiResponse = await AIService.getChatbotResponse(messageText);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        message: aiResponse,
        timestamp: new Date(),
        type: 'text',
      };

      setMessages(prev => [...prev, aiMessage]);

      // Analyze symptoms if the message contains symptom descriptions
      if (messageText.length > 20) { // Assuming longer messages are symptom descriptions
        const symptomAnalysis = await AIService.analyzeSymptoms(messageText);
        setAnalysis(symptomAnalysis);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        message: 'I apologize, but I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
        type: 'text',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'high': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'low': return 'text-green-400 bg-green-400/10 border-green-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return AlertTriangle;
      case 'high': return AlertTriangle;
      case 'medium': return Clock;
      case 'low': return CheckCircle;
      default: return CheckCircle;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-neon-blue" />
          {t('symptoms')} Checker
        </h1>
        <p className="text-gray-400">
          Describe your symptoms and get AI-powered health insights
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <GlassCard className="h-[600px] flex flex-col">
            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex gap-3 ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.sender === 'ai' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-cyan rounded-full flex items-center justify-center">
                        <Bot size={16} className="text-dark-bg" />
                      </div>
                    )}
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-neon-blue to-neon-cyan text-dark-bg'
                          : 'bg-dark-card border border-dark-border text-white'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-dark-bg/70' : 'text-gray-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                        {message.type === 'voice' && ' 🎤'}
                      </p>
                    </div>
                    {message.sender === 'user' && (
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                        <User size={16} className="text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-cyan rounded-full flex items-center justify-center">
                    <Bot size={16} className="text-dark-bg" />
                  </div>
                  <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-lg bg-dark-card border border-dark-border text-white">
                    <div className="flex items-center gap-2">
                      <LoadingSpinner size="sm" />
                      <p className="text-sm">{t('analyzing')}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-dark-border">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputText || transcript}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={t('describe')}
                    className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue transition-colors"
                  />
                  {(inputText || transcript) && (
                    <button
                      onClick={() => {
                        setInputText('');
                        resetTranscript();
                      }}
                      className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      ×
                    </button>
                  )}
                </div>
                {isSupported && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleVoiceToggle}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      isListening
                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                        : 'bg-dark-card border border-dark-border text-gray-400 hover:text-neon-blue hover:border-neon-blue'
                    }`}
                  >
                    {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                  </motion.button>
                )}
                <GlowingButton
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() && !transcript.trim()}
                  size="md"
                  icon={Send}
                >
                  Send
                </GlowingButton>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Analysis Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {analysis ? (
            <>
              {/* Severity Assessment */}
              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Assessment Results
                </h3>
                <div className={`p-4 rounded-lg border ${getSeverityColor(analysis.severity)}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {React.createElement(getSeverityIcon(analysis.severity), {
                      size: 20,
                      className: analysis.severity === 'critical' || analysis.severity === 'high' 
                        ? 'text-red-400' : analysis.severity === 'medium' 
                          ? 'text-yellow-400' : 'text-green-400'
                    })}
                    <span className="font-medium capitalize">{analysis.severity} Priority</span>
                  </div>
                  <p className="text-sm">{analysis.immediateAction}</p>
                </div>
              </GlassCard>

              {/* Recommended Specialist */}
              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-neon-blue" />
                  Recommended Specialist
                </h3>
                <div className="p-4 bg-neon-blue/10 rounded-lg border border-neon-blue/30">
                  <p className="font-medium text-neon-blue">{analysis.suggestedSpecialist}</p>
                </div>
                <GlowingButton className="w-full mt-4" size="md">
                  Book Appointment
                </GlowingButton>
              </GlassCard>

              {/* Detected Symptoms */}
              {analysis.symptoms.length > 0 && (
                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Detected Symptoms
                  </h3>
                  <div className="space-y-2">
                    {analysis.symptoms.map((symptom, index) => (
                      <div
                        key={index}
                        className="p-3 bg-dark-card/50 rounded-lg border border-dark-border/50"
                      >
                        <p className="text-sm font-medium text-white capitalize">{symptom}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {/* Possible Conditions */}
              {analysis.possibleConditions.length > 0 && (
                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Possible Conditions
                  </h3>
                  <div className="space-y-2">
                    {analysis.possibleConditions.map((condition, index) => (
                      <div
                        key={index}
                        className="p-3 bg-dark-card/50 rounded-lg border border-dark-border/50"
                      >
                        <p className="text-sm text-white">{condition}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-orange-400/10 rounded-lg border border-orange-400/30">
                    <p className="text-xs text-orange-400">
                      Confidence: {Math.round(analysis.confidence * 100)}%
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      This is an AI assessment and should not replace professional medical advice.
                    </p>
                  </div>
                </GlassCard>
              )}
            </>
          ) : (
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                How it works
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-neon-blue/20 rounded-full flex items-center justify-center">
                    <span className="text-neon-blue font-bold text-sm">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Describe Symptoms</p>
                    <p className="text-xs text-gray-400">Tell us about your symptoms in detail</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-neon-blue/20 rounded-full flex items-center justify-center">
                    <span className="text-neon-blue font-bold text-sm">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">AI Analysis</p>
                    <p className="text-xs text-gray-400">Our AI analyzes your symptoms</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-neon-blue/20 rounded-full flex items-center justify-center">
                    <span className="text-neon-blue font-bold text-sm">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Get Recommendations</p>
                    <p className="text-xs text-gray-400">Receive specialist recommendations</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SymptomChecker;