import React, { useEffect } from 'react';
import { CopilotProvider, useCopilot } from '../contexts/CopilotContext';
import CoverLetterPage from './CoverLetterPage';
import ChatButton from './chat/ChatButton';
import ChatPanel from './chat/ChatPanel';
import { ResumeData } from '../types/index';

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

const CoverLetterWithChatInner: React.FC<Props> = (props) => {
  const { isOpen, openChat, closeChat, messages, sendMessage, isLoading, setContext } = useCopilot();
  const { profileData, jd, instructions, coverLetter } = props;

  useEffect(() => {
    setContext({
      page: 'cover_letter',
      profile: profileData,
      job_description: jd,
      cover_letter: coverLetter,
      target_instructions: instructions,
    });
  }, [profileData, jd, instructions, coverLetter, setContext]);

  return (
    <>
      <CoverLetterPage {...props} />
      <ChatButton onClick={isOpen ? closeChat : openChat} isOpen={isOpen} />
      <ChatPanel
        isOpen={isOpen}
        onClose={closeChat}
        messages={messages}
        onSendMessage={sendMessage}
        isLoading={isLoading}
        pageTitle="Cover Letter Generator"
      />
    </>
  );
};

const CoverLetterWithChat: React.FC<Props> = (props) => {
  return (
    <CopilotProvider pageContext="cover_letter" pageTitle="Cover Letter Generator">
      <CoverLetterWithChatInner {...props} />
    </CopilotProvider>
  );
};

export default CoverLetterWithChat;
