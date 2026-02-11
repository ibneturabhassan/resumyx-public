"""
Google Gemini AI Service Implementation

Implements the BaseAIService interface using Google's Gemini API.

Setup:
    pip install google-generativeai
    Get your API key from: https://aistudio.google.com/

Usage:
    The user configures their API key via the Settings page.
    The AIServiceFactory instantiates this class automatically.
"""
import google.generativeai as genai
from typing import List
from app.services.base_ai_service import BaseAIService
from app.models.resume import ResumeData, Skills, Experience, Education, Project


class GeminiService(BaseAIService):
    """AI service implementation using Google Gemini"""

    def __init__(self, api_key: str, model: str = "gemini-2.0-flash-exp"):
        super().__init__(api_key, model)
        # TODO: Initialize the Gemini client
        # genai.configure(api_key=api_key)
        # self.client = genai.GenerativeModel(model)

    async def generate_summary(self, experience: str) -> str:
        """
        Generate a professional summary from the user's experience.

        Args:
            experience: String representation of work experience

        Returns:
            A concise professional summary paragraph

        TODO: Implement prompt to generate a 2-3 sentence professional summary
        """
        raise NotImplementedError("TODO: Implement generate_summary with Gemini API")

    async def tailor_summary(
        self,
        additional_info: str,
        skills: Skills,
        experience: List[Experience],
        job_description: str
    ) -> str:
        """
        Generate a tailored professional summary for a specific job.

        Args:
            additional_info: User's existing summary/additional info
            skills: User's skills object
            experience: List of work experience
            job_description: Target job description

        Returns:
            A tailored professional summary as a string

        TODO: Implement prompt to tailor summary to match job requirements
        """
        raise NotImplementedError("TODO: Implement tailor_summary with Gemini API")

    async def tailor_experience(
        self,
        experience: List[Experience],
        job_description: str
    ) -> List[Experience]:
        """
        Optimize work experience bullet points for a specific job.

        Args:
            experience: List of Experience objects to tailor
            job_description: Target job description

        Returns:
            List of Experience objects with tailored bullet points

        TODO: Implement prompt to rewrite experience bullets highlighting
              relevant achievements and using job-matching keywords.
              Return valid JSON matching the Experience schema.
        """
        raise NotImplementedError("TODO: Implement tailor_experience with Gemini API")

    async def tailor_skills(
        self,
        skills: Skills,
        job_description: str
    ) -> Skills:
        """
        Prioritize and reorganize skills to match job requirements.

        Args:
            skills: Skills object with languages, databases, cloud, tools
            job_description: Target job description

        Returns:
            Skills object with reordered/filtered skills

        TODO: Implement prompt to filter and prioritize skills relevant to
              the job description. Return valid JSON matching the Skills schema.
        """
        raise NotImplementedError("TODO: Implement tailor_skills with Gemini API")

    async def tailor_projects(
        self,
        projects: List[Project],
        job_description: str
    ) -> List[Project]:
        """
        Enhance project descriptions to highlight job-relevant aspects.

        Args:
            projects: List of Project objects
            job_description: Target job description

        Returns:
            List of Project objects with enhanced descriptions

        TODO: Implement prompt to tailor project descriptions to emphasize
              technologies and outcomes relevant to the job.
        """
        raise NotImplementedError("TODO: Implement tailor_projects with Gemini API")

    async def tailor_education(
        self,
        education: List[Education],
        job_description: str
    ) -> List[Education]:
        """
        Review education entries for job relevance.

        Args:
            education: List of Education objects
            job_description: Target job description

        Returns:
            List of Education objects (potentially reordered)

        TODO: Implement prompt to review and potentially reorder education
              entries based on job relevance.
        """
        raise NotImplementedError("TODO: Implement tailor_education with Gemini API")

    async def calculate_ats_score(
        self,
        resume_data: ResumeData,
        job_description: str
    ) -> dict:
        """
        Calculate ATS compatibility score using LLM analysis.

        Args:
            resume_data: Full resume data
            job_description: Target job description

        Returns:
            dict with keys: score (int 0-100), feedback (str)

        TODO: Implement prompt to have the LLM analyze resume-to-JD fit
              and return a structured score with feedback.
        """
        raise NotImplementedError("TODO: Implement calculate_ats_score with Gemini API")

    async def generate_cover_letter(
        self,
        profile_data: ResumeData,
        job_description: str,
        instructions: str = ""
    ) -> str:
        """
        Generate a personalized cover letter.

        Args:
            profile_data: User's full profile/resume data
            job_description: Target job description
            instructions: Optional user instructions (tone, length, etc.)

        Returns:
            Cover letter body text (no greeting/closing)

        TODO: Implement prompt to generate a compelling cover letter body.
              Use self._clean_cover_letter() to strip greeting/closing.
        """
        raise NotImplementedError("TODO: Implement generate_cover_letter with Gemini API")

    async def generate_proposal(
        self,
        profile_data: ResumeData,
        job_description: str
    ) -> dict:
        """
        Generate a freelance job proposal with suggested experience/projects.

        Args:
            profile_data: User's full profile/resume data
            job_description: Freelance job posting

        Returns:
            dict with keys:
                proposal (str): The full proposal text
                suggested_experience (list): Relevant experience IDs or objects
                suggested_projects (list): Relevant project IDs or objects

        TODO: Implement prompt to generate proposal and identify the most
              relevant experience/projects for the freelance job.
        """
        raise NotImplementedError("TODO: Implement generate_proposal with Gemini API")
