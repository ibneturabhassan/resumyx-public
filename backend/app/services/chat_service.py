"""
Chat Service - Context-aware AI chat assistant

Handles streaming chat completions with full context awareness.
The chat assistant knows about the user's current resume, job description,
ATS score, and which page they're on (AI Build, Cover Letter, Proposal).

To implement: Fill in _build_system_prompt() with page-specific instructions
and _build_profile_summary() to summarize the user's profile for the AI.
"""
from typing import AsyncGenerator, Optional
from app.models.chat import ChatRequest, ChatContext
from app.services.ai_service_factory import AIServiceFactory
from app.services.ai_settings_service import ai_settings_service


class ChatService:
    """Service for handling context-aware streaming chat"""

    async def stream_chat(
        self,
        request: ChatRequest,
        user_id: str
    ) -> AsyncGenerator[str, None]:
        """
        Stream a chat response using the user's configured AI provider.

        Args:
            request: ChatRequest containing message, context, and session info
            user_id: Authenticated user ID

        Yields:
            JSON-encoded SSE data strings

        TODO: Implement streaming by:
        1. Get user's AI config via ai_settings_service.get_user_settings(user_id)
        2. Build system prompt using _build_system_prompt(request.context_data)
        3. Stream tokens from the AI provider
        4. Yield each token as: f'data: {{"type": "chunk", "content": "{token}"}}\n\n'
        5. End with: 'data: {"type": "done"}\n\n'
        """
        # Placeholder - yields error message
        yield 'data: {"type": "chunk", "content": "Chat not yet implemented. See chat_service.py."}\n\n'
        yield 'data: {"type": "done"}\n\n'

    def _build_system_prompt(self, context: ChatContext) -> str:
        """
        Build a context-aware system prompt for the chat assistant.

        The system prompt should vary based on which page the user is on:
        - 'ai_build': Help with resume tailoring, ATS scores, keywords
        - 'cover_letter': Help with cover letter tone, content, customization
        - 'proposal': Help with freelance proposal strategy and positioning

        Args:
            context: ChatContext with page, profile, job_description, etc.

        Returns:
            System prompt string

        TODO: Implement page-specific system prompts that include:
        - User's profile summary (via _build_profile_summary)
        - Current job description
        - Current ATS score (if available)
        - Page-specific instructions and guidance
        """
        # Placeholder
        return f"You are a helpful resume assistant. The user is on the {context.page} page."

    def _build_profile_summary(self, profile: dict) -> str:
        """
        Create a concise summary of the user's profile for inclusion in the AI context.

        Args:
            profile: User's profile data as a dict

        Returns:
            Formatted string summarizing key profile information

        TODO: Extract and format key info: name, title, skills, experience highlights
        """
        if not profile:
            return "No profile data available."

        name = profile.get("personalInfo", {}).get("fullName", "Unknown")
        return f"Candidate: {name}"


chat_service = ChatService()
