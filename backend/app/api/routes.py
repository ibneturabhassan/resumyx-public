"""
Core API Routes

Handles profile CRUD and all AI feature endpoints.
AI endpoints require authentication and a configured AI provider.
"""
from fastapi import APIRouter, HTTPException, status, Depends
from app.models.resume import (
    ResumeProfile,
    ResumeData,
    TailoredResumeData,
    TailorRequest,
    CoverLetterRequest,
    ATSScoreResponse,
    ChangeDetail,
    TailoredResumeResponse
)
from app.services.supabase_service import supabase_service
from app.services.ai_settings_service import ai_settings_service
from app.services.ai_service_factory import AIServiceFactory
from app.services.base_ai_service import BaseAIService
from app.services.enhanced_ats_scorer import EnhancedATSScorer
from app.core.auth_middleware import get_current_user
from typing import Optional, Dict, Any, List
import asyncio

router = APIRouter()


async def get_ai_service_for_user(user_id: Optional[str] = None) -> BaseAIService:
    """Get AI service instance based on user preferences"""
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User authentication required for AI operations"
        )

    user_config = await ai_settings_service.get_user_settings(user_id)
    if not user_config:
        raise HTTPException(
            status_code=status.HTTP_428_PRECONDITION_REQUIRED,
            detail="AI provider not configured. Please configure your AI settings in the Settings page."
        )

    return AIServiceFactory.create_service(user_config)


# Health check
@router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "resumyx-api"}


# --- Profile Endpoints ---

@router.get("/profile/{user_id}")
async def get_profile(user_id: str):
    """Get user profile"""
    profile = await supabase_service.get_profile(user_id)
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )
    return profile


@router.post("/profile")
async def save_profile(profile: ResumeProfile):
    """Save or update user profile"""
    success = await supabase_service.save_profile(
        profile.userId,
        profile.profileData,
        profile.targetJd or ""
    )
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save profile"
        )
    return {"message": "Profile saved successfully", "userId": profile.userId}


@router.delete("/profile/{user_id}")
async def delete_profile(user_id: str):
    """Delete user profile"""
    success = await supabase_service.delete_profile(user_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete profile"
        )
    return {"message": "Profile deleted successfully"}


# --- AI Endpoints ---

