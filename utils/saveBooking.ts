'use server';

import { cookies } from 'next/headers';

interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  timezone: string;
  notes: string;
  start: string;
  end: string;
  location: string;
  providerId: number;
  serviceId: number;
}

export async function saveBookingData(userData: BookingData, bookingData: BookingData) {
  try {
    const cookieStore = await cookies();
    
    // Set cookies with 7 days expiration
    const expires = new Date();
    expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    cookieStore.set('user', JSON.stringify(userData), {
      expires,
      path: '/',
      httpOnly: false, // Set to false to allow client-side access if needed
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    
    cookieStore.set('bookingData', JSON.stringify(bookingData), {
      expires,
      path: '/',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error saving booking data to cookies:', error);
    return { success: false, error: 'Failed to save booking data' };
  }
}

export async function sendBookingToAPI(sessionId: string) {
  try {
    const cookieStore = await cookies();
    
    // Get booking data from cookies
    const userCookie = cookieStore.get('user');
    const bookingDataCookie = cookieStore.get('bookingData');
    
    if (!userCookie || !bookingDataCookie) {
      return { success: false, error: 'Booking data not found in cookies' };
    }
    
    const userData = JSON.parse(userCookie.value);
    const bookingData = JSON.parse(bookingDataCookie.value);
    
    // Prepare data to send to API with session_id and isPaid
    const payload = {
      ...bookingData,
      session_id: sessionId,
      isPaid: true,
    };
    
    console.log('Sending booking data to API:', {
      url: 'https://shazmlc.cloud/webhook/web-create-services',
      payload: payload
    });
    
    // Send to API
    const response = await fetch('https://shazmlc.cloud/webhook/web-create-services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
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
    console.error('Error sending booking data to API:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send booking data to API' 
    };
  }
}

