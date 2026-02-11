import React, { useState } from 'react';
import { ResumeData } from '../types/index';
import { apiService } from '../services/apiService';

interface Props {
  profileData: ResumeData;
  jd: string;
  setJd: (val: string) => void;
  onUpdate: (content: string) => void;
  onAgentChange?: (agent: string | null) => void;
  onSuggestedExperience?: (items: any[]) => void;
  onSuggestedProjects?: (items: any[]) => void;
}

/**
 * ProposalPage - AI-powered freelance proposal generator
 *
 * This component generates a winning freelance proposal (for Upwork, Fiverr, etc.)
 * based on the user's profile and a job posting.
 *
 * To implement:
 * 1. Call apiService.generateProposal(profileData, jd)
 * 2. The response includes proposal text and suggested experience/projects
 * 3. Pass suggested items to parent via onSuggestedExperience / onSuggestedProjects
 * 4. Display the generated proposal and allow editing
 */
const ProposalPage: React.FC<Props> = ({
  profileData,
  jd,
  setJd,
  onUpdate,
  onAgentChange,
  onSuggestedExperience,
  onSuggestedProjects,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [proposal, setProposal] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!jd.trim()) {
      setError('Please paste a job posting first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setLogs(['Starting proposal generation...']);
    onAgentChange?.('proposal');

    try {
      // TODO: Implement proposal generation
      // Example:
      // const result = await apiService.generateProposal(profileData, jd);
      // setProposal(result.proposal);
      // onUpdate(result.proposal);
      // onSuggestedExperience?.(result.suggested_experience || []);
      // onSuggestedProjects?.(result.suggested_projects || []);

      setLogs(prev => [...prev, '⚠️ Proposal generation not yet implemented. See ProposalPage.tsx to implement.']);
    } catch (err: any) {
      setError(err.message || 'An error occurred during generation.');
    } finally {
      setIsLoading(false);
      onAgentChange?.(null);
    }
  };

  const handleEditorChange = (value: string) => {
    setProposal(value);
    onUpdate(value);
  };

  return (
    <div className="space-y-6">
      {/* Job Posting Input */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-base font-semibold text-slate-800 mb-4">
          <i className="fas fa-handshake text-blue-600 mr-2"></i>
          Job Posting
        </h2>
        <p className="text-sm text-slate-500 mb-3">
          Paste the freelance job posting from Upwork, Fiverr, or similar platforms.
        </p>
        <textarea
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder="Paste the job posting here..."
          className="w-full h-48 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isLoading || !jd.trim()}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <i className="fas fa-circle-notch fa-spin"></i>
            <span>Generating Proposal...</span>
          </>
        ) : (
          <>
            <i className="fas fa-wand-magic-sparkles"></i>
            <span>Generate Winning Proposal</span>
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

      {/* Proposal Editor */}
      {proposal && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-base font-semibold text-slate-800 mb-4">
            <i className="fas fa-pen text-emerald-600 mr-2"></i>
            Generated Proposal
          </h3>
          <textarea
            value={proposal}
            onChange={(e) => handleEditorChange(e.target.value)}
            className="w-full h-64 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>
      )}
    </div>
  );
};

export default ProposalPage;
