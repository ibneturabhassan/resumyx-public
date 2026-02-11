"""
OpenAI GPT Service Implementation

Implements the BaseAIService interface using OpenAI's API.

Setup:
    pip install openai
    Get your API key from: https://platform.openai.com/

Usage:
    The user configures their API key via the Settings page.
    The AIServiceFactory instantiates this class automatically.
"""
from openai import AsyncOpenAI
from typing import List
from app.services.base_ai_service import BaseAIService
from app.models.resume import ResumeData, Skills, Experience, Education, Project


class OpenAIService(BaseAIService):
    """AI service implementation using OpenAI GPT models"""

    def __init__(self, api_key: str, model: str = "gpt-4o-mini"):
        super().__init__(api_key, model)
        # TODO: Initialize the async OpenAI client
        # self.client = AsyncOpenAI(api_key=api_key)

    async def generate_summary(self, experience: str) -> str:
        """
        Generate a professional summary from experience.

        TODO: Implement using self.client.chat.completions.create()
        """
        raise NotImplementedError("TODO: Implement generate_summary with OpenAI API")

    async def tailor_summary(
        self,
        additional_info: str,
        skills: Skills,
        experience: List[Experience],
        job_description: str
    ) -> str:
        """
        Generate a tailored professional summary for a specific job.

        TODO: Implement using self.client.chat.completions.create()
        """
        raise NotImplementedError("TODO: Implement tailor_summary with OpenAI API")

    async def tailor_experience(
        self,
        experience: List[Experience],
        job_description: str
    ) -> List[Experience]:
        """
        Optimize work experience bullet points.

        TODO: Implement using self.client.chat.completions.create()
              Use response_format={"type": "json_object"} for structured output.
        """
        raise NotImplementedError("TODO: Implement tailor_experience with OpenAI API")

    async def tailor_skills(
        self,
        skills: Skills,
        job_description: str
    ) -> Skills:
        """
        Prioritize and reorganize skills.

        TODO: Implement using self.client.chat.completions.create()
        """
        raise NotImplementedError("TODO: Implement tailor_skills with OpenAI API")

    async def tailor_projects(
        self,
        projects: List[Project],
        job_description: str
    ) -> List[Project]:
        """
        Enhance project descriptions.

        TODO: Implement using self.client.chat.completions.create()
        """
        raise NotImplementedError("TODO: Implement tailor_projects with OpenAI API")

    async def tailor_education(
        self,
        education: List[Education],
        job_description: str
    ) -> List[Education]:
        """
        Review education entries.

        TODO: Implement using self.client.chat.completions.create()
        """
        raise NotImplementedError("TODO: Implement tailor_education with OpenAI API")

    async def calculate_ats_score(
        self,
        resume_data: ResumeData,
        job_description: str
    ) -> dict:
        """
        Calculate ATS compatibility score using LLM.

        Returns: dict with keys: score (int 0-100), feedback (str)

        TODO: Implement using self.client.chat.completions.create()
        """
        raise NotImplementedError("TODO: Implement calculate_ats_score with OpenAI API")

    async def generate_cover_letter(
        self,
        profile_data: ResumeData,
        job_description: str,
        instructions: str = ""
    ) -> str:
        """
        Generate a personalized cover letter.

        TODO: Implement using self.client.chat.completions.create()
              Use self._clean_cover_letter() to strip greeting/closing.
        """
        raise NotImplementedError("TODO: Implement generate_cover_letter with OpenAI API")

    async def generate_proposal(
        self,
        profile_data: ResumeData,
        job_description: str
    ) -> dict:
        """
        Generate a freelance proposal with suggested items.

        Returns: dict with keys: proposal (str), suggested_experience (list), suggested_projects (list)

        TODO: Implement using self.client.chat.completions.create()
        """
        raise NotImplementedError("TODO: Implement generate_proposal with OpenAI API")
