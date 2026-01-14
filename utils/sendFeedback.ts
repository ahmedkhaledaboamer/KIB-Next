'use server';

interface FeedbackData {
  name: string;
  email: string;
  message: string;
}

export async function sendFeedbackToAPI(data: FeedbackData) {
  try {
    const response = await fetch('https://shazmlc.cloud/webhook/website-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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

