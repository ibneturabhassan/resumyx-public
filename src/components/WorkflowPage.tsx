import React from 'react';

/**
 * WorkflowPage - Visual workflow diagram using ReactFlow
 *
 * This component renders an interactive flowchart visualization
 * of the AI processing pipeline. It shows how user data flows through
 * various AI agents (summary, experience, skills, projects, education)
 * and how they process in parallel.
 *
 * To implement the full workflow visualization:
 * 1. Install reactflow: npm install reactflow
 * 2. Define nodes and edges for each workflow step
 * 3. Use ReactFlow component to render the interactive graph
 * 4. Add custom node types for different agent types
 *
 * See docs/ARCHITECTURE.md for the full workflow design.
 */
const WorkflowPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-base font-semibold text-slate-800 mb-4">
          <i className="fas fa-diagram-project text-blue-600 mr-2"></i>
          AI Processing Workflow
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Visualize how the AI agents process your resume in parallel.
          Each node represents a processing step; edges show data flow.
        </p>

        {/* Placeholder workflow diagram */}
        <div className="bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 p-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
            <WorkflowNode label="Profile Data" icon="fa-user" color="bg-slate-600" />
            <i className="fas fa-arrow-right text-slate-400"></i>
            <div className="flex flex-col gap-2">
              <WorkflowNode label="Summary Agent" icon="fa-pen" color="bg-blue-600" small />
              <WorkflowNode label="Experience Agent" icon="fa-briefcase" color="bg-purple-600" small />
              <WorkflowNode label="Skills Agent" icon="fa-code" color="bg-emerald-600" small />
              <WorkflowNode label="Projects Agent" icon="fa-folder" color="bg-amber-600" small />
            </div>
            <i className="fas fa-arrow-right text-slate-400"></i>
            <WorkflowNode label="Tailored Resume" icon="fa-file-lines" color="bg-emerald-700" />
          </div>

          <p className="text-xs text-slate-400 mt-4">
            All agents run in parallel using <code className="bg-slate-200 px-1 rounded">asyncio.gather()</code> on the backend
          </p>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-sm text-blue-700">
            <i className="fas fa-info-circle mr-2"></i>
            <strong>To implement:</strong> Use the <code>reactflow</code> package to create an interactive,
            editable workflow diagram. See <code>WorkflowPage.tsx</code> for implementation notes.
          </p>
        </div>
      </div>
    </div>
  );
};

const WorkflowNode: React.FC<{ label: string; icon: string; color: string; small?: boolean }> = ({
  label,
  icon,
  color,
  small = false,
}) => (
  <div className={`${small ? 'px-3 py-2' : 'px-4 py-3'} ${color} text-white rounded-lg flex items-center gap-2 shadow-sm`}>
    <i className={`fas ${icon} ${small ? 'text-xs' : 'text-sm'}`}></i>
    <span className={`font-medium ${small ? 'text-xs' : 'text-sm'}`}>{label}</span>
  </div>
);

export default WorkflowPage;
