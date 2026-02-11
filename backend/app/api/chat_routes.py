"""
Chat API Routes - Streaming AI chat assistant

Provides a Server-Sent Events (SSE) streaming endpoint for the in-app
chat assistant. The chat is context-aware — it knows about the user's
resume, job description, ATS score, and current page.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import StreamingResponse
from app.models.chat import ChatRequest, ChatHistoryResponse
from app.services.chat_service import chat_service
from app.core.auth_middleware import get_current_user
from typing import Dict, Any

router = APIRouter(prefix="/chat", tags=["Chat"])


@router.post("/completions")
async def chat_completions(
    request: ChatRequest,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Stream a chat completion response via Server-Sent Events (SSE).

    The client should open an EventSource or fetch with streaming to receive
    tokens as they're generated. Each event is a JSON object:

        data: {"type": "chunk", "content": "token"}
        data: {"type": "done"}
        data: {"type": "error", "message": "..."}

    Context (request.context_data) includes:
        - page: 'ai_build' | 'cover_letter' | 'proposal'
        - profile: User's resume data
        - job_description: Current job description
        - tailored_resume: Tailored resume (if available)
        - ats_score: ATS score (if available)
        - cover_letter: Generated cover letter (if available)

    TODO: chat_service.stream_chat() must be implemented to yield SSE events.
    """
    user_id = current_user["user_id"]

    return StreamingResponse(
        chat_service.stream_chat(request, user_id),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",  # Disable Nginx buffering
        }
    )


@router.get("/history/{session_id}")
async def get_chat_history(
    session_id: str,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Retrieve chat history for a session.

    TODO: Implement chat history persistence:
    1. Create a 'chat_history' table in Supabase
    2. Store messages with user_id, session_id, role, content, page_context
    3. Query and return messages for the given session_id
    """
    # TODO: Implement chat history retrieval
    return {"messages": [], "session_id": session_id}


@router.delete("/history/{session_id}")
async def clear_chat_history(
    session_id: str,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Clear chat history for a session.

    TODO: Implement deletion of chat messages for this session_id
    """
    # TODO: Implement chat history deletion
    return {"message": "Chat history cleared", "session_id": session_id}
