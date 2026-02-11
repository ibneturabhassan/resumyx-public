"""
OpenRouter Service Implementation

Implements the BaseAIService interface using OpenRouter's API.
OpenRouter provides access to many AI models (Claude, GPT-4, Gemini, Llama, etc.)
through a single unified API with the same OpenAI-compatible interface.

Setup:
    Get your API key from: https://openrouter.ai/
    No additional packages needed (uses httpx or openai client)

Usage:
    The user configures their API key via the Settings page.
    The AIServiceFactory instantiates this class automatically.
"""
import httpx
from typing import List, Optional
from app.services.base_ai_service import BaseAIService
from app.models.resume import ResumeData, Skills, Experience, Education, Project


class OpenRouterService(BaseAIService):
    """AI service implementation using OpenRouter (multi-provider API)"""

    OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

    def __init__(
        self,
        api_key: str,
        model: str = "anthropic/claude-3.5-sonnet",
        site_url: Optional[str] = None,
        app_name: Optional[str] = "Resumyx"
    ):
        super().__init__(api_key, model)
        self.site_url = site_url or ""
        self.app_name = app_name or "Resumyx"

        # TODO: Initialize HTTP client
        # self.headers = {
        #     "Authorization": f"Bearer {api_key}",
        #     "HTTP-Referer": self.site_url,
        #     "X-Title": self.app_name,
        #     "Content-Type": "application/json"
        # }

    async def _chat(self, messages: list, **kwargs) -> str:
        """
        Send a chat completion request to OpenRouter.

        TODO: Implement using httpx.AsyncClient or OpenAI client pointed at OpenRouter
        Example:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    self.OPENROUTER_API_URL,
                    headers=self.headers,
                    json={"model": self.model, "messages": messages, **kwargs}
                )
                return response.json()["choices"][0]["message"]["content"]
        """
        raise NotImplementedError("TODO: Implement _chat with OpenRouter API")

    async def generate_summary(self, experience: str) -> str:
        """TODO: Implement generate_summary with OpenRouter API"""
        raise NotImplementedError("TODO: Implement generate_summary with OpenRouter API")

    async def tailor_summary(
        self,
        additional_info: str,
        skills: Skills,
        experience: List[Experience],
        job_description: str
    ) -> str:
        """TODO: Implement tailor_summary with OpenRouter API"""
        raise NotImplementedError("TODO: Implement tailor_summary with OpenRouter API")

    async def tailor_experience(
        self,
        experience: List[Experience],
        job_description: str
    ) -> List[Experience]:
        """TODO: Implement tailor_experience with OpenRouter API"""
        raise NotImplementedError("TODO: Implement tailor_experience with OpenRouter API")

    async def tailor_skills(
        self,
        skills: Skills,
        job_description: str
    ) -> Skills:
        """TODO: Implement tailor_skills with OpenRouter API"""
        raise NotImplementedError("TODO: Implement tailor_skills with OpenRouter API")

    async def tailor_projects(
        self,
        projects: List[Project],
        job_description: str
    ) -> List[Project]:
        """TODO: Implement tailor_projects with OpenRouter API"""
        raise NotImplementedError("TODO: Implement tailor_projects with OpenRouter API")

    async def tailor_education(
        self,
        education: List[Education],
        job_description: str
    ) -> List[Education]:
        """TODO: Implement tailor_education with OpenRouter API"""
        raise NotImplementedError("TODO: Implement tailor_education with OpenRouter API")

    async def calculate_ats_score(
        self,
        resume_data: ResumeData,
        job_description: str
    ) -> dict:
        """
        TODO: Implement calculate_ats_score with OpenRouter API
        Returns: dict with keys: score (int 0-100), feedback (str)
        """
        raise NotImplementedError("TODO: Implement calculate_ats_score with OpenRouter API")

    async def generate_cover_letter(
        self,
        profile_data: ResumeData,
        job_description: str,
        instructions: str = ""
    ) -> str:
        """
        TODO: Implement generate_cover_letter with OpenRouter API
              Use self._clean_cover_letter() to strip greeting/closing.
        """
        raise NotImplementedError("TODO: Implement generate_cover_letter with OpenRouter API")

    async def generate_proposal(
        self,
        profile_data: ResumeData,
        job_description: str
    ) -> dict:
        """
        TODO: Implement generate_proposal with OpenRouter API
        Returns: dict with keys: proposal (str), suggested_experience (list), suggested_projects (list)
        """
        raise NotImplementedError("TODO: Implement generate_proposal with OpenRouter API")
