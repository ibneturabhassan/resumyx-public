const API_URL = import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === 'production'
    ? 'https://your-backend-api.onrender.com/api'
    : 'http://localhost:8000/api');

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatContext {
  page: string;
  profile?: any;
  job_description?: string;
  tailored_resume?: any;
  cover_letter?: string;
  target_instructions?: string;
  ats_score?: number;
  proposal?: string;
  suggested_experience?: string[];
  suggested_projects?: string[];
}

export interface ChatRequest {
  message: string;
  page_context: string;
  context_data: ChatContext;
  session_id?: string;
}

class ChatService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('access_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  /**
   * Send a chat message and receive streaming response via SSE
   */
  async sendMessage(
    request: ChatRequest,
    onChunk: (chunk: string) => void,
    onComplete: () => void,
    onError: (error: string) => void
  ): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders(),
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Request failed' }));
        onError(error.detail || 'Failed to send message');
        return;
      }

      // Handle SSE streaming
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        onError('No response body');
        return;
      }

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          onComplete();
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6); // Remove 'data: ' prefix
            try {
              const parsed = JSON.parse(data);

              if (parsed.type === 'chunk') {
                onChunk(parsed.content);
              } else if (parsed.type === 'done') {
                onComplete();
                return;
              } else if (parsed.type === 'error') {
                onError(parsed.message || 'An error occurred');
                return;
              }
            } catch (e) {
              // Ignore parse errors for incomplete chunks
            }
          }
        }
      }
    } catch (error) {
      onError(error instanceof Error ? error.message : 'An error occurred');
    }
  }

  /**
   * Get chat history for a session
   */
  async getHistory(sessionId: string): Promise<ChatMessage[]> {
    try {
      const response = await fetch(`${API_URL}/chat/history/${sessionId}`, {
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch chat history');
      }

      const data = await response.json();
      return data.messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
        timestamp: new Date(msg.created_at),
      }));
    } catch (error) {
      console.error('Error fetching chat history:', error);
      return [];
    }
  }

  /**
   * Clear chat history for a session
   */
  async clearHistory(sessionId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/chat/history/${sessionId}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      return response.ok;
    } catch (error) {
      console.error('Error clearing chat history:', error);
      return false;
    }
  }
}

export const chatService = new ChatService();
