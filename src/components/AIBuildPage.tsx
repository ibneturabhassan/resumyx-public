import React, { useState } from 'react';
import { ResumeData } from '../types/index';
import { apiService } from '../services/apiService';

interface Props {
  profileData: ResumeData;
  jd: string;
  setJd: (val: string) => void;
  onResult: (tailoredData: ResumeData) => void;
  onAgentChange?: (agentName: string | null) => void;
  onScoreUpdate?: (score: number | null) => void;
  onProceed?: () => void;
  tailoredData?: ResumeData | null;
  matchScore?: number | null;
}

/**
 * AIBuildPage - Resume tailoring with AI
 *
 * This component handles the AI-powered resume tailoring workflow.
 * It takes the user's profile data and a job description, then calls
 * the backend AI endpoints to optimize each section of the resume.
 *
 * To implement:
 * 1. Call apiService.tailorResume() or individual tailor endpoints
 * 2. Call apiService.calculateATSScore() to score the result
 * 3. Display progress logs during processing
 * 4. Show the tailored result for review
 */
const AIBuildPage: React.FC<Props> = ({
  profileData,
  jd,
  setJd,
  onResult,
  onAgentChange,
  onScoreUpdate,
  onProceed,
  tailoredData,
  matchScore,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleTailor = async () => {
    if (!jd.trim()) {
      setError('Please paste a job description first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setLogs(['Starting resume tailoring...']);

    try {
      // TODO: Implement resume tailoring logic
      // Example:
      // onAgentChange?.('summary');
      // setLogs(prev => [...prev, '✨ Tailoring summary...']);
      // const result = await apiService.tailorResume(profileData, jd);
      // onResult(result);
      //
      // onAgentChange?.('ats');
      // setLogs(prev => [...prev, '📊 Calculating ATS score...']);
      // const atsResult = await apiService.calculateATSScore(result, jd);
      // onScoreUpdate?.(atsResult.score);
      //
      // onAgentChange?.(null);
      // setLogs(prev => [...prev, '✅ Resume tailoring complete!']);

      setLogs(prev => [...prev, '⚠️ AI tailoring not yet implemented. See AIBuildPage.tsx to implement.']);
    } catch (err: any) {
      setError(err.message || 'An error occurred during tailoring.');
    } finally {
      setIsLoading(false);
      onAgentChange?.(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Job Description Input */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-base font-semibold text-slate-800 mb-4">
          <i className="fas fa-briefcase text-blue-600 mr-2"></i>
          Job Description
        </h2>
        <textarea
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder="Paste the job description here..."
          className="w-full h-48 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Action Button */}
      <button
        onClick={handleTailor}
        disabled={isLoading || !jd.trim()}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <i className="fas fa-circle-notch fa-spin"></i>
            <span>Tailoring Resume...</span>
          </>
        ) : (
          <>
            <i className="fas fa-wand-magic-sparkles"></i>
            <span>Tailor Resume with AI</span>
          </>
        )}
      </button>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          <i className="fas fa-exclamation-circle mr-2"></i>
          {error}
        </div>
      )}

      {/* Activity Log */}
      {logs.length > 0 && (
        <div className="bg-slate-900 rounded-xl p-4">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Activity Log</h3>
          <div className="space-y-1">
            {logs.map((log, i) => (
              <p key={i} className="text-sm text-slate-300 font-mono">{log}</p>
            ))}
          </div>
        </div>
      )}

      {/* ATS Score Display */}
      {matchScore !== null && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-slate-800">ATS Match Score</h3>
            <div className={`text-2xl font-bold ${matchScore >= 80 ? 'text-emerald-600' : matchScore >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
              {matchScore}%
            </div>
          </div>
          {onProceed && (
            <button
              onClick={onProceed}
              className="w-full bg-slate-900 text-white py-2.5 px-4 rounded-lg font-semibold text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <i className="fas fa-file-lines"></i>
              <span>Generate Cover Letter</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AIBuildPage;
