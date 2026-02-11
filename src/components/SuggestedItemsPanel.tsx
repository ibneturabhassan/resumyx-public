import React from 'react';
import { Experience, Project } from '../types/index';

interface Props {
  suggestedExperience: Experience[];
  suggestedProjects: Project[];
}

/**
 * SuggestedItemsPanel - Shows AI-suggested relevant experience and projects
 *
 * Displayed in the right panel when the user is on the Proposal page.
 * The AI selects the most relevant experience and projects from the user's
 * profile that match the freelance job posting.
 *
 * The items are passed from ProposalPage via App.tsx state.
 */
const SuggestedItemsPanel: React.FC<Props> = ({ suggestedExperience, suggestedProjects }) => {
  const hasItems = suggestedExperience.length > 0 || suggestedProjects.length > 0;

  if (!hasItems) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-slate-200 mx-auto mb-4 flex items-center justify-center">
            <i className="fas fa-list-check text-2xl text-slate-400"></i>
          </div>
          <h4 className="text-sm font-semibold text-slate-600 mb-2">Relevant Items</h4>
          <p className="text-xs text-slate-400 max-w-[200px]">
            Generate a proposal to see AI-suggested relevant experience and projects.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-6">
      {/* Suggested Experience */}
      {suggestedExperience.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
            <i className="fas fa-briefcase mr-1.5"></i>
            Relevant Experience
          </h3>
          <div className="space-y-3">
            {suggestedExperience.map((exp) => (
              <div key={exp.id} className="bg-white rounded-lg border border-slate-200 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{exp.role}</p>
                    <p className="text-xs text-slate-500">{exp.company}</p>
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap ml-2">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <ul className="space-y-1">
                  {exp.description.slice(0, 2).map((bullet, i) => (
                    <li key={i} className="text-xs text-slate-600 flex gap-2">
                      <span className="text-slate-300 mt-0.5">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Projects */}
      {suggestedProjects.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
            <i className="fas fa-code mr-1.5"></i>
            Relevant Projects
          </h3>
          <div className="space-y-3">
            {suggestedProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg border border-slate-200 p-4">
                <p className="text-sm font-semibold text-slate-800 mb-1">{project.name}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <ul className="space-y-1">
                  {project.description.slice(0, 2).map((bullet, i) => (
                    <li key={i} className="text-xs text-slate-600 flex gap-2">
                      <span className="text-slate-300 mt-0.5">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuggestedItemsPanel;