@router.post("/ai/generate-summary")
async def generate_summary(
    data: dict,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Generate professional summary from experience"""
    experience = data.get("experience", "")
    user_id = current_user["user_id"]

    if not experience:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Experience data is required"
        )

    ai_service = await get_ai_service_for_user(user_id)
    # TODO: ai_service.generate_summary() must be implemented in the AI service
    summary = await ai_service.generate_summary(experience)
    return {"summary": summary}


@router.post("/ai/tailor-summary")
async def tailor_summary_endpoint(
    request: TailorRequest,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Tailor professional summary for specific job"""
    try:
        user_id = current_user["user_id"]
        ai_service = await get_ai_service_for_user(user_id)
        summary = await ai_service.tailor_summary(
            request.profileData.additionalInfo,
            request.profileData.skills,
            request.profileData.experience,
            request.jobDescription
        )
        return {"summary": summary}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.post("/ai/tailor-experience")
async def tailor_experience_endpoint(
    request: TailorRequest,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Tailor work experience for specific job"""
    try:
        user_id = current_user["user_id"]
        ai_service = await get_ai_service_for_user(user_id)
        experience = await ai_service.tailor_experience(
            request.profileData.experience,
            request.jobDescription
        )
        return {"experience": [exp.model_dump() for exp in experience]}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.post("/ai/tailor-skills")
async def tailor_skills_endpoint(
    request: TailorRequest,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Tailor skills for specific job"""
    try:
        user_id = current_user["user_id"]
        ai_service = await get_ai_service_for_user(user_id)
        skills = await ai_service.tailor_skills(
            request.profileData.skills,
            request.jobDescription
        )
        return {"skills": skills}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.post("/ai/tailor-projects")
async def tailor_projects_endpoint(
    request: TailorRequest,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Tailor projects for specific job"""
    try:
        user_id = current_user["user_id"]
        ai_service = await get_ai_service_for_user(user_id)
        projects = await ai_service.tailor_projects(
            request.profileData.projects,
            request.jobDescription
        )
        return {"projects": [proj.model_dump() for proj in projects]}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.post("/ai/tailor-education")
async def tailor_education_endpoint(
    request: TailorRequest,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Tailor education for specific job"""
    try:
        user_id = current_user["user_id"]
        ai_service = await get_ai_service_for_user(user_id)
        education = await ai_service.tailor_education(
            request.profileData.education,
            request.jobDescription
        )
        return {"education": [edu.model_dump() for edu in education]}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.post("/ai/tailor-resume")
async def tailor_resume(
    request: TailorRequest,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Tailor complete resume with parallel AI processing.

    Runs all section tailoring agents simultaneously using asyncio.gather(),
    then combines results into a TailoredResumeData object.
    """
    try:
        user_id = current_user["user_id"]
        ai_service = await get_ai_service_for_user(user_id)

        # PARALLEL PROCESSING: Tailor all sections simultaneously
        results = await asyncio.gather(
            ai_service.tailor_summary(
                request.profileData.additionalInfo,
                request.profileData.skills,
                request.profileData.experience,
                request.jobDescription
            ),
            ai_service.tailor_experience(
                request.profileData.experience,
                request.jobDescription
            ),
            ai_service.tailor_skills(
                request.profileData.skills,
                request.jobDescription
            ),
            ai_service.tailor_projects(
                request.profileData.projects,
                request.jobDescription
            ),
            ai_service.tailor_education(
                request.profileData.education,
                request.jobDescription
            ),
            return_exceptions=True
        )

        tailored_summary, tailored_experience, tailored_skills, tailored_projects, tailored_education = results

        # Handle exceptions in individual results - fall back to original
        if isinstance(tailored_summary, Exception):
            tailored_summary = request.profileData.additionalInfo
        if isinstance(tailored_experience, Exception):
            tailored_experience = request.profileData.experience
        if isinstance(tailored_skills, Exception):
            tailored_skills = request.profileData.skills
        if isinstance(tailored_projects, Exception):
            tailored_projects = request.profileData.projects
        if isinstance(tailored_education, Exception):
            tailored_education = request.profileData.education

        tailored_data = TailoredResumeData(
            personalInfo=request.profileData.personalInfo,
            summary=tailored_summary,
            coverLetter=request.profileData.coverLetter,
            skills=tailored_skills,
            experience=tailored_experience if isinstance(tailored_experience, list) else request.profileData.experience,
            education=tailored_education if isinstance(tailored_education, list) else request.profileData.education,
            projects=tailored_projects if isinstance(tailored_projects, list) else request.profileData.projects,
            certifications=request.profileData.certifications
        )

        # TODO: Uncomment after implementing EnhancedATSScorer.calculate_keyword_match()
        # scorer = EnhancedATSScorer()
        # keyword_score, missing_keywords = scorer.calculate_keyword_match(
        #     request.profileData, request.jobDescription
        # )
        keyword_analysis = {"matched_percentage": 0, "missing_keywords": []}

        return {
            "tailoredResume": tailored_data.model_dump(),
            "changes": [],
            "keywordAnalysis": keyword_analysis
        }

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.post("/ai/ats-score", response_model=ATSScoreResponse)
async def calculate_ats_score(
    request: TailorRequest,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Calculate ATS compatibility score.

    TODO: Uncomment and implement after EnhancedATSScorer is implemented.
    """
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="ATS scoring not yet implemented. Implement EnhancedATSScorer first."
    )


@router.post("/ai/ats-score-llm")
async def calculate_ats_score_llm(
    request: TailorRequest,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Calculate ATS score using LLM analysis.

    TODO: Implement after AI services are implemented.
    """
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="LLM ATS scoring not yet implemented."
    )


@router.post("/ai/generate-cover-letter")
async def generate_cover_letter(
    request: CoverLetterRequest,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Generate personalized cover letter"""
    try:
        user_id = current_user["user_id"]
        ai_service = await get_ai_service_for_user(user_id)
        cover_letter = await ai_service.generate_cover_letter(
            request.profileData,
            request.jobDescription,
            request.instructions or ""
        )
        return {"coverLetter": cover_letter}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.post("/ai/generate-proposal")
async def generate_proposal(
    request: TailorRequest,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Generate freelance job proposal with suggested experience and projects"""
    try:
        user_id = current_user["user_id"]
        ai_service = await get_ai_service_for_user(user_id)
        result = await ai_service.generate_proposal(
            request.profileData,
            request.jobDescription
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
