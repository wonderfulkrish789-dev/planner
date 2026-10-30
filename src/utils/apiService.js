// CareerAI API Service Abstraction Layer
// This service abstracts all AI agent processes, score calculations, and report generation.
// It is designed to be cleanly swapped with real FastAPI endpoints and LLM agent services.
// STRICT REQUIREMENT: ZERO EMOJIS in logs, outputs, or PDF exports.

import { 
  CANDIDATE_PROFILE, 
  HIGH_SCORE_ANALYSIS, 
  LOW_SCORE_ANALYSIS, 
  DETAILED_GAP_DATA, 
  INTERVIEW_REPORT_DATA 
} from '../data/mockData';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  login: async (email, password) => {
    await delay(500);
    const user = {
      ...CANDIDATE_PROFILE,
      email: email || CANDIDATE_PROFILE.email
    };
    localStorage.setItem('careerai_user', JSON.stringify(user));
    return { success: true, user };
  },

  signup: async (name, email, password) => {
    await delay(600);
    const user = {
      ...CANDIDATE_PROFILE,
      name: name || CANDIDATE_PROFILE.name,
      email: email || CANDIDATE_PROFILE.email
    };
    localStorage.setItem('careerai_user', JSON.stringify(user));
    return { success: true, user };
  },

  getCurrentUser: () => {
    const saved = localStorage.getItem('careerai_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return CANDIDATE_PROFILE;
      }
    }
    return CANDIDATE_PROFILE;
  },

  logout: async () => {
    await delay(200);
    localStorage.removeItem('careerai_user');
    return { success: true };
  }
};

export const careerService = {
  // 1. Analyze Resume with Live Steps Progress
  analyzeResume: async (file, jobDescription, targetScoreType = "high", onProgress) => {
    const steps = [
      { step: 1, text: "Resume uploaded", progress: 15 },
      { step: 2, text: "Extracting candidate information", progress: 30 },
      { step: 3, text: "Parsing technical skills", progress: 45 },
      { step: 4, text: "Reading job description", progress: 60 },
      { step: 5, text: "Comparing experience with requirements", progress: 75 },
      { step: 6, text: "Evaluating projects and education", progress: 88 },
      { step: 7, text: "Calculating profile score", progress: 95 },
      { step: 8, text: "Finalizing analysis", progress: 100 }
    ];

    for (const stepObj of steps) {
      await delay(550);
      if (onProgress) onProgress(stepObj);
    }

    const result = targetScoreType === "low" ? LOW_SCORE_ANALYSIS : HIGH_SCORE_ANALYSIS;
    return { success: true, data: result };
  },

  // 2. Calculate Resume Score
  calculateResumeScore: async (resumeData) => {
    await delay(300);
    return {
      score: 82,
      benchmark: 75,
      isQualified: true
    };
  },

  // 3. Automatic Gap Analysis for Low Scores
  analyzeSkillGaps: async (onProgress) => {
    const steps = [
      { step: 1, text: "Resume analysis completed", progress: 20 },
      { step: 2, text: "Job requirements extracted", progress: 45 },
      { step: 3, text: "Comparing required skills", progress: 65 },
      { step: 4, text: "Identifying missing skills", progress: 80 },
      { step: 5, text: "Evaluating proficiency gaps", progress: 92 },
      { step: 6, text: "Generating recommendations", progress: 100 }
    ];

    for (const stepObj of steps) {
      await delay(500);
      if (onProgress) onProgress(stepObj);
    }

    return { success: true, data: DETAILED_GAP_DATA };
  },

  // 4. Generate Recommendations
  generateRecommendations: async (gaps) => {
    await delay(400);
    return { success: true, data: DETAILED_GAP_DATA.recommendations };
  },

  // 5. Start Interview Session
  startInterview: async (config = {}) => {
    await delay(300);
    return {
      sessionId: `ai-session-${Date.now()}`,
      status: "initialized",
      questionsCount: 5,
      role: "Full Stack Developer"
    };
  },

  // 6. Post-Interview Processing & Analysis
  analyzeInterview: async (transcripts, onProgress) => {
    const steps = [
      { step: 1, text: "Interview completed", progress: 15 },
      { step: 2, text: "Transcribing responses", progress: 35 },
      { step: 3, text: "Evaluating technical answers", progress: 55 },
      { step: 4, text: "Analyzing communication", progress: 72 },
      { step: 5, text: "Evaluating confidence", progress: 85 },
      { step: 6, text: "Calculating final score", progress: 94 },
      { step: 7, text: "Generating final report", progress: 100 }
    ];

    for (const stepObj of steps) {
      await delay(600);
      if (onProgress) onProgress(stepObj);
    }

    return { success: true, data: INTERVIEW_REPORT_DATA };
  },

  // 7. Generate Final Comprehensive Report
  generateReport: async (type = "interview") => {
    await delay(350);
    return {
      success: true,
      data: type === "interview" ? INTERVIEW_REPORT_DATA : DETAILED_GAP_DATA
    };
  }
};

export const interviewService = careerService;

export const pdfService = {
  generateReportPDF: async (elementId = "careerai-final-report", reportTitle = "CareerAI Assessment Report") => {
    try {
      const element = document.getElementById(elementId);
      
      if (element) {
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#07121e'
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`CareerAI-Official-Report.pdf`);
        return true;
      } else {
        // Programmatic Fallback
        const pdf = new jsPDF();
        pdf.setFillColor(7, 18, 30);
        pdf.rect(0, 0, 210, 297, 'F');

        pdf.setTextColor(255, 128, 107);
        pdf.setFontSize(22);
        pdf.text("CareerAI", 20, 25);

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(14);
        pdf.text("OFFICIAL CANDIDATE CAREER ASSESSMENT REPORT", 20, 35);

        pdf.setFontSize(10);
        pdf.setTextColor(160, 175, 190);
        pdf.text(`Candidate: Krish Sharma | Target Role: Full Stack Developer | Date: October 30, 2026`, 20, 43);

        pdf.setDrawColor(255, 128, 107);
        pdf.line(20, 48, 190, 48);

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(12);
        pdf.text("Summary: Profile evaluated against Full Stack Developer benchmarks.", 20, 60);

        pdf.save(`CareerAI-Official-Report.pdf`);
        return true;
      }
    } catch (err) {
      console.error("PDF generation failed:", err);
      return false;
    }
  }
};
