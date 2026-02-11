from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
from uuid import UUID


class ChatMessage(BaseModel):
    """Single chat message"""
    role: str  # 'user' or 'assistant'
    content: str
    timestamp: Optional[datetime] = None


class ChatContext(BaseModel):
    """Context data for chat assistant"""
    page: str  # 'ai_build' or 'cover_letter' or 'proposal'
    profile: Optional[Dict[str, Any]] = None
    job_description: Optional[str] = None
    tailored_resume: Optional[Dict[str, Any]] = None
    cover_letter: Optional[str] = None
    target_instructions: Optional[str] = None
    ats_score: Optional[float] = None
    proposal: Optional[str] = None
    suggested_experience: Optional[List[str]] = None
    suggested_projects: Optional[List[str]] = None


class ChatRequest(BaseModel):
    """Request to send a chat message"""
    message: str
    page_context: str  # 'ai_build', 'cover_letter', or 'proposal'
    context_data: ChatContext
    session_id: Optional[str] = None


class ChatHistoryItem(BaseModel):
    """Single item in chat history from database"""
    id: UUID
    user_id: UUID
    session_id: UUID
    page_context: str
    role: str
    content: str
    context_snapshot: Optional[Dict[str, Any]] = None
    created_at: datetime


class ChatHistoryResponse(BaseModel):
    """Response containing chat history"""
    messages: List[ChatHistoryItem]
    session_id: UUID
