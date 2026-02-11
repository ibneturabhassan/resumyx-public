import React, { useEffect } from 'react';
import { CopilotProvider, useCopilot } from '../contexts/CopilotContext';
import AIBuildPage from './AIBuildPage';
import ChatButton from './chat/ChatButton';
import ChatPanel from './chat/ChatPanel';
import { ResumeData } from '../types/index';

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

const AIBuildWithChatInner: React.FC<Props> = (props) => {
  const { isOpen, openChat, closeChat, messages, sendMessage, isLoading, setContext } = useCopilot();
  const { profileData, jd, tailoredData, matchScore } = props;

  useEffect(() => {
    setContext({
      page: 'ai_build',
      profile: profileData,
      job_description: jd,
      tailored_resume: tailoredData,
      ats_score: matchScore || undefined,
    });
  }, [profileData, jd, tailoredData, matchScore, setContext]);

  return (
    <>
      <AIBuildPage {...props} />
      <ChatButton onClick={isOpen ? closeChat : openChat} isOpen={isOpen} />
      <ChatPanel
        isOpen={isOpen}
        onClose={closeChat}
        messages={messages}
        onSendMessage={sendMessage}
        isLoading={isLoading}
        pageTitle="AI Build - Resume Tailoring"
      />
    </>
  );
};

const AIBuildWithChat: React.FC<Props> = (props) => {
  return (
    <CopilotProvider pageContext="ai_build" pageTitle="AI Build - Resume Tailoring">
      <AIBuildWithChatInner {...props} />
    </CopilotProvider>
  );
};

export default AIBuildWithChat;
