import React, { useState } from 'react';
import { ResumeData } from '../types/index';
import { apiService } from '../services/apiService';

interface Props {
  profileData: ResumeData;
  jd: string;
  setJd: (val: string) => void;
  instructions: string;
  setInstructions: (val: string) => void;
  onUpdate: (content: string) => void;
  onAgentChange?: (agent: string | null) => void;
  coverLetter?: string;
}

/**
 * CoverLetterPage - AI-powered cover letter generator
 *
 * This component generates a personalized cover letter based on the
 * user's profile and a job description.
 *
 * To implement:
 * 1. Call apiService.generateCoverLetter(profileData, jd, instructions)
 * 2. Display the result in the editor
 * 3. Allow manual editing after generation
 * 4. Sync changes back to parent via onUpdate()
 */
const CoverLetterPage: React.FC<Props> = ({
  profileData,
  jd,
  setJd,
  instructions,
  setInstructions,
  onUpdate,
  onAgentChange,
  coverLetter = '',
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editedLetter, setEditedLetter] = useState(coverLetter);

  const handleGenerate = async () => {
    if (!jd.trim()) {
      setError('Please paste a job description first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    onAgentChange?.('cover_letter');

    try {
      // TODO: Implement cover letter generation
      // Example:
      // const generated = await apiService.generateCoverLetter(profileData, jd, instructions);
      // setEditedLetter(generated);
      // onUpdate(generated);

      setError('Cover letter generation not yet implemented. See CoverLetterPage.tsx to implement.');
    } catch (err: any) {
      setError(err.message || 'An error occurred during generation.');
    } finally {
      setIsLoading(false);
      onAgentChange?.(null);
    }
  };

  const handleEditorChange = (value: string) => {
    setEditedLetter(value);
    onUpdate(value);
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
          className="w-full h-32 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Special Instructions */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-base font-semibold text-slate-800 mb-4">
          <i className="fas fa-sliders text-purple-600 mr-2"></i>
          Special Instructions (Optional)
        </h2>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="e.g., Keep it to one page, use a formal tone, emphasize leadership skills..."
          className="w-full h-24 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
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
            <span>Generating Cover Letter...</span>
          </>
        ) : (
          <>
            <i className="fas fa-file-lines"></i>
            <span>Generate Cover Letter</span>
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

      {/* Cover Letter Editor */}
      {editedLetter && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-base font-semibold text-slate-800 mb-4">
            <i className="fas fa-pen text-emerald-600 mr-2"></i>
            Generated Cover Letter
          </h3>
          <textarea
            value={editedLetter}
            onChange={(e) => handleEditorChange(e.target.value)}
            className="w-full h-64 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono"
          />
        </div>
      )}
    </div>
  );
};

export default CoverLetterPage;
