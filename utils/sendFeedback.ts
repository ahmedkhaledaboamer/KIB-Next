'use server';

interface FeedbackData {
  name: string;
  email: string;
  message: string;
}

interface CommentResponse {
  Name: string;
  Email: string;
  postive_message: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export async function sendFeedbackToAPI(data: FeedbackData, command: 'commit' | 'fetch' = 'commit') {
  try {
    const requestBody = command === 'commit' 
      ? { ...data, command: 'commit' }
      : { command: 'fetch' };

    const response = await fetch('https://shazmlc.cloud/webhook/website-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error(`API request failed with status ${response.status}:`, errorText);
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    // Try to parse JSON response, but handle cases where response might be empty
    let result;
    const responseText = await response.text();
    if (responseText) {
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        // If response is not JSON, return the text
        result = responseText;
      }
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Error sending feedback to API:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send feedback to API'
    };
  }
}

export async function fetchComments(): Promise<CommentResponse[]> {
  try {
    const result = await sendFeedbackToAPI({ name: '', email: '', message: '' }, 'fetch');
    if (result.success && Array.isArray(result.data)) {
      return result.data as CommentResponse[];
    }
    return [];
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
}

