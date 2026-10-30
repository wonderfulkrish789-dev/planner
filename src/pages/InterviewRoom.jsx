import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  Camera, 
  CameraOff, 
  PhoneOff, 
  MessageSquare, 
  Settings, 
  Clock, 
  ChevronRight, 
  Send, 
  Sparkles, 
  Volume2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { VideoPreview } from '../components/interview/VideoPreview';
import { AIAvatar } from '../components/interview/AIAvatar';
import { Waveform } from '../components/interview/Waveform';
import { InterviewTimer, InterviewControls, TranscriptPanel } from '../components/interview/InterviewControls';
import { Button } from '../components/common/Button';
import { MOCK_INTERVIEW_QUESTIONS, CANDIDATE_PROFILE } from '../data/mockData';

export const InterviewRoom = ({ navigate, onFinishInterview }) => {
  // Pre-interview Countdown State (Section 9)
  const [countdown, setCountdown] = useState(3);
  const [isCountingDown, setIsCountingDown] = useState(true);

  // Live Interview State (Section 10)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [micActive, setMicActive] = useState(true);
  const [cameraActive, setCameraActive] = useState(true);
  const [transcriptOpen, setTranscriptOpen] = useState(true);
  
  // Speech & Speaker simulation state
  const [isAiSpeaking, setIsAiSpeaking] = useState(true);
  const [isApplicantSpeaking, setIsApplicantSpeaking] = useState(false);
  const [customAnswerText, setCustomAnswerText] = useState('');
  
  // Transcripts list
  const [transcripts, setTranscripts] = useState([]);

  const currentQ = MOCK_INTERVIEW_QUESTIONS[currentQuestionIndex] || MOCK_INTERVIEW_QUESTIONS[0];
  const totalQuestions = MOCK_INTERVIEW_QUESTIONS.length;

  // Handle Initial 3...2...1 Countdown
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsCountingDown(false);
      startQuestionFlow(0);
    }
  }, [countdown]);

  // When a new question starts, AI speaks first
  const startQuestionFlow = (qIndex) => {
    const q = MOCK_INTERVIEW_QUESTIONS[qIndex];
    if (!q) return;

    setIsAiSpeaking(true);
    setIsApplicantSpeaking(false);

    // Add AI question to transcripts
    const newEntry = {
      speaker: 'AI',
      text: q.aiSpeech || q.question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTranscripts(prev => [...prev, newEntry]);

    // AI finishes speaking question after ~3.5s, then prompts applicant
    setTimeout(() => {
      setIsAiSpeaking(false);
      setIsApplicantSpeaking(true);
    }, 3500);
  };

  const handleSimulateAnswer = () => {
    setIsApplicantSpeaking(false);

    // Record applicant response
    const answerText = customAnswerText.trim() || currentQ.applicantSampleAnswer;
    const applicantEntry = {
      speaker: 'Applicant',
      text: answerText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTranscripts(prev => [...prev, applicantEntry]);
    setCustomAnswerText('');

    // Advance to next question or end interview
    if (currentQuestionIndex + 1 < totalQuestions) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => {
          const nextIndex = prev + 1;
          startQuestionFlow(nextIndex);
          return nextIndex;
        });
      }, 1200);
    } else {
      // Completed all questions!
      setTimeout(() => {
        handleEndInterview();
      }, 1500);
    }
  };

  const handleEndInterview = () => {
    if (onFinishInterview) onFinishInterview(transcripts);
    navigate('interview-processing');
  };

  return (
    <div className="min-h-screen bg-navy-950 text-white flex flex-col justify-between p-3 sm:p-6 relative overflow-hidden select-none">
      
      {/* PRE-INTERVIEW COUNTDOWN OVERLAY (SECTION 9) */}
      <AnimatePresence>
        {isCountingDown && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy-950 flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div
              key={countdown}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-navy-900 border-4 border-coral shadow-glow-coral flex items-center justify-center mb-6"
            >
              <span className="text-5xl sm:text-7xl font-bold font-mono text-coral">
                {countdown}
              </span>
            </motion.div>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Interview starts in {countdown}...
            </h3>
            <p className="text-xs text-slate-400 mt-2 max-w-sm">
              Connecting audio streams with Aria (AI Interviewer). Take a breath and get ready!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP STATUS BAR (Google Meet Style) */}
      <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-coral flex items-center justify-center font-bold text-navy-950 text-xs shadow-glow-coral">
            AI
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <span>Full Stack Mock Interview</span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
                REC ● LIVE
              </span>
            </h2>
            <p className="text-[10px] text-slate-400">Target Role: Nexus Innovations Full Stack</p>
          </div>
        </div>

        {/* Center Progress & Question Count */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-center">
            <span className="text-[11px] font-mono text-slate-300">
              Question <strong className="text-coral">{currentQuestionIndex + 1}</strong> of {totalQuestions}
            </span>
            <div className="w-32 bg-navy-900 h-1.5 rounded-full overflow-hidden mt-1 border border-white/5">
              <div
                className="bg-coral h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          <InterviewTimer initialMinutes={15} onTimeExpired={handleEndInterview} />
        </div>
      </div>

      {/* MAIN VIDEO CALL STAGE (SECTION 10 & 11) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 py-4 min-h-[500px]">
        
        {/* Left Stage: Video Feeds */}
        <div className={`transition-all duration-300 ${transcriptOpen ? 'lg:col-span-8' : 'lg:col-span-12'} flex flex-col gap-4`}>
          
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 relative">
            
            {/* Applicant Live Camera Feed (Large) */}
            <div className="md:col-span-8 h-72 sm:h-96 md:h-full relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl">
              <VideoPreview
                cameraActive={cameraActive}
                micActive={micActive}
                candidateName={CANDIDATE_PROFILE.name}
                className="w-full h-full"
              />

              {/* Live Applicant Speaking Waveform Badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-30">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-navy-900/80 backdrop-blur-md border border-white/10 text-xs font-mono text-white">
                  <span className={`w-2 h-2 rounded-full ${isApplicantSpeaking ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
                  <span>{isApplicantSpeaking ? "Speaking Response..." : "Microphone Ready"}</span>
                </div>

                {isApplicantSpeaking && (
                  <div className="w-28 sm:w-36">
                    <Waveform isActive={true} mode="applicant" barCount={18} className="h-7 py-0" />
                  </div>
                )}
              </div>
            </div>

            {/* AI Interviewer Video Panel (Small / Sidebar) */}
            <div className="md:col-span-4 h-72 sm:h-96 md:h-full flex flex-col gap-3">
              <div className="flex-1 relative rounded-3xl overflow-hidden border border-coral/30 shadow-glow-coral">
                <AIAvatar
                  isSpeaking={isAiSpeaking}
                  name="Aria • Lead AI Interviewer"
                />

                {/* AI Speaking Waveform Overlay */}
                {isAiSpeaking && (
                  <div className="absolute bottom-3 inset-x-3 z-20">
                    <Waveform isActive={true} mode="ai" barCount={20} className="h-8 py-0.5 bg-navy-950/90" />
                  </div>
                )}
              </div>

              {/* Current Question Callout Box */}
              <div className="p-4 rounded-2xl bg-navy-900/90 border border-white/10 shadow-lg">
                <div className="flex items-center justify-between text-[10px] font-mono text-coral uppercase mb-1">
                  <span>Current Question</span>
                  <span>{currentQ.category}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-white leading-snug">
                  "{currentQ.question}"
                </h4>
              </div>
            </div>

          </div>

          {/* Quick Answer Simulation Bar (for prototype convenience) */}
          <div className="p-3 bg-navy-900/80 border border-white/10 rounded-2xl flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              value={customAnswerText}
              onChange={(e) => setCustomAnswerText(e.target.value)}
              placeholder="Type your response or leave blank to simulate candidate's voice answer..."
              className="flex-1 bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-coral font-sans w-full"
            />
            <Button
              size="sm"
              onClick={handleSimulateAnswer}
              className="shadow-glow-coral whitespace-nowrap text-navy-950 font-bold w-full sm:w-auto"
            >
              Submit Answer & Continue <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>

        </div>

        {/* Right Stage: Live Transcript Panel Drawer (Toggleable) */}
        {transcriptOpen && (
          <div className="lg:col-span-4 h-96 lg:h-full">
            <TranscriptPanel
              transcripts={transcripts}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={totalQuestions}
              isAiSpeaking={isAiSpeaking}
              isApplicantSpeaking={isApplicantSpeaking}
            />
          </div>
        )}

      </div>

      {/* BOTTOM CONTROL DOCK (Google Meet Style) */}
      <div className="pt-2">
        <InterviewControls
          micActive={micActive}
          cameraActive={cameraActive}
          transcriptOpen={transcriptOpen}
          onToggleMic={() => setMicActive(!micActive)}
          onToggleCamera={() => setCameraActive(!cameraActive)}
          onToggleTranscript={() => setTranscriptOpen(!transcriptOpen)}
          onOpenSettings={() => alert("Hardware Settings: Default microphone & webcam calibrated.")}
          onEndInterview={handleEndInterview}
        />
      </div>

    </div>
  );
};
