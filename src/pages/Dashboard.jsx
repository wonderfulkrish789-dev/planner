import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Award, 
  Target, 
  TrendingUp, 
  ShieldCheck, 
  Cpu, 
  ChevronRight,
  Layers,
  FileCheck
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { ScoreRing } from '../components/common/AIOrb';
import { CANDIDATE_PROFILE } from '../data/mockData';

export const Dashboard = ({ navigate, user = CANDIDATE_PROFILE }) => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300 select-none">
      
      {/* Welcome Hero Banner (No Emojis, Clean Tech Styling) */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#0b1928] via-[#0b1928]/95 to-[#102235] border border-white/10 p-6 sm:p-9 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-coral/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-coral/10 border border-coral/25 text-coral text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CAREER INTELLIGENCE PLATFORM</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Welcome back, {user.name.split(' ')[0]}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Target Track: <strong className="text-coral">{user.role}</strong> at <span className="text-white">{user.targetCompany || "Nexus Innovations"}</span>. Start your profile assessment to calculate your resume score and determine interview readiness.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="lg"
              onClick={() => navigate('resume-analysis')}
              className="shadow-glow-coral text-navy-950 font-bold text-xs sm:text-sm px-6"
            >
              Start Resume Analysis <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* CORE STATS OVERVIEW CARDS (Simplified without removed items) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        {/* Stat 1: Current Resume Score */}
        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => navigate('resume-analysis')}
          className="p-6 rounded-2xl bg-[#0b1928]/80 backdrop-blur-md border border-white/10 hover:border-coral/40 transition-all shadow-subtle cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-medium">Last Profile Score</span>
            <div className="p-2 rounded-xl bg-coral/10 text-coral group-hover:scale-110 transition-transform">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <strong className="text-3xl font-mono font-bold text-white">{user.resumeScore}</strong>
            <span className="text-xs font-mono text-slate-400">/ 100</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> High Alignment
            </span>
            <span className="text-slate-400 group-hover:text-coral flex items-center gap-0.5">
              Re-analyze <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </motion.div>

        {/* Stat 2: Target Qualification Threshold */}
        <motion.div
          whileHover={{ y: -3 }}
          className="p-6 rounded-2xl bg-[#0b1928]/80 backdrop-blur-md border border-white/10 transition-all shadow-subtle"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-medium">Interview Threshold</span>
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <strong className="text-3xl font-mono font-bold text-sky-400">75%</strong>
            <span className="text-xs font-mono text-slate-400">Passing Benchmark</span>
          </div>
          <div className="mt-3 text-[11px] text-slate-400">
            Scores ≥ 75 unlock simulated AI mock interviews
          </div>
        </motion.div>

        {/* Stat 3: Target Role Benchmark */}
        <motion.div
          whileHover={{ y: -3 }}
          className="p-6 rounded-2xl bg-[#0b1928]/80 backdrop-blur-md border border-white/10 transition-all shadow-subtle"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-medium">Evaluation Model</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <strong className="text-xl font-bold text-white">Full Stack Track</strong>
          </div>
          <div className="mt-3 text-[11px] text-purple-300 font-mono">
            React, Node, DB & Architecture
          </div>
        </motion.div>

      </div>

      {/* FEATURED JOURNEY CARD */}
      <div className="p-7 rounded-3xl bg-[#0b1928]/90 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-coral" />
            <h3 className="text-base font-bold text-white font-sans">
              CareerAI Assessment Pipeline
            </h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-coral/10 border border-coral/25 text-coral">
            STEP 1 READY
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <h4 className="text-xl font-serif font-bold text-white">
              Benchmark your resume against real job requirements
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Upload your resume and target job description. The AI neural engine parses your profile and computes your profile score:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-navy-950/80 border border-emerald-500/20 text-slate-200">
                <span className="font-semibold text-emerald-400 block mb-1">Score 75 or higher:</span>
                Qualified for immediate AI mock interview simulation with real-time video evaluation.
              </div>
              <div className="p-3.5 rounded-xl bg-navy-950/80 border border-amber-500/20 text-slate-200">
                <span className="font-semibold text-amber-400 block mb-1">Score below 75:</span>
                Automatic skill-gap extraction, deficit breakdown, and curated learning recommendations.
              </div>
            </div>

            <div className="pt-2">
              <Button
                size="lg"
                onClick={() => navigate('resume-analysis')}
                className="shadow-glow-coral text-navy-950 font-bold text-sm px-8"
              >
                Upload Resume & Target JD <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-navy-950/80 border border-white/5 text-center">
            <ScoreRing
              score={user.resumeScore}
              size={135}
              strokeWidth={10}
              color="#ff806b"
              label="Verified"
              sublabel="ATS Standard"
            />
            <span className="text-xs text-slate-400 mt-2 font-mono">
              Ready for Next Assessment
            </span>
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY LOG */}
      <div className="p-6 rounded-3xl bg-[#0b1928]/80 border border-white/10 shadow-subtle">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-3 border-b border-white/10 flex items-center justify-between">
          <span>Recent Activity & Pipeline Events</span>
          <Clock className="w-4 h-4 text-slate-400" />
        </h3>

        <div className="mt-4 space-y-3.5">
          {user.recentActivity?.map((act, i) => (
            <div key={i} className="flex items-start gap-3 text-xs">
              <div className="w-2 h-2 rounded-full bg-coral mt-1.5 shrink-0" />
              <div className="flex-1">
                <p className="text-slate-200 font-medium leading-snug">{act.title}</p>
                <span className="text-[10px] text-slate-500">{act.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
